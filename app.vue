<template>
  <div class="font-sans min-h-screen text-gray-800">
    <NuxtLoadingIndicator color="#ea580c" :height="2" />
    <RezHeader :cart="cartStore.$state.cart" />
    <div class="sentinal"></div>
    <div class="min-h-screen">
      <NuxtPage />
    </div>
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
  // const { $commerce } = useNuxtApp();

  const cart = cartStore.cart;

  onMounted(async () => {
    cartStore.setCart();
  });
</script>
