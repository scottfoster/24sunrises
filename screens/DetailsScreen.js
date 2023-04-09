import * as React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Share,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const DetailsScreen = ({ route, navigation }) => {
  const {
    location,
    user_image,
    user_profile_url,
    image,
    username,
    time,
    points,
    source,
  } = route.params;
  return (
    <View tw="bg-black flex-1 justify-center align-items p-0.5">
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          WebBrowser.openBrowserAsync(user_profile_url);
        }}
      >
        <View tw="flex flex-row pb-2">
          <View tw="w-4/6">
            <View tw="flex flex-row items-center">
              <Image
                source={{
                  uri: user_image,
                }}
                tw="h-7 w-7 mr-2 rounded-lg"
                resizeMode="cover"
              />
              <Text tw="text-white font-semibold text-md">
                {username}
                <Text tw="italic"> on {source} </Text>
                <FontAwesome5
                  name="arrow-right"
                  size={14}
                  color="white"
                />
              </Text>
            </View>
          </View>
          <View tw="w-2/6 justify-center items-end">
            <Text tw="text-white text-md text-right">{time}</Text>
          </View>
        </View>
      </TouchableOpacity>

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
          <View tw="flex flex-row justify-end items-center">
            <FontAwesome5 name="heart" size={14} color="red" />
            <Text tw="text-sm ml-1 mr-1 text-white text-lg font-semibold">
              {points}
            </Text>
            <FontAwesome5
              onPress={() =>
                Share.share({
                  url: image,
                })
              }
              tw="ml-2"
              name="external-link-alt"
              size={14}
              color="white"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;
