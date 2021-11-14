import React from "react";
import { FlatList, StyleSheet, View  } from "react-native";

import MealItem from "./MealItem";

const MealList = props => {

  /* Items that is render in flatlist from dummy-data meals */
  const renderMealItem = itemData => {
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title
            }});
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList keyExtractor={(item => item.id)} data={props.listData} renderItem={renderMealItem} style={{width: "95%"}} />
    </View>
  );
};

/* Styles objects */
const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default MealList;