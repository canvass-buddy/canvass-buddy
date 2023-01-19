import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "ui";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home:undefined,
  Login:undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation}:NativeStackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Native</Text>
      <Button
        onClick={() => {
          console.log("Pressed!");
          navigation.push('Login')
          // navigation.navigate('Login', {})
        }}
        text="Boop"
        />
      <StatusBar style="auto" />
    </View>
  );
}

function LoginScreen({}:NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Button text="Login" onClick={() => {
        navigation.push('Home');
      }}/>
    </View>
  )
}

export default function Native() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
});
