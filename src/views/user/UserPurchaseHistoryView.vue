<script setup>
import { onMounted } from 'vue';

import UserDashboardLayout from '@/layouts/UserDashboardLayout.vue';

import { useProductStore } from '@/stores/user/product';
import { useUserOrderStore } from '@/stores/user/order';
// import {  } from '@/stores/'

const productStore = useProductStore();
const userOrderStore = useUserOrderStore();

onMounted(async () => {
  try {
    await userOrderStore.loadOrders();
  } catch (error) {
    console.log('error from user purchase history', error);
  }
});
</script>

<template>
  <UserDashboardLayout>
    <section class="h-ful w-full">
      <!-- <div class="px-[1.875rem] pb-8"> -->
      <div class="pb-8">
        <div>
          <!-- <div>
            <label
              class="input input-bordered flex items-center gap-2 rounded-md"
            >
              <input type="text" class="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </label>
          </div> -->
          <!-- Purchase history listings -->
          <div
            v-for="order in userOrderStore.orders"
            class="my-3 rounded-sm bg-base-100 shadow-lg"
          >
            <div>
              <div class="px-[1.875rem] pb-3 pt-6">
                <div>
                  <div class="flex items-center justify-between pb-3">
                    <!-- Left side -->
                    <div class="flex items-center">
                      <i class="pi pi-shop"></i>
                      <div class="ml-2 text-sm font-[600]">Kitti Salt</div>
                    </div>
                    <!-- Left side -->

                    <!-- Right side -->
                    <div class="flex items-center">
                      <div
                        class="mr-[0.625rem] border-r border-[rgba(0,0,0,.12)] pr-[0.625rem]"
                      >
                        <div class="text-sm text-navy-700">
                          <i
                            class="pi pi-truck mb-[0.0625rem] mr-1 align-middle"
                          ></i>
                          The parcel was successfully delivered:
                          {{ order.address }} {{ order.country }}
                          {{ order.zip }}
                        </div>
                      </div>
                      <div
                        class="whitespace-nowrap text-right text-sm uppercase text-navy-500"
                      >
                        Completed
                      </div>
                    </div>
                    <!-- Right side -->
                  </div>
                  <div class="divider mt-0"></div>
                  <div>
                    <table class="table">
                      <tbody>
                        <!-- row 1 -->
                        <tr v-for="item in order.orderItems">
                          <td>
                            <div class="avatar">
                              <div class="mask mask-squircle h-12 w-12">
                                <img
                                  :src="`https://30e6-158-108-229-150.ngrok-free.app/img_product/${item.productId}.png`"
                                  :alt="item.name"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            {{ item.name }}
                            <br />
                            <span class="badge badge-ghost badge-sm"
                              >x<span>{{ item.quantity }}</span></span
                            >
                          </td>
                          <td>
                            &#3647;<span>{{ item.price }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="divider mt-0"></div>

            <div class="px-6 pb-3 pt-6">
              <div class="flex items-center justify-end">
                <label class="mr-[0.625rem]">Order Total: </label>
                <div class="text-xl font-[700] text-navy-700">
                  &#3647;{{ order.total }}
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between px-6 pb-6 pt-3">
              <div>
                <div class="hidden text-left text-xs text-[rgba(0,0,0,.54)]">
                  Cancelled by you
                </div>
              </div>

              <div class="flex [&>button]:ml-[0.625rem]">
                <button class="btn-primary-custom hidden">Buy Again</button>
                <button
                  class="hidden h-[40px] rounded border border-navy-500 px-5 font-[500] text-navy-500 transition-all hover:bg-navy-500 hover:text-white"
                >
                  View Cancellation Details
                </button>
                <button
                  class="hidden h-[40px] rounded border border-navy-500 px-5 font-[500] text-navy-500 transition-all hover:bg-navy-500 hover:text-white"
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
          <!-- Purchase history listings -->
        </div>
      </div>
    </section>
  </UserDashboardLayout>
</template>
