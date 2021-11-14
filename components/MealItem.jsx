import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";

import DefaultText from "./DefaultText";

const MealItem = props => {

  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={{...styles.mealRow, ...styles.mealHeader}}>
            <ImageBackground source={{uri: props.image }} style={styles.bgImage}>
              <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
            </ImageBackground>
          </View>
          <View style={{...styles.mealRow, ...styles.mealDetail}}>
              <DefaultText>{props.duration}m</DefaultText>
              <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
              <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderColor: "black",
    overflow: "hidden",
    marginTop: 20
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "80%"
  },
  mealDetail: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%"
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 5,
    paddingHorizontal: 20,
    textAlign: "center"
  }
});

export default MealItem;