import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    deliveryFee: 15,
    freeDeliveryFrom: 800,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const newProduct = action.payload.product;
            const existingProductID = state.items.find(item => item.product.id === newProduct.id);
            if (existingProductID) {
                existingProductID.quantity++;
                return;
            }
            else {
                state.items.push({ product: newProduct, quantity: 1 });
            }
        },
        changeQuantity: (state, action) => {
            const { productID, amount } = action.payload;
            const cartItem = state.items.find(item => item.product.id === productID);

            if (cartItem) { cartItem.quantity += amount; }
            if (cartItem.quantity <= 0) {
                state.items = state.items.filter(item => item.product.id !== productID);
            }
        },
    }
});

export const selectNumberOfItems = (state) => state.cart.items.length;
export const selectSubtotal = (state) => {
    return state.cart.items.reduce((sum, cartItem) => {
        return sum + cartItem.product.price * cartItem.quantity;
    }, 0);
}
const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
    cartSelector,
    selectSubtotal,
    (cart, subtotal) => subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee
)

export const selectTotal = createSelector(
    selectSubtotal,
    selectDeliveryPrice,
    (subtotal, deliveryPrice) => subtotal + deliveryPrice
);