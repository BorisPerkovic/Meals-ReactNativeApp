import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from "../components/CustomHeaderButton";
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from "../store/actions/meals"; 

const ListItem = props => {

  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {

  const avalivableMeals = useSelector(state => state.meals.meals);
  const dispatch = useDispatch();
  const mealId = props.navigation.getParam("mealId");
  const selectedMeal = avalivableMeals.find(meal => meal.id === mealId );
  const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavoriteHandler});
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}}  style={styles.image}/>
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.textTitle}>Ingredients</Text>
        {selectedMeal.ingredient.map(ingr => <ListItem key={ingr}>{ingr}</ListItem>)}
      <Text style={styles.textTitle}>Steps</Text>
        {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
    </ScrollView>
  );
};

/* header options with header buttons and header styling */
MealDetailScreen.navigationOptions = navigationData => {
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const isFavorite = navigationData.navigation.getParam("isFav");
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Favorite" iconName={isFavorite ? "ios-star" : "ios-star-outline"} onPress={toggleFavorite} />
        </HeaderButtons>
    ) 
  };
};

/* Styles objects */
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  textTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
    marginVertical: 10
  },
  listItem : {
    marginVertical: 5,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10
  },
});

export default MealDetailScreen;
