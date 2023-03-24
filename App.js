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
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./screens/DetailsScreen";

import Moment from "react-moment";
import Clock from "react-live-clock";

function HomeScreen({ navigation }) {
  const [sunriseData, setSunriseData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getData();
    }, 1000);
  }, []);

  const getData = () => {
    fetch("https://s3.amazonaws.com/imfoster.com/24sunrises-data.json", {
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
        console.error(error);
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
          navigation.navigate("Details", {
            image: item.image,
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
                <View tw="flex flex-row justify-between items-center">
                  <Text tw="font-semibold text-lg">{item.location}</Text>
                  <Text>{item.author}</Text>
                </View>
                <Moment tw="-mt-1" fromNow element={Text}>
                  {item.time}
                </Moment>
              </>
            )}

            {size == "normal" && (
                <View tw="break-words">
                  <Text tw="text-xs font-semibold">{item.location}</Text>
                  <Text tw="text-xs">
                    <Moment fromNow element={Text}>
                      {item.time}
                    </Moment>
                  </Text>
                </View>
            )}

            {size == "small" && (
              <>
                <View tw="break-words">
                <Text tw="text-xs font-semibold">{item.location}</Text>
                <Text tw="text-xs">
                  <Moment fromNow element={Text}>
                    {item.time}
                  </Moment>
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
                {section.size == "large" && (
                  <>
                    {/*
                  <Text>
                    Time in Location:{" "}
                    <Clock
                      element={Text}
                      format={"h:mm:ssa"}
                      ticking={true}
                      timezone={section.timezone}
                    />
                  </Text>
                  */}
                  </>
                )}
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
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="24sunrises"
          options={{
            headerTintColor: "#805690",
            title: "24sunrises",
            headerTransparent: true,
            headerShadowVisible: false,
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Details"
          options={{
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