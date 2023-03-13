import * as React from "react";
import { useState } from "react";

import {
  View,
  FlatList,
  Text,
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
  const [mainImageSelected, setMainImageSelected] = useState("0");

  const onViewableItemsChanged = (info) => {
    setMainImageSelected(info.viewableItems[0].index);
  };

  const viewabilityConfigCallbackPairs = React.useRef([
    { onViewableItemsChanged },
  ]);

  const SUNRISES = [
    {
      id: "1",
      timezone: "CST",
      images: [
        {
          id: "1",
          location: "Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
        },
        {
          id: "2",
          location: "Plano, TX",
          image:
            "https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg",
          time: "2023-03-11T10:59-0500",
          author: "@bobsmith",
        },
        {
          id: "3",
          location: "Chicago, IL",
          image:
            "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg",
          time: "2023-03-12T10:59-0500",
          author: "@theblah",
        },
      ],
    },
    {
      id: "2",
      timezone: "MST",
      images: [
        {
          id: "1",
          location: "Not Dallas, TX",
          image:
            "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
          time: "2023-03-10T10:59-0500",
          author: "@scottfoster",
        },
        {
          id: "2",
          location: "Plano, TX",
          image:
            "https://images.pexels.com/photos/36744/agriculture-arable-clouds-countryside.jpg",
          time: "2023-03-11T10:59-0500",
          author: "@bobsmith",
        },
      ],
    },
  ];

  const HeaderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        console.log("next");
        /*
        navigation.navigate("Details", {
          itemId: 100,
        });
        */
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
      </View>
    </TouchableOpacity>
  );

  const BodyItem = ({ item }) => (
    <View tw="flex flex-row justify-between pt-2">
      <View>
        <Text>{item.timezone}</Text>
      </View>
      <View>
        <FlatList
          horizontal
          data={item.images}
          renderItem={({ item }) => <BodyItemImage item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );

  const BodyItemImage = ({ item }) => (
    <Image
      tw="h-24 w-24 rounded-xl"
      source={{
        uri: item.image,
      }}
    />
  );

  return (
    <View tw="bg-slate-300 h-screen">
      <SafeAreaView tw="px-5">
        <Text tw="text-2xl font-bold py-0.5">
          Current Sunrises for {SUNRISES[0].timezone}
        </Text>
        <Text tw="pb-2">
          Current Time: <Moment local element={Text} />
        </Text>

        <FlatList
          data={SUNRISES[0].images}
          renderItem={({ item }) => <HeaderItem item={item} />}
          horizontal
          pagingEnabled
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={0}
          decelerationRate={"fast"}
          viewabilityConfig={{
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95,
          }}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
        />

        <View tw="flex flex-row justify-between pt-2">
          <Text tw="font-semibold">
            {SUNRISES[0].images[mainImageSelected].location}
          </Text>
          <Moment fromNow element={Text}>
            {SUNRISES[0].images[mainImageSelected].time}
          </Moment>
        </View>
        <View>
          <Text tw="italic">
            {SUNRISES[0].images[mainImageSelected].author}
          </Text>
        </View>

        <Text tw="text-2xl font-bold py-0.5">Sunrises Around the World</Text>

        <FlatList
          data={SUNRISES}
          renderItem={({ item }) => <BodyItem item={item} />}
          keyExtractor={(item) => item.id}
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
        }}
      >
        <Stack.Screen name="24sunrises" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
