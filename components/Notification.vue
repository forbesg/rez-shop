<template>
  <div class="notification">
    <p class="notification-title">{{ notification.title }}</p>
    <p class="notification-message">{{ notification.message }}</p>
    <button
      class="p-0 w-6 h-6 rounded-full leading-none absolute top-2 right-2"
      @click="setNotification(null)"
    >
      &times;
    </button>
    <div class="mt-4 flex gap-4 justify-end items-center">
      <a
        href="#close"
        class="text-base p-3 leading-none"
        @click.prevent="setNotification(null)"
        ><span class="inline-block">&times;</span> Close</a
      >
      <nuxt-link to="/shop/cart" class="button" @click="setNotification(null)"
        >View Cart</nuxt-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNotification } from "@/stores/notification";

  const { setNotification } = useNotification();
  defineProps({
    notification: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .notification {
    @apply fixed bottom-4 right-4 left-4 md:left-auto border-l-4 border-orange-600 md:w-1/2 lg:w-1/3 h-auto bg-white p-4 sm:p-8 shadow;
    &-title {
      @apply text-2xl sm:text-3xl;
    }
    &-message {
      @apply text-base leading-tight;
    }
  }
</style>
