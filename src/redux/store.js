import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./login/authSlice";
import OrdersSlice from "./orders/index";
import RoomsSlice from "./rooms/index"
import ConsumptionCategorySlice from './consumption_category/index'
import ConsumptionSlice from './consumption/index'
import LidsSlice from "./lids/index"
import StaffSlice from './employess/index'
import TaskSlice from './task/index'
import ServicesOrdersSlice from './servies_orders/index'
import ProductsSlice from './products/index'
import ChangeSlice from "./change/index"
import OldOrdersSlice from "./old_orders/index"
export const store = configureStore({
  reducer: {
    Login: authSlice,
    Order : OrdersSlice,
    Rooms : RoomsSlice,
    ConsumptionCategori: ConsumptionCategorySlice,
    Consumption:  ConsumptionSlice,
    Lids : LidsSlice,
    Staff: StaffSlice,
    Task: TaskSlice,
    ServicesOrders: ServicesOrdersSlice,
    Products: ProductsSlice,
    Change : ChangeSlice,
    OldOrders :OldOrdersSlice,
  },
});