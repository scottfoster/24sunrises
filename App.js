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
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./screens/DetailsScreen";
import { FontAwesome } from "@expo/vector-icons";

function HomeScreen({ navigation }) {
  const [sunriseData, setSunriseData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [validFile, setValidFile] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setValidFile(true);
    setTimeout(() => {
      setRefreshing(false);
      getData();
    }, 1000);
  }, []);

  const getData = () => {
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
        setSunriseData(jsonData);
      })
      .catch((error) => {
        setValidFile(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);

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
            location: item.location,
            time: item.time,
            points: item.points,
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
                        <FontAwesome name="user" size={14} color="black" />
                        <Text tw="text-sm ml-0.5">{item.username}</Text>
                      </View>
                    </View>
                  </View>
                  <View tw="w-2/6">
                    <Text tw="font-semibold text-lg leading-5 text-right">
                      {item.time}
                    </Text>
                    <View tw="flex flex-row items-center justify-end h-5">
                      <FontAwesome name="heart" size={14} color="red" />
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
                    <Text>{item.time} / </Text>
                    <FontAwesome name="heart" size={10} color="red" />
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
                    <Text>{item.time} / </Text>
                    <FontAwesome name="heart" size={10} color="red" />
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
                  <Text tw="text-3xl font-extrabold my-2 px-3">
                    {section.subheading}
                  </Text>
                )}

                <View tw="my-2 px-3 py-2 bg-white">
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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: "none",
          headerBackTitle: "Back",
          headerTintColor: "#000",
        }}
      >
        <Stack.Screen
          name="24sunrises"
          options={{
            headerTintColor: "#000",
            title: "24sunrises",
            headerTransparent: true,
            headerShadowVisible: false,
            headerRight: () => (
              <FontAwesome
                onPress={() => alert("questions")}
                name="question"
                size={24}
                color="black"
              />
            ),
          }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
