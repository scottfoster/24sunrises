import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";

const UploadScreen = ({ route, navigation }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [exif, setExif] = useState(false);
  const [image, setImage] = useState(false);

  const submitImage = () => {
    alert("here");
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

  useEffect(() => {
    const uploadImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        exif: 1,
      }).then((response) => {
        console.log(response);
        if (response.canceled) {
          navigation.goBack();
        } else {
          setIsUploading(true);

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
            accessKey: "AKIA3PWTTOA6DGBN4XKD",
            secretKey: "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",
            successActionStatus: 201,
          };

          RNS3.put(file, options).then((s3response) => {
            console.log("s3response", s3response);

            setImage(s3response.body.postResponse.location)
            setIsUploading(false);
            setShowForm(true);
          });
        }
      });
    };

    uploadImage();
  }, []);

  return (
    <>
      {isUploading && (
        <View tw="mx-auto my-auto h-20 w-3/4 bg-yellow-100 flex items-center justify-center">
          <Text tw="text-center font-bold text-xl">Uploading ...</Text>
        </View>
      )}

      {showForm && (
        <View tw="mx-auto my-auto h-screen w-screen flex items-center justify-center">
          <Text tw="font-bold mb-4 text-xl">Your Sunrise Picture</Text>
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
              tw="-mt-2 text-2xl text-center"
              placeholder="sunrise@domain.com"
            />
          </View>

          <View tw="mt-5">
            <TouchableOpacity tw="bg-sky-800 p-3 rounded text-white">
              <Button
                title="Submit Image"
                color="white"
                onPress={submitImage}
              ></Button>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default UploadScreen;
