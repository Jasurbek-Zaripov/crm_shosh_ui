import { configureStore } from '@reduxjs/toolkit';
import ChangeSlice from './change/index';
import ConsumptionSlice from './consumption/index';
import ConsumptionCategorySlice from './consumption_category/index';
import StaffSlice from './employess/index';
import InstantBookingModal from './instant_booking_modal/index';
import LidsSlice from './lids/index';
import authSlice from './login/authSlice';
import OldOrdersSlice from './old_orders/index';
import OrdersSlice from './orders/index';
import ProductsSlice from './products/index';
import RoomsSlice from './rooms/index';
import ServicesOrdersSlice from './servies_orders/index';
import TaskSlice from './task/index';
import Users from './users/index';

export const store = configureStore({
  reducer: {
    Login: authSlice,
    Order: OrdersSlice,
    Rooms: RoomsSlice,
    ConsumptionCategori: ConsumptionCategorySlice,
    Consumption: ConsumptionSlice,
    Lids: LidsSlice,
    Staff: StaffSlice,
    Task: TaskSlice,
    ServicesOrders: ServicesOrdersSlice,
    Products: ProductsSlice,
    Change: ChangeSlice,
    OldOrders: OldOrdersSlice,
    InstantBookingModal,
    Users,
  },
});
