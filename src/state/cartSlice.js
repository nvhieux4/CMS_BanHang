import { CONSTANT } from 'common/constant';

const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'dataCart',
    initialState: [],
    reducers: {
        addProductToCart: (state, action) => {
            console.log(action);
            var product = action.payload;
            const isAdd = state.find((item) => item._id === product._id);
            if (isAdd) {
                const newCart = state.map((item) => {
                    if (item._id === product._id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }

                    return item;
                });

                return newCart;
            } else {
                return [...state, { ...product, quantity: 1 }];
            }
        },
        changeProductCart: (state, action) => {
            const dataAction = action.payload;
            const newData = state.map((item) => {
                if (item._id === dataAction._id) {
                    if (dataAction.action === CONSTANT.ADD) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                            total: 5
                        };
                    } else if (dataAction.action === CONSTANT.SUBTRACT) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    }
                }

                return item;
            });

            return newData;
        },
        changeDeleteProductToCart: (state, action) => {
            const newState = state.filter((item) => item._id !== action.payload);

            return newState;
        }
    }
});

export const { addProductToCart, changeProductCart, changeDeleteProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
