/*====================================================
   STACK NAVIGATOR - back and forward between screens
==================================================== */
import React from "react";
import { Text, Platform, SafeAreaView, ScrollView, Image, View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMeals from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import Colors from "../constants/colors";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

const defaultStackNavOptions =  {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white"
    },
    headerTitleStyle: {
      fontFamily: "open-sans-bold"
    },
    /* Only for iOS */
    headerBackTitleStyle: {
      fontFamily: "open-sans"
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
  }
}

/* Screens navigation - able to move between srceens, also contains default style configuration for screens */
const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMeals
  },
  MealDetail: MealDetailScreen
  },
  defaultStackNavOptions
);

/* Favorite Screen navigator stack */
const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
},
  defaultStackNavOptions
);


/* Bottom TABS navigation */
const TabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: <Text style={{fontFamily: "open-sans-bold"}}>Meals</Text>
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: "Favorites",
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: <Text style={{fontFamily: "open-sans-bold"}}>Favorites</Text>
    }
  }
};


const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, defaultStackNavOptions);

const MealsFavTabNavigator =
  Platform.OS === "android"
   ? createMaterialBottomTabNavigator(TabScreenConfig, {
     activeColor: "white",
     shifting: true,
     barStyle: {
       backgroundColor: Colors.primaryColor
     }
   })
   : createBottomTabNavigator(
      TabScreenConfig,
      {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold"
          },
          activeTintColor: Colors.accentColor
        }
      }
    );


/* Custom Drawer Component */
const CustomDrawerComponent = props => {
  return(
    <SafeAreaView style={{flex: 1}}>
      <View style={{height: 150, alignItems: "center", justifyContent: "center"}}>
          <Image source={{uri: "https://www.budgetbytes.com/wp-content/uploads/2012/03/Chicken-Yakisoba-noodles-fork-391x293.jpg" }} 
          style={{height: 100, width: 100, borderRadius: 60, marginTop: 30}}/>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  ); 
};

/* Drawer(slider) navigation */
const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: "Meals",
    }
  },
  Filters: FiltersNavigator
}, 
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: Colors.accentColor,
      fontFamily: "open-sans"
    }
  }
);

export default createAppContainer(MainNavigator);


