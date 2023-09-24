import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from '../Reducers/ShoppingReducer.jsx';

const store = configureStore({
    reducer: {
        shopping: shoppingReducer,
    },
});

export default store;
