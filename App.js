import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./screens/DetailsScreen";

import Moment from "react-moment";
import Clock from "react-live-clock";

function HomeScreen({ navigation }) {
  const [sunriseData, setSunriseData] = useState([]);

  const getData = () => {
    fetch("https://s3.amazonaws.com/imfoster.com/24sunrises.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setSunriseData(myJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const ListItem = ({ item, current }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("Details", {
            uri: item.uri,
          });
        }}
      >
        <View tw="m-2.5">
          {current ? (
            <>
              <Image
                source={{
                  uri: item.uri,
                }}
                tw="h-80 w-80 rounded-lg"
                resizeMode="cover"
              />

              <View tw="flex flex-row justify-between pt-1">
                <Text tw="font-semibold text-sweet-pink">{item.location}</Text>
                <Moment tw="text-sweet-pink" fromNow element={Text}>
                  {item.time}
                </Moment>
              </View>
              <Text>{item.author}</Text>
            </>
          ) : (
            <>
              <Image
                source={{
                  uri: item.uri,
                }}
                tw="h-36 w-36 rounded-lg"
                resizeMode="cover"
              />
              <Text tw="font-semibold text-sweet-pink break-all">
                xx{item.location}
              </Text>
              <Text>
                <Moment tw="text-black" fromNow element={Text}>
                  {item.time}
                </Moment>
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View tw="flex-1 bg-bright-yellow h-screen">
      <SafeAreaView tw="flex-1">
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={sunriseData}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section }) => (
            <>
              <Text tw="text-2xl font-extrabold text-dark-purple mt-6">
                {section.title}
              </Text>
              {section.current && (
                <Text>
                  Time in Location:{" "}
                  <Clock
                    element={Text}
                    format={"h:mm:ssa"}
                    ticking={true}
                    timezone={section.timezone}
                  />
                </Text>
              )}
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => (
                  <ListItem item={item} current={section.current} />
                )}
                showsHorizontalScrollIndicator={false}
              />
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
