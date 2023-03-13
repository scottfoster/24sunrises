import * as React from "react";
import { useState } from "react";

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
import Moment from "react-moment";

const screenWidth = Dimensions.get("window").width;

function HomeScreen({ navigation }) {

  const [profilePicSelected, setProfilePicSelected] = useState('0');

  const onViewableItemsChanged = (info) => {
    setProfilePicSelected(info.viewableItems[0].index)
  };
  
  const viewabilityConfigCallbackPairs = React.useRef([
    { onViewableItemsChanged },
  ]);
  

  const DATA = [
    {
      id: "1",
      location: "Dallas, TX",
      image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
      time: "2023-03-10T10:59-0500",
      author: "@scottfoster",
    },
    {
      id: "2",
      location: "Plano, TX",
      image:
        "https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg",
      time: "2023-03-11T10:59-0500",
      author: "@scottfoster",
    },
    {
      id: "3",
      location: "Chicago, IL",
      image:
        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg",
      time: "2023-03-12T10:59-0500",
      author: "@scottfoster",
    },
  ];

  const Item = ({ item }) => (
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
          tw="h-72 w-screen rounded-xl"
          source={{
            uri: item.image,
          }}
          style={{
            width: "100%",
          }}
        />

        <View tw="absolute mt-5 color-white text-center w-full">
          <Text tw="color-white text-center">
            {item.id}/{DATA.length}
          </Text>
        </View>

        <View tw="flex flex-row justify-between pt-2">
          <Text tw="font-semibold">{item.location}</Text>
          <Moment fromNow element={Text}>
            {item.time}
          </Moment>
        </View>
        <View>
          <Text tw="italic">{item.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View tw="bg-slate-300 h-screen">
      <SafeAreaView tw="px-5">
        <Text tw="text-2xl font-bold">Sunrises for GMT-6</Text>
        <Text>
          Current Time: <Moment local element={Text} />
        </Text>

        <FlatList
          data={DATA}
          renderItem={({ item, index }) => <Item item={item} />}
          horizontal
          pagingEnabled
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={0}
          decelerationRate={"fast"}
          // onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{waitForInteraction: true, viewAreaCoveragePercentThreshold: 95}}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        
        />

        <Text>abz - {profilePicSelected}</Text>
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
