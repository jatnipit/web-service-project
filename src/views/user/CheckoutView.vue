<script setup>
import { ref, reactive, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue';

// import { useProductStore } from '@/stores/user/product';
import { useUserCartStore } from '@/stores/user/cart';
import { useAccountStore } from '@/stores/account';

// const productStore = useProductStore();
const userCartStore = useUserCartStore();
const accountStore = useAccountStore();
const router = useRouter();

const countries = [
  'Andorra',
  'Argentina',
  'Australia',
  'Austria',
  'Bahrain',
  'Belgium',
  'Bulgaria',
  'Canada',
  'Cayman Islands',
  'Chile',
  'China',
  'Colombia',
  'Costa Rica',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Dominican Republic',
  'Ecuador',
  'Estonia',
  'Finland',
  'France',
  'Georgia',
  'Germany',
  'Greece',
  'Greenland',
  'Grenada',
  'Guatemala',
  'Holy See (Vatican City State)',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'Indonesia',
  'Ireland',
  'Italy',
  'Japan',
  'Korea, Republic of',
  'Kuwait',
  'Latvia',
  'Lebanon',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macedonia, Republic of',
  'Malaysia',
  'Malta',
  'Mauritius',
  'Mexico',
  'Moldova',
  'Monaco',
  'Montenegro, Republic of',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Oman',
  'Panama',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'San Marino',
  'Saudi Arabia',
  'Scotland',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'South Africa',
  'Spain',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Thailand',
  'Turkey',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Venezuela',
  'Vietnam',
  'Wales',
];

// const selectedCountry = ref('Thailand');

const formData = reactive({
  userId: accountStore.user.id,
  firstName: '',
  lastName: '',
  address: '',
  country: 'Thailand',
  zip: '',
  email: '',
  totalPrice: userCartStore.totalPrice,
});

const handleSubmit = () => {
  try {
    console.log(formData);
    userCartStore.checkout(formData);
    router.push({ name: 'success' });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  if (!accountStore.isLoggedIn) {
    router.push({ name: 'login' });
  }
});
</script>

<template>
  <UserLayout>
    <section class="mt-[4.5625rem]">
      <div class="container mx-auto">
        <div class="px-[0.875rem]">
          <form @submit.prevent="handleSubmit()">
            class="py-[3.125rem]">
            <div class="flex">
              <!-- Left side -->
              <div class="w-4/6 flex-auto px-[0.875rem] pb-[1.875rem]">
                <div>
                  <!-- Header -->
                  <div class="mb-5">
                    <h3
                      class="mt-[0.875rem] pb-[0.625rem] text-2xl font-[700] text-navy-700"
                    >
                      Billing Information
                    </h3>
                  </div>
                  <!-- Header -->

                  <!-- Form input -->
                  <div>
                    <!-- 1st row -->
                    <div class="mb-[0.9375rem] flex">
                      <label class="form-control w-full px-[0.9375rem]">
                        <div class="label">
                          <span class="label-text">First Name</span>
                        </div>
                        <input
                          v-model="formData.firstName"
                          type="text"
                          placeholder="First Name"
                          class="input input-bordered w-full"
                          required
                        />
                      </label>
                      <label class="form-control w-full px-[0.9375rem]">
                        <div class="label">
                          <span class="label-text">Last Name</span>
                        </div>
                        <input
                          v-model="formData.lastName"
                          type="text"
                          placeholder="Last Name"
                          class="input input-bordered w-full"
                          required
                        />
                      </label>
                    </div>
                    <!-- 1st row -->

                    <!-- 2nd row -->
                    <div class="mb-[0.9375rem] flex">
                      <label class="form-control w-full px-[0.9375rem]">
                        <div class="label">
                          <span class="label-text">Address</span>
                        </div>
                        <input
                          v-model="formData.address"
                          type="text"
                          placeholder="Address"
                          class="input input-bordered w-full"
                          required
                        />
                      </label>
                      <!-- <label class="form-control w-2/6 px-[0.9375rem]">
                        <div class="label">
                          <span class="label-text">Apt., Suite (optional)</span>
                        </div>
                        <input
                          v-model="formData.apt"
                          type="text"
                          placeholder="Apt., Suite (optional)"
                          class="input input-bordered w-full"
                        />
                      </label> -->
                    </div>
                    <!-- 2nd row -->

                    <!-- 3rd row -->
                    <!-- <div class="mb-[0.9375rem]">
                      <label class="form-control w-full px-[0.9375rem]">
                        <div class="label">
                          <span class="label-text">City</span>
                        </div>
                        <input
                          v-model="formData.city"
                          type="text"
                          placeholder="City"
                          class="input input-bordered w-full"
                        />
                      </label>
                    </div> -->
                    <!-- 3rd row -->

                    <!-- 4th row -->
                    <div class="mb-[0.9375rem] flex">
                      <label class="form-control w-[75%] px-[0.9375rem]">
                        <div class="label">
                          <span class="label-text">Country</span>
                        </div>
                        <select
                          class="select select-bordered"
                          v-model="formData.country"
                          reequired
                        >
                          <!-- <option disabled selected>Country</option> -->
                          <option v-for="country in countries" :value="country">
                            {{ country }}
                          </option>
                        </select>
                      </label>
                      <label class="form-control w-[25%] px-[0.9375rem]">
                        <div class="label">
                          <span class="label-text">Zip</span>
                        </div>
                        <input
                          v-model="formData.zip"
                          type="text"
                          placeholder="Zip"
                          class="input input-bordered w-full"
                          required
                        />
                      </label>
                    </div>
                    <!-- 4th row -->

                    <!-- 5th row -->
                    <div class="mb-[0.9375rem]">
                      <label class="form-control w-full px-[0.9375rem]">
                        <div class="label">
                          <span class="label-text">Email</span>
                        </div>
                        <input
                          v-model="formData.email"
                          type="Email"
                          placeholder="Email"
                          class="input input-bordered w-full"
                          required
                        />
                      </label>
                    </div>
                    <!-- 5th row -->
                  </div>
                  <!-- Form input -->

                  <!-- Buttons -->
                  <div class="mb-[1.25rem] mt-[2.1875rem] px-[0.9375rem]">
                    <button
                      type="submit"
                      class="btn-primary-custom btn-block mb-5"
                    >
                      Pay
                    </button>
                    <RouterLink
                      :to="{ name: 'cart' }"
                      class="block text-center font-[500] text-navy-500"
                      >Back to cart</RouterLink
                    >
                  </div>
                  <!-- Buttons -->
                </div>
              </div>
              <!-- Left side -->

              <!-- Right side -->
              <div
                class="w-2/6 flex-auto rounded-md bg-base-100 px-[0.9375rem] py-[0.625rem]"
              >
                <!-- Header -->
                <div class="p-[0.9375rem]">
                  <h3 class="text-2xl font-[700] text-navy-700">
                    Order Summary
                  </h3>
                </div>
                <!-- Header -->

                <div class="divider my-0"></div>

                <!-- Product summary -->
                <div>
                  <!-- Product listings -->
                  <div
                    class="mb-[0.9375rem] mt-[1.5625rem] max-h-[465px] overflow-x-hidden pr-[0.625rem]"
                  >
                    <!-- Scrollbox product -->
                    <div class="overflow-x-auto">
                      <table class="table">
                        <tbody>
                          <!-- row 1 -->
                          <tr v-for="product in userCartStore.items">
                            <td>
                              <div class="avatar relative">
                                <div class="mask mask-squircle h-12 w-12">
                                  <img
                                    :src="`https://30e6-158-108-229-150.ngrok-free.app/img_product/${product.productId}.png`"
                                    :alt="product.name"
                                  />
                                </div>
                                <div
                                  class="absolute -right-2 -top-2 w-[20px] rounded-full bg-navy-500 text-center align-middle text-base-100"
                                >
                                  {{ product.quantity }}
                                </div>
                              </div>
                            </td>
                            <td>
                              {{ product.name }}
                              <br />
                              <span class="badge badge-ghost badge-sm"
                                >&#3647;<span>{{ product.price }}</span></span
                              >
                            </td>
                            <td>
                              &#3647;<span>{{ product.price }}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- Scrollbox product -->
                  </div>
                  <!-- Product listings -->

                  <div class="divider mt-0"></div>

                  <!-- Summary -->
                  <div>
                    <!--Subtotal summary -->
                    <div class="pb-[0.625rem] text-sm text-navy-700">
                      <div class="flex items-center justify-between">
                        <div>Subtotal</div>
                        <div class="font-[600]">
                          &#3647;<span>{{ userCartStore.totalPrice }}</span>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <div>Delivery</div>
                        <div>Free</div>
                      </div>
                      <div class="flex items-center justify-between">
                        <div>State Tax</div>
                        <div>&#3647;<span>0.00</span></div>
                      </div>
                    </div>
                    <!-- Subtotal summary -->

                    <div class="divider my-0"></div>

                    <!-- Total summary -->
                    <div class="py-[0.9375rem] text-navy-700">
                      <div class="flex items-center justify-between">
                        <div class="text-sm">
                          Total
                          <span class="text-xs font-[400]"
                            >(The price is in THB)</span
                          >
                        </div>
                        <div class="text-xl font-[700]">
                          &#3647;<span>{{ userCartStore.totalPrice }}</span> THB
                        </div>
                      </div>
                    </div>
                    <!-- Total summary -->
                  </div>
                  <!-- Summary -->
                </div>

                <!-- Product summary -->
              </div>
              <!-- Right side -->
            </div>
          </form>
        </div>
      </div>
    </section>
  </UserLayout>
</template>
