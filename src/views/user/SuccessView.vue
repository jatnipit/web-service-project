<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue';

import { useAccountStore } from '@/stores/account';
import { useUserCartStore } from '@/stores/user/cart';
import { useProductStore } from '@/stores/user/product';

const router = useRouter();
const accountStore = useAccountStore();
const userCartStore = useUserCartStore();
const productStore = useProductStore();

onMounted(() => {
  if (!accountStore.isLoggedIn) {
    router.push({ name: 'login' });
  }

  // console.log('checkout', userCartStore.isCheckout);
  // if (!userCartStore.isCheckout) {
  //   router.push({ name: 'home' });
  // }
});
</script>

<template>
  <UserLayout>
    <section class="mt-[4.5625rem]">
      <div class="py-[3.125rem]">
        <div class="mx-auto max-w-4xl">
          <div class="p-6 shadow-md">
            <h1 class="text-3xl font-semibold">Your order is successful!</h1>
            <div>
              Hello, {{ userCartStore.checkout.firstName }}
              {{ userCartStore.checkout.lastName }}
            </div>
            <div>Get ready to receive your products</div>
            <div class="divider"></div>
            <div class="flex justify-between">
              <div>
                <div class="font-bold">Order Date</div>
                <div>{{ new Date().toLocaleString() }}</div>
              </div>
              <div>
                <div class="font-bold">Order Number</div>
                <!-- <div class="mx-auto w-fit">{{ userCartStore.checkout.id }}</div> -->
                <div class="mx-auto w-fit">{{ userCartStore.checkout.id }}</div>
              </div>
              <div>
                <div class="font-bold">Payment Method</div>
                <div>Promptpay</div>
              </div>
              <div>
                <div class="font-bold">Address</div>
                <!-- <div>{{ userCartStore.checkout.shippingAddress }}</div> -->
                <div>
                  {{ userCartStore.checkout.address }}
                  {{ userCartStore.checkout.country }}
                  {{ userCartStore.checkout.zip }}
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="space-y-8">
              <!-- <div
                v-for="item in userCartStore.checkout.orderItems"
                class="flex items-center gap-4"
              > -->
              <div
                v-for="item in userCartStore.checkout.items"
                class="flex items-center gap-4"
              >
                <img
                  class="h-[100px] w-[100px] object-cover"
                  :src="`https://30e6-158-108-229-150.ngrok-free.app/img_product/${item.productId}.png`"
                  alt=""
                />
                <div class="flex flex-auto items-center justify-between">
                  <div>
                    <div>{{ item.name }}</div>
                    <!-- <div>x{{ item.quantity }}</div> -->
                    <div>x{{ item.quantity }}</div>
                  </div>
                  <div>&#3647;{{ item.price }}</div>
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="flex items-center justify-between font-medium">
              <div>Subtotal Cost</div>
              <!-- <div>&#3647;{{ userCartStore.checkout.total }}</div> -->
              <div>&#3647;{{ userCartStore.checkout.total }}</div>
            </div>
            <div class="flex items-center justify-between font-medium">
              <div>Shipping Cost</div>
              <div>&#3647;0</div>
            </div>
            <div class="divider"></div>
            <div class="flex items-center justify-between font-medium">
              <div>Total Cost</div>
              <!-- <div>&#3647;{{ userCartStore.checkout.total }}</div> -->
              <div>&#3647;{{ userCartStore.checkout.total }}</div>
            </div>
            <div class="divider"></div>
            <div>Thank you for choose Future Commerce</div>
          </div>
        </div>
      </div>
    </section>
  </UserLayout>
</template>
