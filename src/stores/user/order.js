import { defineStore } from 'pinia';
import axios from 'axios';
import { useAccountStore } from '@/stores/account';

export const useUserOrderStore = defineStore('user-order', {
  state: () => ({
    orders: [],
  }),
  actions: {
    async loadOrders() {
      try {
        const accountStore = useAccountStore();

        const response = await axios.get(
          `https://30e6-158-108-229-150.ngrok-free.app/show-order-history/${accountStore.user.id}`,
          {
            withCredentials: true,
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
              'ngrok-skip-browser-warning': '69420',
              'Content-type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        console.log(response.data);

        this.orders = response.data.orders;

        console.log('this orders', this.orders);
      } catch (error) {
        console.log('Error getting orders:', error);
      }
    },
    async getOrderById(id = 1) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/${id}`
        );

        this.orders.push(response.data);
        console.log(this.orders);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
