<script setup>
import { onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue';

// import { useProductStore } from '@/stores/user/product';
import { useUserCartStore } from '@/stores/user/cart';
import { useAccountStore } from '@/stores/account';
const router = useRouter();

// const productStore = useProductStore();
const userCartStore = useUserCartStore();
const accountStore = useAccountStore();

onMounted(() => {
  if (!accountStore.isLoggedIn) {
    router.push({ name: 'login' });
  }
});
</script>

<template>
  <UserLayout>
    <div
      v-if="userCartStore.totalQuantity === 0"
      class="mt-[4.5625rem] pb-[3.75rem]"
    >
      <div class="mx-auto max-w-md">
        <div class="mb-[1.5625rem] pt-[5.625rem]">
          <h1
            class="pb-[0.625rem] text-center text-[2rem] font-[700] text-navy-700"
          >
            View Cart
          </h1>
        </div>
        <div class="text-center text-lg font-[700] text-navy-700">
          Hope to see you again!
        </div>
        <div class="pb-6 text-center text-sm font-[300] text-navy-500">
          You don't have any products in your shopping cart.
        </div>
        <div class="text-center">
          <RouterLink :to="{ name: 'home' }">
            <button class="btn-primary-custom w-full">
              Click Here To Continue
            </button>
          </RouterLink>
        </div>
        <div class="mt-[2.5rem] text-center text-sm">
          or go back to
          <RouterLink :to="{ name: 'home' }" class="text-navy-500 underline"
            >Home Page</RouterLink
          >
        </div>
      </div>
    </div>
    <div v-else class="mt-[4.5625rem] pb-[3.125rem]">
      <div class="container mx-auto mb-[1.5625rem] pt-[3.125rem]">
        <h1 class="pb-[0.625rem] text-[2rem] font-[700] text-navy-700">
          Shopping Cart
        </h1>
      </div>
      <div class="container mx-auto">
        <div class="flex items-start gap-4">
          <!-- Left side -->
          <div class="w-4/6 flex-auto px-[0.9375rem]">
            <div class="p-[0.625rem]">
              <span class="mb-4 block text-right text-sm text-navy-500"
                ><span>{{ userCartStore.totalQuantity }}</span> Items</span
              >
            </div>
            <ul class="space-y-6">
              <li
                v-for="(product, index) in userCartStore.items"
                class="transition-[transform, shadow] rounded-md bg-base-100 p-[1.5625rem] shadow-sm duration-150 will-change-transform hover:-translate-y-1 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              >
                <div class="flex">
                  <div class="w-1/4">
                    <img
                      :src="`https://30e6-158-108-229-150.ngrok-free.app/img_product/${product.productId}.png`"
                      :alt="product.name"
                      width="100"
                      height="100"
                      class="mx-auto"
                    />
                  </div>
                  <div class="w-3/4">
                    <div class="font-[600] text-navy-700">
                      <a href="#">{{ product.name }}</a>
                    </div>
                    <div
                      class="mb-[0.9375rem] mt-[2.5rem] flex items-center justify-between"
                    >
                      <span class="text-2xl font-[600] text-orangeCustom-400"
                        >&#3647;<span>{{ product.price }}</span></span
                      >
                      <button
                        @click="userCartStore.removeItemInCart(index)"
                        class="text-base text-grayCustom-200"
                      >
                        Remove
                      </button>
                    </div>
                    <div
                      class="h-[40px] w-[80px] rounded-md border border-[#BCBCBC]"
                    >
                      <label for="" class="flex h-full items-center">
                        <span class="w-1/4 flex-auto text-center text-[#bcbcbc]"
                          ><button
                            @click="
                              userCartStore.updateItemInCart(
                                index,
                                --product.quantity
                              )
                            "
                          >
                            -
                          </button></span
                        >
                        <input
                          @change="
                            userCartStore.updateItemInCart(
                              index,
                              $event.target.value
                            )
                          "
                          v-model="product.quantity"
                          type="number"
                          value="1"
                          class="w-2/4 flex-auto text-center font-[700] text-[#0B264C] focus:outline-none"
                        />
                        <span class="w-1/4 flex-auto text-center text-[#bcbcbc]"
                          ><button
                            @click="
                              userCartStore.updateItemInCart(
                                index,
                                ++product.quantity
                              )
                            "
                          >
                            +
                          </button></span
                        >
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="mt-[0.9375rem] p-[0.625rem] text-right">
              Subtotal (<span>{{ userCartStore.totalQuantity }}</span> items):
              <span class="font-[700]"
                >&#3647;<span>{{ userCartStore.totalPrice }}</span></span
              >
            </div>
          </div>
          <!-- Left side -->

          <!-- Right side -->
          <div class="w-1/6 flex-auto px-[0.9375rem]">
            <div
              class="rounded-md bg-base-100 px-5 pb-5 pt-[0.9375rem] shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            >
              <div>
                <div>
                  <div class="text-2xl font-[600] text-navy-700">
                    Order Summary
                  </div>
                </div>
                <div class="divider"></div>
                <div class="flex items-center justify-between text-navy-700">
                  <div>Subtotal</div>
                  <div class="font-[700]">
                    &#3647;<span>{{ userCartStore.totalPrice }}</span>
                  </div>
                </div>
                <div class="flex items-center justify-between text-navy-700">
                  <div>Total</div>
                  <div class="font-[700]">
                    &#3647;<span>{{ userCartStore.totalPrice }}</span>
                  </div>
                </div>
                <RouterLink :to="{ name: 'checkout' }">
                  <button class="btn-primary-custom btn-block mt-6">
                    Proceed to Checkout
                  </button>
                </RouterLink>
              </div>
            </div>
          </div>
          <!-- Right side -->
        </div>

        <div class="px-[1.5625rem] py-[0.875rem]">
          <RouterLink
            :to="{ name: 'home' }"
            class="font-[500] text-navy-500 underline hover:text-black"
            ><i class="pi pi-arrow-left"></i> Continue Shopping</RouterLink
          >
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<style scoped></style>
