<template>
  <div>
    <div class="container py-12">
      <h1 class="font-header text-6xl mb-6">Checkout</h1>
      <pre>{{ cart }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useCart } from "@/stores/cart";

  const { cart } = useCart();
</script>

<style lang="scss" scoped></style>
