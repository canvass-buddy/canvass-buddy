import { AntDesign } from '@expo/vector-icons';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Text,
  Icon,
} from '@ui-kitten/components';
import { TabParamList } from './types';
import { Home } from './Home';
import { Search } from './Search/Search';
import { Profile } from './Profile/Profile';

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="Home"
      icon={(props: any) => {
        return <AntDesign name="home" color={props.style.tintColor} />;
      }}
    />
    <BottomNavigationTab
      title="Search"
      icon={(props: any) => {
        return <AntDesign name="search1" color={props.style.tintColor} />;
      }}
    />
    <BottomNavigationTab
      title="Profile"
      icon={(props: any) => {
        return <AntDesign name="user" color={props.style.tintColor} />;
      }}
    />
  </BottomNavigation>
);

export const TabsScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
