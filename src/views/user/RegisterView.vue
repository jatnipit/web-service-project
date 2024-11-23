<script setup>
import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue';

import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();
const router = useRouter();

const formData = reactive({
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  isAdmin: false,
});

const register = async () => {
  try {
    console.log(formData);
    await accountStore.register(formData);
    router.push({ name: 'home' });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <UserLayout>
    <div class="mt-20">
      <main class="mt-20 py-20">
        <div class="mx-auto max-w-lg px-4">
          <h1
            class="mb-[1.5rem] pb-[0.625rem] text-center text-[2rem] font-[700] text-[#0B264C]"
          >
            Create Account
          </h1>
          <div class="mb-[2.5rem] text-center">
            <p class="text-sm">
              Already Have an account?
              <RouterLink
                :to="{ name: 'login' }"
                class="font-[500] text-navy-500 underline"
                >Log In Here</RouterLink
              >
            </p>
          </div>
          <form @submit.prevent="register()">
            <label for="username">
              <input
                v-model="formData.userName"
                name="username"
                type="text"
                placeholder="Username"
                class="input input-bordered mb-[0.625rem] w-full"
                required
              />
            </label>
            <label for="firstName">
              <input
                v-model="formData.firstName"
                name="firstnaem"
                type="text"
                placeholder="First Name"
                class="input input-bordered mb-[0.625rem] w-full"
                required
              />
            </label>
            <label for="lastName">
              <input
                v-model="formData.lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                class="input input-bordered mb-[0.625rem] w-full"
                required
              />
            </label>
            <label for="email">
              <input
                v-model="formData.email"
                name="email"
                type="email"
                placeholder="Email"
                class="input input-bordered mb-[0.625rem] w-full"
                required
              />
            </label>
            <label for="password">
              <input
                v-model="formData.password"
                name="password"
                type="password"
                placeholder="Password"
                class="input input-bordered mb-[0.625rem] w-full"
                required
              />
            </label>
            <label for="phone">
              <input
                v-model="formData.phone"
                name="phone"
                type="text"
                placeholder="Phone"
                class="input input-bordered mb-[0.625rem] w-full"
                required
              />
            </label>
            <button class="btn-primary-custom mt-[2.25rem] w-full">
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  </UserLayout>
</template>
