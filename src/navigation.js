import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";

import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";

const Stack = createNativeStackNavigator();

export default function Navigation() {

    const numberOfItems = useSelector(selectNumberOfItems);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
                <Stack.Screen
                    name="Products"
                    component={ProductsScreen}
                    options={({ navigation }) => ({
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            <Pressable
                                onPress={() => navigation.navigate('Cart')}
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                            >
                                <FontAwesome5 name='shopping-cart' size={18} color='gray' />
                                <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'gray' }}>{numberOfItems}</Text>
                            </Pressable>),
                    })}

                />
                <Stack.Screen
                    name="Product Details"
                    component={ProductDetailsScreen}
                    options={{ headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                    name="Cart"
                    component={ShoppingCart}

                    options={{ headerTitleAlign: 'center' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
