import * as React from "react";
import { View, Image, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DetailsScreen = ({ route, navigation }) => {
  const { location, user_image, image, username, time, points, source } =
    route.params;
  return (
    <View tw="bg-black flex-1 justify-center align-items p-0.5">
      <View tw="flex flex-row pt-1">
        <View tw="w-4/6">
          <View tw="flex flex-row pb-2">
            <Image
              source={{
                uri: user_image,
              }}
              tw="h-7 w-7 mr-2 rounded-lg"
              resizeMode="cover"
            />
            <View tw="flex flex-row">
              <Text tw="text-white font-semibold text-lg">{username}</Text>
              <Text tw="text-white italic text-lg"> on {source}</Text>
            </View>
          </View>
        </View>
        <View tw="w-2/6">
          <Text tw="text-white text-lg text-right">{time}</Text>
        </View>
      </View>

      <Image
        source={{
          uri: image,
        }}
        tw="h-2/3 w-auto rounded-lg"
        resizeMode="cover"
      />
      <View tw="flex flex-row justify-between items-center pt-1">
        <View tw="w-4/6">
          <Text tw="text-white font-semibold text-lg">{location}</Text>
        </View>
        <View tw="w-2/6">
          <View tw="flex flex-row items-center justify-end h-5">
            <FontAwesome name="heart" size={14} color="red" />
            <Text tw="text-sm ml-0.5 text-white">{points}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;
