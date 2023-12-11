
import { StyleSheet, View, Image, FlatList, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { productsSlice } from '../store/productsSlice';

export default function ProductsScreen({ navigation }) {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Pressable onPress={() => {
                    //Update selected product
                    dispatch(productsSlice.actions.setSelectedProduct(item.id));
                    navigation.navigate('Product Details')

                }} style={styles.itemContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </Pressable>
            )}
            numColumns={2}
        />
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: '50%',
        padding: 1
    },
    image: {
        width: '100%',
        aspectRatio: 1
    }
});
