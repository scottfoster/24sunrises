import { StatusBar } from "expo-status-bar";
import React from "react";
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
  const SUNRISES = [
    {
      title: "Current Sunrise (UTC-6)",
      current: 1,
      timezone: "US/Pacific",
      data: [
        {
          key: "1",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1/2000",
        },
        {
          key: "2",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/10/2000",
        },

        {
          key: "3",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1002/2000",
        },
        {
          key: "4",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1006/2000",
        },
        {
          key: "5",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1008/2000",
        },
      ],
    },
    {
      title: "Punk and hardcore",
      data: [
        {
          key: "1",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1011/2000",
        },
        {
          key: "2",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1012/2000",
        },

        {
          key: "3",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1013/2000",
        },
        {
          key: "4",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1015/2000",
        },
        {
          key: "5",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1016/2000",
        },
      ],
    },
    {
      title: "Based on your recent listening",
      data: [
        {
          key: "1",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1020/2000",
        },
        {
          key: "2",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1024/2000",
        },

        {
          key: "3",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1027/2000",
        },
        {
          key: "4",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1035/2000",
        },
        {
          key: "5",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1038/2000",
        },
      ],
    },
    {
      title: "123Based on your recent listening",
      data: [
        {
          key: "1",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1020/2000",
        },
        {
          key: "2",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1024/2000",
        },

        {
          key: "3",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1027/2000",
        },
        {
          key: "4",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1035/2000",
        },
        {
          key: "5",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
          uri: "https://picsum.photos/id/1038/2000",
        },
      ],
    },
  ];

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
            <Image
              source={{
                uri: item.uri,
              }}
              tw="h-80 w-80 rounded"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{
                uri: item.uri,
              }}
              tw="h-40 w-40 rounded"
              resizeMode="cover"
            />
          )}

          <View tw="flex flex-row justify-between pt-1">
            <Text tw="font-semibold text-sweet-pink">{item.location}</Text>
            <Moment tw="text-sweet-pink" fromNow element={Text}>
              {item.time}
            </Moment>
          </View>
          {current && <Text>{item.author}</Text>}
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
          sections={SUNRISES}
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
            headerStyle: {
              backgroundColor: "#fdf1cd",
            },
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
