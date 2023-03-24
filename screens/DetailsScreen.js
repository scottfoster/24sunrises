import * as React from "react";
import { Button, View, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const DetailsScreen = ({ route, navigation }) => {
  const { image } = route.params;
  return (
    <View tw="bg-black flex-1 justify-center">
      <Image
        source={{
          uri: image,
        }}
        tw="h-2/3 w-auto"
        resizeMode="cover"
      />
      <Text tw="text-white">TEXT</Text>
    </View>
  );
};

export default DetailsScreen;
