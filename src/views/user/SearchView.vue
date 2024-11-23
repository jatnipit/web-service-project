<script setup>
import { watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import CardListings from '@/components/CardListings.vue';
import UserLayout from '@/layouts/UserLayout.vue';

import { useProductStore } from '@/stores/user/product';
import { useAccountStore } from '@/stores/account';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const accountStore = useAccountStore();

const searchText = ref('');
const filteredProducts = ref([]);

const addItemToCart = (product) => {
  if (accountStore.isLoggedIn) {
    console.log(product);
    userCartStore.addItemToCart(product);
    toast.success('Product added successfully.', {
      position: 'bottom-right',
    });
  } else {
    router.push({ name: 'login' });
  }
};

watch(
  () => route.query.q,
  (newSearchText) => {
    searchText.value = newSearchText;
    filteredProducts.value = productStore.filterProducts(newSearchText);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <UserLayout>
    <div class="mt-[67px]">
      <section class="container mx-auto pt-4">
        <h1 class="pb-[0.625rem] pt-2 text-[2rem] font-[700] text-navy-700">
          {{ searchText }}
        </h1>
        <div class="py-4">
          <div class="text-sm">
            Your search for
            <span class="font-[700]">{{ searchText }}</span> returned the
            following results...
          </div>
        </div>
      </section>
      <main>
        <div class="container mx-auto pb-10">
          <div class="mb-[2.5rem] mt-4">
            <h2 class="mb-5 text-lg font-[600]">
              Products [<span>{{ filteredProducts.length }}</span
              >]
            </h2>
          </div>
          <div class="">
            <CardListings
              :products="filteredProducts"
              :addItemToCart="addItemToCart"
            />
          </div>
        </div>
      </main>
    </div>
  </UserLayout>
</template>
