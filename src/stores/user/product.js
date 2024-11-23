import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
  }),
  actions: {
    async loadProducts() {
      try {
        // const response = await axios.get('http://localhost:3000/products');
        const response = await axios.get(
          'https://30e6-158-108-229-150.ngrok-free.app/main-product',
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
              'Content-type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        console.log('Products loaded:', response.data);

        if (response.data.length !== 0) {
          console.log('Products found:', response.data);
          this.products = response.data;
          return -1;
        }

        console.log('No products found');
      } catch (error) {
        console.log('Error loading products:', error);
      }
    },
    filterProducts(searchText) {
      return this.products.filter((product) => {
        return product.name.toLowerCase().includes(searchText.toLowerCase());
      });
    },
  },
});
