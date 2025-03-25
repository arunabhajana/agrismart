import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import OnboardingScreen from "./components/OnboardingScreen";
import RoleSelectionScreen from "./components/RoleSelectionScreen";
import RegistrationScreen from "./components/RegistrationScreen";
import LoginScreen from "./components/LoginScreen";
import FarmerDashboard from "./components/FarmerDashboard";
import FarmScreen from "./components/FarmScreen"; 
import OrderScreen from "./components/OrderScreen"; 
import MoreScreen from "./components/MoreScreen"; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: "slide_from_right",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, 
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" 
          component={LoginScreen} 
          options={{
            animation: "fade",
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} />
        <Stack.Screen name="FarmScreen" component={FarmScreen} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="MoreScreen" component={MoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
