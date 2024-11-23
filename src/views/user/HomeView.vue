<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import UserLayout from '@/layouts/UserLayout.vue';
import CardListings from '@/components/CardListings.vue';

import { useProductStore } from '@/stores/user/product';
import { useUserCartStore } from '@/stores/user/cart';
import { useAccountStore } from '@/stores/account';

const router = useRouter();
const toast = useToast();
const productStore = useProductStore();
const userCartStore = useUserCartStore();
const accountStore = useAccountStore();

const slideshowImages = [
  'https://www.ptcgostore.com/assets/images/PTCGL_StellarCrownBanner.jpg',
  'https://www.ptcgostore.com/assets/images/PTCGL_ShroudedFableBannerFINAL.jpg',
  'https://www.ptcgostore.com/assets/images/Ptcgl-twilight-masquerade-web.jpg',
  'https://www.ptcgostore.com/assets/images/temporal-ptcgl-store.jpg',
  'https://www.ptcgostore.com/assets/images/web-banner-paldean-fates-ptcgl.jpg',
  'https://www.ptcgostore.com/assets/images/Banner_Web_Paradox_Rift012.jpg',
];

let currentSlide = 0;

const handleSlides = (n) => {
  showSlides((currentSlide += n));
};

const showSlides = (n) => {
  const slides = document.querySelectorAll('.slides');

  if (n > slides.length - 1) {
    currentSlide = 0;
  }
  if (n < 0) {
    currentSlide = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.style.display = 'none';
  });

  slides[currentSlide].style.display = 'block';
};

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

onMounted(() => {
  showSlides(currentSlide);
  // setInterval(handleSlides(1), 5000);
});
</script>

<template>
  <UserLayout>
    <div class="bg-base-100">
      <section class="mt-[67px]">
        <div class="relative">
          <div
            v-for="image in slideshowImages"
            class="slides slide-fade"
            style="display: none"
          >
            <img loading="eager" :src="image" alt="" class="w-full" />
          </div>
          <!-- Next and previous buttons -->
          <button @click="handleSlides(-1)" class="absolute left-3 top-1/2">
            <i
              class="pi pi-angle-left"
              style="font-size: 2rem; color: white"
            ></i>
          </button>
          <button @click="handleSlides(1)" class="absolute right-3 top-1/2">
            <i
              class="pi pi-angle-right"
              style="font-size: 2rem; color: white"
            ></i>
          </button>
        </div>
      </section>
      <!-- <div class="space-x-2 text-center">
        <i
          v-for="i in slideshowImages.length"
          class="pi pi-circle-fill"
          style="color: #bababa"
        ></i>
      </div> -->
      <main>
        <div class="container mx-auto pb-10 pt-20">
          <CardListings
            :products="productStore.products"
            :addItemToCart="addItemToCart"
          />
        </div>
      </main>
    </div>
  </UserLayout>
</template>

<style scoped>
.slide-fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {
    opacity: 0.6;
  }

  to {
    opacity: 1;
  }
}
</style>
