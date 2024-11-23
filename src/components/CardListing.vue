<script setup>
import { ref } from 'vue';

import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();

const props = defineProps({
  product: Object,
  addItemToCart: Function,
});
const quantity = ref(1);

const handleAddToCart = () => {
  // if (quantity.value > props.product.stock) {
  //   alert('Quantity cannot be greater than stock');
  //   return -1;
  // }

  const itemData = {
    userId: accountStore.user.id,
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    quantity: parseInt(
      document.getElementById(`${props.product.id}-quantity`).value
    ),
    imgUrl: props.product.imgUrl,
  };

  props.addItemToCart(itemData);
};

// props.addItemToCart({ greet: 'hello' });
// console.log(props.product);
</script>

<template>
  <div
    class="border-[rgb(231, 231, 231)] transition-[transform, shadow] card mb-5 rounded-md border bg-base-100 duration-150 will-change-transform hover:-translate-y-1 hover:shadow-xl"
  >
    <figure class="mb-[0.625rem] p-[0.625rem]">
      <img
        :src="`https://30e6-158-108-229-150.ngrok-free.app/img_product/${product.id}.png`"
        :alt="product.name"
        width="250"
        height="208"
      />
    </figure>
    <div class="card-body p-[0.625rem]">
      <h2
        class="text[#0B264C] card-title mb-[0.625rem] h-[42px] items-start justify-center overflow-hidden px-[0.9375rem] text-center text-sm font-[700]"
      >
        {{ product.name }}
      </h2>
      <span class="mb-[0.125rem] text-center text-lg font-[700] text-[#E39E25]"
        >&#3647;<span>{{ product.price }}</span></span
      >
      <span class="mt-[0.3125rem] text-center text-xs font-[700]">
        <span>{{ product.quantity }}</span> in stock</span
      >
      <!-- <span>{{ product.quantity }}</span> in stock</span -->
      <div class="flex gap-4">
        <div class="border-[#BCBCBC ] w-1/4 flex-auto rounded-md border">
          <label for="" class="flex h-full items-center">
            <span class="w-1/4 flex-auto text-center text-[#bcbcbc]"
              ><button @click="if (quantity > 1) quantity--;">-</button></span
            >
            <input
              v-model="quantity"
              :id="`${product.id}-quantity`"
              type="number"
              value="1"
              class="w-2/4 flex-auto text-center font-[700] text-[#0B264C] focus:outline-none"
            />
            <span class="w-1/4 flex-auto text-center text-[#bcbcbc]"
              ><button @click="if (quantity < product.quantity) quantity++;">
                <!-- ><button @click="if (quantity < product.stock) quantity++;"> -->
                +
              </button></span
            >
          </label>
        </div>
        <button
          @click="handleAddToCart()"
          class="btn-primary-custom w-2/4 flex-auto"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>
