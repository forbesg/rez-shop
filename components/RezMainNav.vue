<template>
  <div class="rez-main-nav">
    <div>
      <nav class="text-orange-600 font-header text-4xl flex gap-6 max-w-max">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about-me">About Me</NuxtLink>
        <NuxtLink to="/shop">Shop</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    cart: {
      type: Object,
      required: false,
    },
  });
</script>
