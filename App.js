import React, { useState, useEffect } from "react";
import {
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
    fetch("https://s3.amazonaws.com/imfoster.com/24sunrises-data3.json", {
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
      .then(function (myJson) {
        console.log(myJson);
        setSunriseData(myJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const ListItem = ({ item, size }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("Details", {
            uri: item.uri,
          });
        }}
      >
        <View tw="mt-2.5 mr-2.5">
          <>
            {size == "large" && (
              <Image
                source={{
                  uri: item.uri,
                }}
                tw="h-80 w-80 rounded-lg"
                resizeMode="cover"
              />
            )}

            {size == "normal" && (
              <Image
                source={{
                  uri: item.uri,
                }}
                tw="h-36 w-36 rounded-lg"
                resizeMode="cover"
              />
            )}

            {size == "small" && (
              <Image
                source={{
                  uri: item.uri,
                }}
                tw="h-24 w-24 rounded-lg"
                resizeMode="cover"
              />
            )}

            {size == "large" && (
              <>
                <View tw="flex flex-row justify-between pt-1">
                  <Text tw="font-semibold text-lg">{item.location}</Text>
                  <Moment fromNow element={Text}>
                    {item.time}
                  </Moment>
                </View>
                <Text>{item.author}</Text>
              </>
            )}

            {size == "normal" && <Text>{item.location}</Text>}

            {size == "small" && <Text>{item.location}</Text>}
          </>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View tw="flex-1 h-screen">
      <SafeAreaView tw="flex-1">
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={sunriseData}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section }) => (
            <>
              {section.subheading && (
                <Text tw="text-2xl">{section.subheading}</Text>
              )}

              {section.size == "large" && (
                <>
                  <Text tw="text-2xl font-extrabold mt-6">{section.title}</Text>
                  <Text>
                    Time in Location:{" "}
                    <Clock
                      element={Text}
                      format={"h:mm:ssa"}
                      ticking={true}
                      timezone={section.timezone}
                    />
                  </Text>
                </>
              )}
              {section.size == "normal" ||
                (section.size == "small" && (
                  <>
                    <Text tw="text-lg mt-6">{section.title}</Text>
                  </>
                ))}

              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => (
                  <ListItem item={item} size={section.size} />
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
