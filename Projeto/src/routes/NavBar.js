import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home/Home";
import Config from "../pages/config/Config";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Help from "../pages/ajuda/Help";

const NavBar = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Suporte" component={Help} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    focused ? (
                        <MaterialIcons name="contact-support" size={size} color="#000"></MaterialIcons>
                    ) : (
                        <MaterialIcons name="contact-support" size={size} color={color}></MaterialIcons>
                    )
                ),
                tabBarLabelStyle: { color: "#000" },
                headerShown: false,
            }}
            />
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    focused ? (
                        <Ionicons name="home" size={size} color="#000" />
                    ) : (
                        <Ionicons name="home-outline" size={size} color={color} />
                    )
                ),
                tabBarLabelStyle: { color: "#000" },
                headerShown: false,
            }} />
            <Tab.Screen name="Config" component={Config} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    focused ? (
                        <Ionicons name="settings" size={size} color="#000" />
                    ) : (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    )
                ),
                tabBarLabelStyle: { color: "#000" },
                headerShown: false,
            }} />
        </Tab.Navigator>
    )
};

export default NavBar;