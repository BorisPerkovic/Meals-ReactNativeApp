import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from "react-native";
import { useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Colors from "../constants/colors";
import { setFIlters } from '../store/actions/meals';

const FilterSwitch = props => {

  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch trackColor={{true: Colors.primaryColor, false: Colors.accentColor}} value={props.state} onValueChange={props.onChange} />
    </View>
  );
};

const FiltersScreen = props => {

  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVeganFree, setIsVeganFree] = useState(false);
  const [isVegeterianFree, setIsVegeterianFree] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      veganFree: isVeganFree,
      vegeterianFree: isVegeterianFree
    }
    dispatch(setFIlters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVeganFree, isVegeterianFree, dispatch]);

  useEffect(() => {
    navigation.setParams({
      save: saveFilters
     });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch label="Gulten-free" state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
      <FilterSwitch label="Lactose-free" state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
      <FilterSwitch label="Vegan-free" state={isVeganFree} onChange={newValue => setIsVeganFree(newValue)} />
      <FilterSwitch label="Vegeterian-free" state={isVegeterianFree} onChange={newValue => setIsVegeterianFree(newValue)} />
    </View>
  );
};

/* navigaitonOptions for Header and Header styling */
FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
          navData.navigation.toggleDrawer();
        }} />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Save" iconName="save-outline" onPress={navData.navigation.getParam("save")} />
      </HeaderButtons>
    ) 
  };
};

/* Styles objects */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%"
  },
  title: {
    fontFamily: "open-sans-bold",
    margin: 20,
    fontSize: 22,
    textAlign: "center"

  }
});

export default FiltersScreen;
