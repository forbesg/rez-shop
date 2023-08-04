<template>
  <div>
    <Title>Your Cart</Title>
    <div class="bg-yellow-100 py-6">
      <div class="container">
        <h1 class="text-6xl font-header mb-8">Your Cart</h1>
        <div
          v-if="cartStore.getCart && cartStore.getCart.line_items.length"
          class="flex flex-col gap-6"
        >
          <CartProductCard
            v-for="item in cartStore.getCart.line_items"
            :key="item.id"
            :item="item"
          />
          <div class="text-right">
            <p class="text-xl font-semibold">
              Cart Total:
              <!-- {{ cartStore.$state.cart.subtotal.formatted_with_symbol }} -->
              {{ cartStore.getCart?.subtotal.formatted_with_symbol }}
            </p>
            <p class="text-base">Shipping: Calculated at checkout</p>
          </div>
          <div class="flex gap-6 justify-between sm:justify-end items-center">
            <nuxt-link to="/shop" class="arrow text-base text-orange-600"
              >Continue Shopping</nuxt-link
            >
            <nuxt-link to="/shop/checkout" class="button">Checkout</nuxt-link>
            <nuxt-link
              :to="cartStore.getCart.hosted_checkout_url"
              class="button"
              >Hosted Checkout</nuxt-link
            >
          </div>
        </div>
        <div v-else class="text-center py-12">
          <p class="mb-4">Your Cart Is Empty</p>
          <nuxt-link to="/shop" class="button">Continue Shopping</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCart } from "@/stores/cart";

  const cartStore = useCart();

  watch(cartStore, (store) => {
    if (!store?.$state?.cart?.total_unique_items) {
      scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  });
</script>

<style lang="scss" scoped></style>
