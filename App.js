/* eas build; eas submit --platform ios */

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Button,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./screens/DetailsScreen";
import AddPhotoScreen from "./screens/AddPhotoScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as ImagePicker from 'expo-image-picker';

function HomeScreen({ navigation }) {
  const [sunriseData, setSunriseData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [validFile, setValidFile] = useState(true);
  const [loading, setLoading] = useState(true);
  const [utcOffset, setUTCOffset] = useState(null);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setValidFile(true);
    setTimeout(() => {
      setRefreshing(false);
      getSunriseData();
    }, 1000);
  }, []);

  const getSunriseData = () => {
    console.log("getSunriseData");

    fetch("https://24sunrises-data.s3.amazonaws.com/sunrises-new.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        setLoading(false);
        setSunriseData(jsonData);
        console.log("setSunriseData");
      })
      .catch((error) => {
        setLoading(false);
        setValidFile(false);
      });
  };

  const getUserUTC = () => {
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      console.log("statusGetUserUTC", status);
      if (status === "granted") {
        console.log("getUserUTC");
        let location = await Location.getCurrentPositionAsync({});

        fetch(
          "https://0u0b4i5z1h.execute-api.us-east-1.amazonaws.com/getutc?latitude=" +
            location.coords.latitude +
            "&longitude=" +
            location.coords.longitude,
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
            setUTCOffset(jsonData.offset);
            console.log("setUTCOffset");
            getSunriseData();
          });
      } else {
        console.log("not granted");
        getSunriseData();
      }
    })();
  };

  useEffect(() => {
    getUserUTC();
  }, []);

  const highlightSection = (section) => {
    if (utcOffset == section.offset) {
      return "my-2 px-3 py-2 bg-yellow-100";
    }
    return "my-2 px-3 py-2 bg-white";
  };

  const ListItem = ({ item, size }) => {
    const listClassNames = [];
    listClassNames.push("mt-2.5");
    listClassNames.push("mr-2.5");
    if (size == "large") listClassNames.push("w-80");
    if (size == "normal") listClassNames.push("w-36");
    if (size == "small") listClassNames.push("w-24");

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("Photo Details", {
            image: item.image,
            username: item.username,
            user_image: item.user_image,
            user_profile_url: item.user_profile_url,
            location: item.location,
            time: item.time,
            points: item.points,
            source: item.source,
          });
        }}
      >
        <View tw={listClassNames.join(" ")}>
          <>
            {size == "large" && (
              <Image
                source={{
                  uri: item.image,
                }}
                tw="h-80 w-80 rounded-lg"
                resizeMode="cover"
              />
            )}

            {size == "normal" && (
              <Image
                source={{
                  uri: item.image,
                }}
                tw="h-36 w-36 rounded-lg"
                resizeMode="cover"
              />
            )}

            {size == "small" && (
              <Image
                source={{
                  uri: item.image,
                }}
                tw="h-24 w-24 rounded-lg"
                resizeMode="cover"
              />
            )}

            {size == "large" && (
              <>
                <View tw="flex flex-row pt-1">
                  <View tw="w-4/6">
                    <Text tw="font-semibold text-lg leading-5">
                      {item.location}
                    </Text>
                    <View>
                      <View tw="flex flex-row items-center justify-start h-5">
                        <FontAwesome5 name="user" size={14} color="black" />
                        <Text tw="text-sm ml-0.5">{item.username}</Text>
                      </View>
                    </View>
                  </View>
                  <View tw="w-2/6">
                    <Text tw="font-semibold text-lg leading-5 text-right">
                      {item.time}
                    </Text>
                    <View tw="flex flex-row items-center justify-end h-5">
                      <FontAwesome5 name="heart" size={14} color="red" />
                      <Text tw="text-sm ml-0.5">{item.points}</Text>
                    </View>
                  </View>
                </View>
              </>
            )}

            {size == "normal" && (
              <>
                <View tw="pt-1">
                  <Text tw="text-xs font-semibold">{item.location}</Text>
                  <Text tw="text-xs">
                    <Text>{item.time} </Text>
                    <FontAwesome5 name="heart" size={10} color="red" />
                    <Text> </Text>
                    <Text>{item.points}</Text>
                  </Text>
                </View>
              </>
            )}

            {size == "small" && (
              <>
                <View tw="pt-1">
                  <Text tw="text-xs font-semibold">{item.location}</Text>
                  <Text tw="text-xs">
                    <Text>{item.time} </Text>
                    <FontAwesome5 name="heart" size={10} color="red" />
                    <Text> </Text>
                    <Text>{item.points}</Text>
                  </Text>
                </View>
              </>
            )}
          </>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View tw="flex-1 h-screen">
      <SafeAreaView tw="flex-1 bg-gray-100">

        {loading && (
          <View tw="h-screen v-screen flex items-center justify-center">
            <ActivityIndicator color="#EDC041" size="large" />
            <Text tw="text-center text-lg">Gathering Sunrises...</Text>
          </View>
        )}
        {validFile ? (
          <SectionList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            stickySectionHeadersEnabled={false}
            sections={sunriseData}
            showsVerticalScrollIndicator={false}
            renderSectionHeader={({ section }) => (
              <>
                {section.subheading && (
                  <>
                    <Text tw="text-3xl font-extrabold my-2 px-3">
                      {section.subheading}
                      <View tw="pl-4 pt-1">
                        <FontAwesome5 name="sun" size={24} color="#F6BE00" />
                      </View>
                    </Text>
                  </>
                )}

                <View tw={highlightSection(section)}>
                  {section.size == "normal" && (
                    <>
                      <Text tw="text-lg">{section.title}</Text>
                    </>
                  )}

                  {section.size == "small" && (
                    <>
                      <Text tw="text-lg">{section.title}</Text>
                    </>
                  )}

                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({ item }) => (
                      <ListItem item={item} size={section.size} />
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </>
            )}
            renderItem={() => {
              return null;
            }}
          />
        ) : (
          <View tw="h-screen v-screen flex items-center justify-center p-5">
            <Text tw="text-center font-semibold text-xl">
              Unable to connect to server. Please try again in a few minutes or
              check your internet connection.
            </Text>
            <Button onPress={onRefresh} title="Try again" />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function HeaderTitle() {
  return <Image tw="h-8 w-32" source={require("./assets/logo.png")} />;
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          animation: "none",
          headerBackTitle: "Back",
          headerTintColor: "#000",
        })}
      >
        <Stack.Screen
          name="Home"
          options={({ route, navigation }) => ({
            headerTintColor: "#000",
            title: "24sunrises",
            headerTransparent: false,
            headerShadowVisible: true,
            headerTitle: () => <HeaderTitle />,
            headerLeft: () => (
              <FontAwesome5
                onPress={() =>
                  Linking.openURL(
                    "mailto:twentyfoursunrises@gmail.com?subject=Question/Comment About 24sunrises"
                  ).catch((err) => {
                    Alert.alert("Error!", "Something went wrong.");
                  })
                }
                name="envelope"
                size={24}
                color="black"
              />
            ),
            headerRight: () => (
              <>
                <FontAwesome5
                  onPress={async () => {
                    let { status } =
                      await Location.requestForegroundPermissionsAsync();
                    if (status == "granted") {
                      navigation.replace("Home");
                    } else {
                      Alert.alert(
                        "Location Error",
                        "Location services have not been enabled. Please enable them in the settings."
                      );
                    }
                    console.log("statusCheckLocation", status);
                  }}
                  name="location-arrow"
                  size={24}
                  color="black"
                />
                <View tw="pl-3">

                <FontAwesome5
                  onPress={async () => {

                    let result = await ImagePicker.launchImageLibraryAsync({
                      mediaTypes: ImagePicker.MediaTypeOptions.All,
                      allowsEditing: true,
                      aspect: [4, 3],
                      quality: 1,
                      //image data result will contain base64 data
                      base64:true
                    }).then((response) => {
                      
                      if (!response.canceled) {
                        console.log(response)
                      }
                    });
                  }}
                  name="camera"
                  size={24}
                  color="black"
                />
                </View>
              </>
            ),
          })}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Photo Details"
          options={{
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerShadowVisible: false,
          }}
          component={DetailsScreen}
        />
        <Stack.Screen
          name="Add Photo"
          options={{
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerShadowVisible: false,
          }}
          component={AddPhotoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
