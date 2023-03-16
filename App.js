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

function HomeScreen({ navigation }) {
  const SUNRISES = [
    {
      title: "Current Sunrises (UTC-6)",
      current: 1,
      data: [
        {
          key: "1",
          text: "Item text 1",
          uri: "https://picsum.photos/id/1/2000",
        },
        {
          key: "2",
          text: "Item text 2",
          uri: "https://picsum.photos/id/10/2000",
        },

        {
          key: "3",
          text: "Item text 3",
          uri: "https://picsum.photos/id/1002/2000",
        },
        {
          key: "4",
          text: "Item text 4",
          uri: "https://picsum.photos/id/1006/2000",
        },
        {
          key: "5",
          text: "Item text 5",
          uri: "https://picsum.photos/id/1008/2000",
        },
      ],
    },
    {
      title: "Punk and hardcore",
      data: [
        {
          key: "1",
          text: "Item text 1",
          uri: "https://picsum.photos/id/1011/2000",
        },
        {
          key: "2",
          text: "Item text 2",
          uri: "https://picsum.photos/id/1012/2000",
        },

        {
          key: "3",
          text: "Item text 3",
          uri: "https://picsum.photos/id/1013/2000",
        },
        {
          key: "4",
          text: "Item text 4",
          uri: "https://picsum.photos/id/1015/2000",
        },
        {
          key: "5",
          text: "Item text 5",
          uri: "https://picsum.photos/id/1016/2000",
        },
      ],
    },
    {
      title: "Based on your recent listening",
      data: [
        {
          key: "1",
          text: "Item text 1",
          uri: "https://picsum.photos/id/1020/2000",
        },
        {
          key: "2",
          text: "Item text 2",
          uri: "https://picsum.photos/id/1024/2000",
        },

        {
          key: "3",
          text: "Item text 3",
          uri: "https://picsum.photos/id/1027/2000",
        },
        {
          key: "4",
          text: "Item text 4",
          uri: "https://picsum.photos/id/1035/2000",
        },
        {
          key: "5",
          text: "Item text 5",
          uri: "https://picsum.photos/id/1038/2000",
        },
      ],
    },
    {
      title: "123Based on your recent listening",
      data: [
        {
          key: "1",
          text: "Item text 1",
          uri: "https://picsum.photos/id/1020/2000",
        },
        {
          key: "2",
          text: "Item text 2",
          uri: "https://picsum.photos/id/1024/2000",
        },

        {
          key: "3",
          text: "Item text 3",
          uri: "https://picsum.photos/id/1027/2000",
        },
        {
          key: "4",
          text: "Item text 4",
          uri: "https://picsum.photos/id/1035/2000",
        },
        {
          key: "5",
          text: "Item text 5",
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
          <Text tw="text-sweet-pink">{item.text}</Text>
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
              <Text tw="text-xl font-extrabold text-dark-purple">
                {section.title}
              </Text>
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
