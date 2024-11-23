<script setup>
import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import UserLayout from '@/layouts/UserLayout.vue';

import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();
const router = useRouter();
const toast = useToast();

const formData = reactive({
  email: '',
  password: '',
});

const login = async () => {
  try {
    // console.log(formData);
    await accountStore.login(formData);
    toast.success('Login successful.', {
      position: 'bottom-right',
    });
    router.push({ name: 'home' });
  } catch (error) {
    toast.error('Invalid email or password.', {
      position: 'bottom-right',
    });
    console.log('Error:', error);
  }
};
</script>

<template>
  <UserLayout>
    <main class="mt-20 py-20">
      <div class="mx-auto max-w-lg px-4">
        <h1
          class="mb-[2.5rem] text-center text-[2rem] font-[700] text-[#0B264C]"
        >
          Login
        </h1>
        <form @submit.prevent="login()">
          <label for="email">
            <input
              v-model="formData.email"
              name="text"
              type="text"
              placeholder="Email or username"
              class="input input-bordered mb-[1.25rem] w-full"
              required
            />
          </label>
          <label for="password">
            <input
              v-model="formData.password"
              name="password"
              type="password"
              placeholder="Password"
              class="input input-bordered mb-[1.25rem] w-full"
              required
            />
          </label>
          <button class="btn-primary-custom mt-[2.25rem] w-full">Login</button>
          <div class="mt-[1.5rem] text-center">
            <p class="mb-[0.625rem] text-sm">
              Don't have an account?
              <RouterLink
                :to="{ name: 'register' }"
                class="font-[500] text-navy-500 underline"
                >Sign Up Here</RouterLink
              >
            </p>
          </div>
        </form>
      </div>
    </main>
  </UserLayout>
</template>
