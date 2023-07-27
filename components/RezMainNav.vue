<template>
  <div class="rez-main-nav">
    <div class="container">
      <nav
        class="text-orange-600 font-header text-3xl flex gap-6 max-w-max mx-auto"
      >
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about-me">About Me</NuxtLink>
        <NuxtLink to="/shop">Shop</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
        <NuxtLink to="/shop/cart" class="relative"
          >Cart<span
            v-if="cart && cart.line_items.length"
            class="absolute -top-2 -right-4 font-sans text-sm bg-white border border-orange-600 text-orange-600 font-semibold leading-none inline-flex justify-center items-center w-6 h-6 rounded-full"
            >{{ cart.total_items }}</span
          ></NuxtLink
        >
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

<style lang="scss" scoped>
  .rez-main-nav {
    @apply sticky bg-primary top-0 z-20 py-4 text-center;
    nav {
      a {
        @apply text-8xl;
        font-size: clamp(1.2rem, 6vw, 2.25rem);
        > span {
          font-size: 0.5em;
          height: clamp(1.2rem, 6vw, 1.5rem);
          width: clamp(1.2rem, 6vw, 1.5rem);
        }
      }
    }
  }
</style>
