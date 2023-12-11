import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    useWindowDimensions,
    ScrollView,
    Pressable
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { cartSlice } from '../store/cartSlice';

export default function ProductDetailsScreen() {

    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.selectedProduct);
    const { width } = useWindowDimensions();

    const addToCart = () => {
        dispatch(cartSlice.actions.addCartItem({ product }));
    };

    return (
        <View>
            <ScrollView>
                {/* Image Carousel */}
                <FlatList
                    data={product.images}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={{
                                width: width,
                                aspectRatio: 1
                            }}
                        />
                    )}
                    horizontal //Carrusel horizontal
                    showsHorizontalScrollIndicator={false} //Ocultar barra de scroll
                    pagingEnabled //Centrar imagenes al hacer scroll
                />

                <View style={{ padding: 20 }}>
                    {/* Title */}
                    <Text style={styles.title}>{product.name}</Text>

                    {/* Price */}
                    <Text style={styles.price}>${product.price}</Text>

                    {/* Description */}
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>
            {/* Add to cart button */}
            <Pressable
                onPress={addToCart}
                style={styles.button}>
                <Text style={styles.buttonText}>Add to cart</Text>
            </Pressable>


            {/* Navigation icon */}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: "500",
        marginVertical: 10,

    },
    price: {
        fontWeight: "500",
        fontSize: 16,
        letterSpacing: 1.5,
    },
    description: {
        marginVertical: 10,
        fontSize: 15,
        lineHeight: 30,
        fontWeight: "200",
        marginBottom: 100,
        textAlign: "justify",
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
