// In App.js in a new project

import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailsScreen from "./screens/DetailsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import Moment from 'react-moment';

const screenWidth = Dimensions.get("window").width;

function HomeScreen({ navigation }) {
  const DATA = [
    {
      id: "1",
      location: "Dallas, TX",
      image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
    },
    {
      id: "2",
      location: "Plano, TX",
      image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
    },
    {
      id: "3",
      location: "Chicago, IL",
      image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
    },
  ];

  const Item = ({ location, image }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("Details", {
          itemId: 100,
        });
      }}
    >
      <View style={{ width: screenWidth - 40 }}>
        <Image
        tw="h-72 w-screen"
          source={{
            uri: image,
          }}
        />

        <View tw="flex flex-row justify-between pt-2">
          <Text tw="font-semibold">{location}</Text>
          <Moment fromNow element={Text}>2023-03-11T10:59-0500</Moment>
        </View>
        <View>
          <Text tw="italic">@scottfoster</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View tw="bg-slate-300 h-screen">
      <SafeAreaView tw="px-5">
        <Text tw="text-2xl font-bold">Sunrises for GMT-6</Text>
        <Text>Current Time: 8:15am</Text>

        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item location={item.location} image={item.image} />
          )}
          horizontal
          pagingEnabled
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={0}
          decelerationRate={"fast"}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: "100%",
    height: 300,
  },
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
