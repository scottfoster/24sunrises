import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const DetailsScreen = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>


      <Button
          title="Go Home"
          onPress={() =>
            navigation.navigate("Home")
          }
        />

    </View>
  );
};

export default DetailsScreen;
