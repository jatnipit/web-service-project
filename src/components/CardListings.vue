<script setup>
import CardListing from './CardListing.vue';

defineProps({
  products: Array,
  addItemToCart: Function,
});
</script>

<template>
  <div class="grid grid-cols-4 gap-8">
    <CardListing
      v-for="product in products"
      :product="product"
      :addItemToCart="addItemToCart"
    />
  </div>
</template>

<style>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
