import { Text, View, FlatList, StyleSheet, Pressable } from 'react-native';
import CartListItem from '../components/CartListItem';
import { useSelector } from 'react-redux';
import { selectSubtotal, selectDeliveryPrice, selectTotal } from '../store/cartSlice';


const ShoppingCartTotals = () => {

    const subtotal = useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector(selectTotal);

    return (
        <View style={styles.totalsContainer}>
            <View style={styles.row}>
                <Text style={styles.text}>Sub-Total:</Text>
                <Text style={styles.text}>{subtotal} $</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Delivery:</Text>
                <Text style={styles.text}>{deliveryFee} $</Text>
            </View>
            <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 10 }} />
            <View style={styles.row}>
                <Text style={styles.textBold}>Total:</Text>
                <Text style={styles.textBold}>{total} $</Text>
            </View>
        </ View>
    )
}

export default function ShoppingCart() {

    const cartItems = useSelector((state) => state.cart.items);

    const addToCart = () => {
        console.warn('Checkout');
    };

    return (
        <>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                ListFooterComponent={ShoppingCartTotals}
            />
            <Pressable
                onPress={addToCart}
                style={styles.button}>
                <Text style={styles.buttonText}>Checkout</Text>
            </Pressable>
        </>

    )
}

const styles = StyleSheet.create({
    totalsContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        color: "gray"
    },
    textBold: {
        fontSize: 16,
        fontWeight: "500",
        color: "black"
    },
    button: {
        position: "absolute",
        backgroundColor: "black",
        bottom: 30,
        width: "90%",
        alignSelf: "center",
        padding: 15,
        borderRadius: 100,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "800",
        textAlign: "center",
    }
});
