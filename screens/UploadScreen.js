import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";
import CryptoJS from "react-native-crypto-js";

const UploadScreen = ({ route, navigation }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [exif, setExif] = useState(false);
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1024px-SMPTE_Color_Bars.svg.png"
  );
  const [formValues, setFormValues] = useState([]);
  const [imageKey, setImageKey] = useState("");

  const submitImage = (imageData) => {
    if (!formValues.email) {
      Alert.alert("Error!", "Please enter an email address.");
    }

    console.log('imageKey', imageKey)

    console.log('image', "https://0u0b4i5z1h.execute-api.us-east-1.amazonaws.com/submitimage?email=" +formValues.email + "&image=" + imageKey)

    fetch(
      "https://0u0b4i5z1h.execute-api.us-east-1.amazonaws.com/submitimage?email=" +
        formValues.email +
        "&image=" +
        imageKey,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: 0,
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        setShowForm(false)
        setIsComplete(true)
        console.log('setIsComplete', true)
      });

    console.log('submit')
  };

  const makeId = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const handleEmailChange = (e) => {
    setFormValues({
      ...formValues,
      ["email"]: e,
    });
  };

  useEffect(() => {
    const uploadImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        exif: 1,
      }).then((response) => {
        if (response.canceled) {
          navigation.goBack();
        } else {
          setIsUploading(true);

          fetch("https://24sunrises-data.s3.amazonaws.com/sunrises.json", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: 0,
            },
          })
            .then(function (response2) {
              return response2.json();
            })
            .then(function (jsonData) {
              var key = CryptoJS.enc.Base64.parse(
                "G0HPTE61KCQ+CYn3voqMlFnXEtpaow6gYDqaaGSVzuE="
              );
              var iv = CryptoJS.enc.Base64.parse("cJrccDraCqm7rQXdOsS8Zg==");
              var ciphertext = CryptoJS.enc.Base64.parse(jsonData.key);
              var encryptedCP = CryptoJS.lib.CipherParams.create({
                ciphertext: ciphertext,
                formatter: CryptoJS.format.OpenSSL,
              });
              var decryptedWA = CryptoJS.AES.decrypt(encryptedCP, key, {
                iv: iv,
              });
              var keys = decryptedWA.toString(CryptoJS.enc.Utf8);

              var keys = keys.split("|");

              const fileType = response.assets[0].fileName.split(".")[1];
              const fileName = (makeId(10) + "." + fileType).toLowerCase();
              setExif(response.assets[0].exif);

              const file = {
                uri: response.assets[0].uri,
                name: fileName,
                type: "image/" + fileType.toLowerCase(),
              };

              const options = {
                keyPrefix: "",
                bucket: "24sunrises-temp",
                region: "us-east-1",
                accessKey: keys[0],
                secretKey: keys[1],
                successActionStatus: 201,
              };

              RNS3.put(file, options).then((s3response) => {
                setImageKey(s3response.body.postResponse.key)
                setImage(s3response.body.postResponse.location);
                setIsUploading(false);
                setShowForm(true);
              });
            });
        }
      });
    };

    uploadImage();

    const initialValues = {
      email: null,
      exif: null,
    };
    setFormValues(initialValues);
  }, []);

  return (
    <>
      {isUploading && (
        <View tw="mx-auto my-auto h-20 w-3/4 bg-blue-50 flex items-center justify-center">
          <Text tw="text-center font-bold text-xl">Uploading ...</Text>
          <ActivityIndicator color="#075985" size="large" />
        </View>
      )}

      {isComplete && (
        <View tw="mx-auto my-auto h-20 w-3/4 bg-blue-50 flex items-center justify-center">
          <Text tw="text-center font-bold text-xl">Your image has been submitted.</Text>
        </View>
      )}

      {showForm && (
        <View tw="mx-auto my-auto h-screen w-screen flex items-center justify-center">
          <Text tw="mb-4 text-2xl">Your Sunrise Picture:</Text>
          <Image
            source={{
              uri: image,
            }}
            tw="h-3/6 w-5/6 rounded"
            resizeMode="cover"
          />

          <View tw="mt-3">
            <Text tw="text-center text-lg">Enter Your Email:</Text>
            <TextInput
              tw="-mt-1 mb-1 text-2xl text-center"
              placeholder="sunrise@domain.com"
              name="email"
              autoCapitalize="none"
              onChangeText={handleEmailChange}
            />
          </View>

          <View tw="mt-5">
            <TouchableOpacity tw="bg-sky-800 px-4 py-1 rounded text-white">
              <Button
                title="Submit Image"
                color="white"
                onPress={submitImage}
              ></Button>
            </TouchableOpacity>
            <Text tw="text-center text-xs mt-2">
              We will contact you if your image is selected.
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default UploadScreen;
