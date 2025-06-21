import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from '/src/store/reducers/cotegories/categories';
import todoReudcer from '/src/store/reducers/todo/todo';
import cattodoReducer from './reducers/cattodo/cattodo';
import catcategoriesReducer from './reducers/catcategories/catcategories';
import rtctodoReducer from './reducers/rtctodo/rtctodo';
import rtccategoriesReducer from './reducers/rtccategories/trccategories';
import { rtccategoriesApi } from './reducers/rtccategoriesApi';
import { rtctodoApi } from './reducers/rtctodoApi';
import InfoByIdReducer from './reducers/info-by-id/info-by-id' 

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    todo: todoReudcer,
    cattodo: cattodoReducer,
    catcategories: catcategoriesReducer,
    rtctodo: rtctodoReducer,
    rtccategories: rtccategoriesReducer,
    info: InfoByIdReducer,

    [rtccategoriesApi.reducerPath]: rtccategoriesApi.reducer,
    [rtctodoApi.reducerPath]: rtctodoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtccategoriesApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtctodoApi.middleware),
});
