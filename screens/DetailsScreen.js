import * as React from "react";
import { Button, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const DetailsScreen = ({ route, navigation }) => {
  const { uri } = route.params;
  return (
    <View tw="bg-black flex-1 justify-center">
      <Image
        source={{
          uri: uri,
        }}
        tw="h-80 w-auto"
        resizeMode="cover"
      />
    </View>
  );
};

export default DetailsScreen;
