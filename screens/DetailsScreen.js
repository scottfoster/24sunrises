import * as React from "react";
import { View, Image, Text } from "react-native";

const DetailsScreen = ({ route, navigation }) => {
  const { location, user_image, image, username, time } = route.params;
  return (
    <View tw="bg-black flex-1 justify-center align-items">
      <View tw="flex flex-row pb-2">
      <Image
        source={{
          uri: user_image,
        }}
        tw="h-7 w-7 mr-2"
        resizeMode="cover"
      />
        <Text tw="text-white font-semibold text-lg">{username}</Text>
      </View>

      <Image
        source={{
          uri: image,
        }}
        tw="h-2/3 w-auto"
        resizeMode="cover"
      />
      <View tw="flex flex-row justify-between items-center pt-1">
        <Text tw="text-white font-semibold text-lg">{location}</Text>
        <Text tw="text-white">{time}</Text>
      </View>
    </View>
  );
};

export default DetailsScreen;
