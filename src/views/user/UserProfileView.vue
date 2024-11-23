<script setup>
import UserDashboardLayout from '@/layouts/UserDashboardLayout.vue';

import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();

const handleClick = () => {
  alert('This feature is under development. Please try again later.');
};
</script>

<template>
  <UserDashboardLayout>
    <section class="h-ful w-full rounded-sm bg-base-100 shadow-lg">
      <div class="px-[1.875rem] pb-8">
        <!-- Header -->
        <div class="pb-3 pt-[1.125rem]">
          <h1 class="text-lg font-[500]">My Profile</h1>
          <div class="mt-[0.1875rem] text-sm">
            Manage and protect your account
          </div>
        </div>
        <!-- Header -->
        <div class="divider my-0"></div>

        <!-- Content -->
        <div class="flex items-start pt-[1.875rem]">
          <!-- Left side -->
          <div class="w-[70%] flex-auto pr-[3.125rem]">
            <form @submit.prevent="">
              <table class="table">
                <tbody
                  class="[&>tr>td:first-child]:w-[25%] [&>tr>td:first-child]:text-right [&>tr]:border-b-0"
                >
                  <!-- row 1 -->
                  <tr>
                    <td>Username</td>
                    <td>
                      <div>
                        <label for="username">
                          <input
                            v-model="accountStore.user.userName"
                            name="username"
                            type="text"
                            placeholder=""
                            class="input input-bordered w-full"
                            disabled
                          />
                        </label>
                      </div>
                    </td>
                  </tr>
                  <!-- row 2 -->
                  <tr>
                    <td>First Name</td>
                    <td>
                      <div>
                        <label for="firstName">
                          <input
                            v-model="accountStore.user.firstName"
                            name="firstName"
                            type="text"
                            placeholder=""
                            class="input input-bordered w-full"
                            disabled
                          />
                        </label>
                      </div>
                    </td>
                  </tr>
                  <!-- row 3 -->
                  <tr>
                    <td>Last Name</td>
                    <td>
                      <div>
                        <label for="lastName">
                          <input
                            v-model="accountStore.user.lastName"
                            name="lastName"
                            type="text"
                            placeholder=""
                            class="input input-bordered w-full"
                            disabled
                          />
                        </label>
                      </div>
                    </td>
                  </tr>
                  <!-- row 4 -->
                  <tr>
                    <td>Email</td>
                    <td>
                      <div>
                        <div class="inline">{{ accountStore.user.email }}</div>
                        <button
                          @click="handleClick"
                          class="px-[0.375rem] py-[0.0625rem] text-navy-500 underline"
                        >
                          Change
                        </button>
                      </div>
                    </td>
                  </tr>
                  <!-- row 5 -->
                  <tr>
                    <td>Phone Number</td>
                    <td>
                      <div>
                        <div class="inline">{{ accountStore.user.phone }}</div>
                        <button
                          @click="handleClick"
                          class="px-[0.375rem] py-[0.0625rem] text-navy-500 underline"
                        >
                          Change
                        </button>
                      </div>
                    </td>
                  </tr>
                  <!-- row 6 -->
                  <tr>
                    <td><label></label></td>
                    <td>
                      <button @click="handleClick" class="btn-primary-custom">
                        Save
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <!-- Left side -->

          <!-- Right side -->
          <div
            class="border-[rgb(229, 231, 235)] flex w-[30%] flex-auto justify-center border-l"
          >
            <div class="flex flex-col items-center">
              <div class="my-[1.25rem]">
                <img
                  class="rounded-full"
                  src="https://placehold.co/100x100"
                  alt=""
                />
              </div>
              <button
                @click="handleClick"
                class="h-[40px] rounded border border-navy-500 px-5 font-[500] text-navy-500 transition-all hover:bg-navy-500 hover:text-white"
              >
                Select Image
              </button>
              <div class="mt-[1rem] text-sm text-[#999]">
                <div>File size: maximum 1 MB</div>
                <div>File extension: .JPEG, .PNG</div>
              </div>
            </div>
          </div>
          <!-- Right side -->
        </div>
        <!-- Content -->
      </div>
    </section>
  </UserDashboardLayout>
</template>
