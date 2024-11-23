<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

import { useProductStore } from './stores/user/product';
import { useUserCartStore } from './stores/user/cart';

const router = useRouter();
const productStore = useProductStore();
const userCartStore = useUserCartStore();

onMounted(async () => {
  try {
    await router.isReady();

    await productStore.loadProducts();
    await userCartStore.loadCart();
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
