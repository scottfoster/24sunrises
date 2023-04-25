import { Camera, CameraType } from "expo-camera";
import React, { useRef, useState, useEffect } from "react";

import { View, Button } from "react-native";


const AddPhotoScreen = ({ route, navigation }) => {

  let cameraRef = useRef();

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };
  
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    alert('snap')
  }
  
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      // setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  return (
    <View tw="h-screen w-screen">
      <Camera type={CameraType.back} tw="h-screen w-screen">

      <Button onPress={takePic} title="Take picture" />
      </Camera>
    </View>
  );
};

export default AddPhotoScreen;
