import axios from 'axios';
import { API_URL } from '../utils/api';

interface UserCreate {
  name: string;
  surname: string;
  father_name: string;
  birthday: string;
  phone: string;
  seriya: string;
  number: string;
  adress: string;
  dateof: string;
  email: string;
  orders: string;
}

interface RoomUpdate {
  rooms: string;
  type: string;
  count: string;
  status: string;
  filial: string;
}

interface OrderCreate {
  rooms: string;
  number_night: string;
  type_payment: string;
  phone: string;
  arrival_date: string;
  departure_date: string;
  count_users: string;
  country: string;
  status_payment: string;
  company: string;
  definition: string;
  booking: string;
  paid: string;
  debt: string;
  total_payable: string;
  comentary: string;
  staff: string;
  filial: string;
  company_details: string;
  sale: string;
  color: string;
  status_client: string;
}

/************************ Users ************************/
export async function UserCreate(body: UserCreate) {
  return axios.post(`${API_URL}/users`, body).then(res => res.data?.data);
}

export async function UserDelete(id: number) {
  return axios.delete(`${API_URL}/users/${id}`).then(res => res.data?.data);
}

export async function UserUpdate(id: number, body: Partial<UserCreate>) {
  return axios.put(`${API_URL}/users/${id}`, body).then(res => res.data?.data);
}
/************************ Rooms ************************/
export async function RoomUpdate(roomId: number, body: Partial<RoomUpdate>) {
  axios.put(`${API_URL}/rooms/${roomId}`, body).then(res => res.data?.data);
}
export async function EmptyRooms() {
  return axios.get(`${API_URL}/emptyrooms`).then(res => res.data?.data); // tekshirish kerak reduxda ham !!!!
}

export async function RoomsById(id: number) {
  return axios.get(`${API_URL}/rooms/${id}`).then(res => res.data?.data); // tekshirish kerak
}
/************************ Orders ************************/
export async function OrderCreate(body: OrderCreate) {
  return axios.post(`${API_URL}/orders`, body).then(res => res.data?.data);
}

export async function OrderHardDelete(id: number) {
  return axios.delete(`${API_URL}/fulldelete/${id}`).then(res => res.data?.data);
}

export async function OrderUpdateById(id: number, body: Partial<OrderCreate>) {
  return axios.put(`${API_URL}/orders/${id}`, body).then(res => res.data?.data);
}

export async function OrderOnlyUsers(id: number) {
  return axios.get(`${API_URL}/orders/users/${id}`).then(res => res.data?.data?.[0] || null);
}

export async function OrderGetById(id: number) {
  return axios.get(`${API_URL}/orders/${id}`).then(res => res.data?.data); // tekshirish kerak
}
