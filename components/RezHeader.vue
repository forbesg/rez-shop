<template>
  <div class="text-center">
    <div class="rez-header container py-6">
      <div
        class="logo select-none text-yellow font-header cursor-pointer inline-block"
        @click="$router.push('/')"
      >
        <span class="text-6xl block text-orange-600">The Header</span>
        <span class="text-yellow text-2xl block">The · Strap · Line</span>
      </div>
      <nav
        class="text-orange-600 font-header text-3xl flex gap-6 max-w-max mx-auto mt-4"
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
  .rez-header {
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
