import { defineStore } from 'pinia';
import axios from 'axios';

import { useAccountStore } from '@/stores/account';

export const useUserCartStore = defineStore('user-cart', {
  state: () => ({
    items: [],
    checkout: {},
    isCheckout: false,
  }),
  getters: {
    totalPrice(state) {
      return state.items.reduce(
        (acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity),
        0
      );
    },
    totalQuantity(state) {
      return state.items.reduce(
        (acc, item) => acc + parseInt(item.quantity),
        0
      );
    },
  },
  actions: {
    async addItemToCart(product) {
      try {
        console.log(product);

        const indexOfAddedItem = this.items.findIndex(
          (item) => item.id === product.id
        );

        if (indexOfAddedItem >= 0) {
          this.updateItemInCart(
            indexOfAddedItem,
            this.items[indexOfAddedItem].quantity + parseInt(product.quantity)
          );
          return -1;
        }

        const response = await axios.post(
          'https://30e6-158-108-229-150.ngrok-free.app/add-item-to-cart',
          product,
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
              'Content-type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        console.log(response.data);

        this.items.push(product);
      } catch (error) {
        console.log('Error adding item to cart', error);
      }
    },
    async updateItemInCart(index, quantity) {
      try {
        console.log('update item in cart:', this.items[index]);

        console.log('quantity', quantity);

        const cartItemId = this.items[index].cartItemId;

        const parsedQuantity = parseInt(quantity);

        const response = await axios.put(
          `https://30e6-158-108-229-150.ngrok-free.app/update-item-in-cart/${cartItemId}`,
          { quantity: parsedQuantity, productId: this.items[index].productId },
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
              'Content-type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        console.log('updated item in cart', response.data);
      } catch (error) {
        console.log('Error updating item in cart', error);
      }
      this.items[index].quantity = quantity;
    },
    async removeItemInCart(index) {
      try {
        // await axios.delete(
        //   `http://localhost:3000/api/carts/items/${this.items[index].cartItemId}`
        // );

        await axios.delete(
          `https://30e6-158-108-229-150.ngrok-free.app/delete-item-from-cart/${this.items[index].cartItemId}`
        );
        this.items.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
      // console.log(index);
    },

    async checkout(orderData) {
      try {
        console.log(orderData);
        const response = await axios.post(
          `https://30e6-158-108-229-150.ngrok-free.app/order-checkout`,
          orderData,
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
              'Content-type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        console.log('checkout success', response.data);

        // this.isCheckout = true;
        // console.log('checkout success');
        this.checkout = response.data.order;
        this.checkout.items = this.items;
        console.log('after checkout:', this.checkout);
        this.items = [];
        // await this.loadCart();
      } catch (error) {
        console.log('error checkout', error);
      }
    },
    async loadCart() {
      try {
        console.log('load cart');

        const accountStore = useAccountStore();

        if (!accountStore.isLoggedIn) {
          console.log('not logged in');
          this.items = [];
          return -1;
        }

        // const response = await axios.get(
        //   `http://localhost:3000/api/carts/${accountStore.user.id}`
        // );

        const response = await axios.get(
          `https://30e6-158-108-229-150.ngrok-free.app/show-item-in-cart/${accountStore.user.id}`,
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
              'Content-type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
        this.items = response.data.cartItems;
        console.log('Cart loaded:', response.data);
      } catch (error) {
        console.log('Error loading cart', error);
      }
    },
    // removeItemInCart(index) {
    //   console.log(this.items);
    //   this.items.splice(index, 1);
    //   console.log(this.items);
    // },
    // checkout(orderData) {
    //   console.log('checkout');
    //   console.log(orderData);

    //   this.checkout = orderData;
    //   this.checkout.items = this.items;
    //   this.checkout.totalPrice = this.totalPrice;

    //   console.log(this.checkout);
    // },
  },
});
