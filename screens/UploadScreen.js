import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";

const UploadScreen = ({ route, navigation }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [exif, setExif] = useState(false);
  const [image, setImage] = useState(false);

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
            console.log("image", s3response.body.postResponse);

            if (s3response.status !== 201)
              throw new Error("Failed to upload image to S3");

            setIsUploading(false);
            setShowForm(true);
          });
        }
      });
    };

    // uploadImage();
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
          <Text tw="font-bold mb-4 text-xl">Your Image</Text>
          <Image
            source={{
              uri: "https://24sunrises-temp.s3.amazonaws.com/z6dviyyjpl.jpg",
            }}
            tw="h-3/6 w-5/6 rounded"
            resizeMode="cover"
          />

          <TextInput tw="mt-3" placeholder="name@email.com" />

          <TouchableOpacity>
            <Button title="Learn More" color="#841584" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default UploadScreen;
