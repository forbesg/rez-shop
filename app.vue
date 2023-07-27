<template>
  <div class="bg-primary-900 font-sans min-h-screen text-gray-800">
    <NuxtLoadingIndicator color="#ea580c" :height="2" />
    <RezHeader />
    <RezMainNav :cart="cartStore.$state.cart" />
    <div class="min-h-screen bg-yellow-100">
      <NuxtPage />
    </div>
    <!-- <div v-if="cartStore.$state.cart">
      {{ cart }}
    </div> -->
    <RezFooter />
    <transition name="slide-up">
      <Notification
        v-if="notificationStore.$state.notification"
        :notification="notificationStore.$state.notification"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import { useCart } from "@/stores/cart";
  import { useNotification } from "@/stores/notification";
  const cartStore = useCart();
  const notificationStore = useNotification();
  const { $commerce } = useNuxtApp();

  const cart = cartStore.cart;

  onMounted(async () => {
    try {
      const response = await $commerce.cart.retrieve();
      cartStore.setCart(response);
    } catch (err) {
      console.log(err);
    }
  });
</script>
