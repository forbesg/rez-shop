<template>
  <div class="cart-product-card grid grid-cols-1 md:grid-cols-4">
    <div class="col-span-1">
      <div class="image-wrapper h-full w-full overflow-hidden">
        <picture
          v-if="item.images && item.images[0]"
          class="h-full w-full object-cover object-center"
        >
          <source :srcset="item.images[0].responsiveImage.srcSet" />
          <img
            :src="item.images[0].responsiveImage.src"
            :alt="item.images[0].responsiveImage.alt"
          />
        </picture>
      </div>
    </div>
    <div
      class="col-span-3 p-8 text-base flex flex-wrap gap-4 items-center md:grid-cols-3"
    >
      <div class="flex-none w-full">
        <p class="text-xl font-semibold leading-none mb-2">
          {{ item.title }}
        </p>
        <div class="flex gap-4 justify-between">
          <span class="text-xs text-gray-600">SKU: {{ item.sku }}</span>
          <button
            class="white p-0 px-1 text-xs hover:bg-orange-600 hover:text-white"
            :class="[{ loading: deleting }]"
            @click="removeItem"
          >
            Remove
          </button>
        </div>
      </div>
      <p class="flex flex-1 justify-start items-center gap-4">
        <span>Quantity: </span
        ><span class="inline-block"
          ><button
            class="quantity"
            :class="[{ loading: removing }]"
            @click="decrementQuantity"
          >
            &minus;</button
          ><span class="inline-block w-8 text-center">{{ item.quantity }}</span>
          <button
            class="quantity"
            :class="[{ loading: adding }]"
            @click="incrementQuantity"
          >
            &plus;
          </button></span
        >
      </p>
      <p class="text-right">
        <span>{{ currency(item.price) }}</span>
      </p>
      <div class="text-right flex-none w-full mt-4">
        <p class="text-xl font-semibold">
          <span>Total Price: </span
          ><span>{{ currency(item.price * item.quantity) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCart } from "@/stores/cart";
  import { CartItem } from "types";

  const cartStore = useCart();
  const adding = ref(false);
  const removing = ref(false);
  const deleting = ref(false);
  const quantity = ref();
  const currency = useCurrency();
  const props = defineProps<{ item: CartItem }>();
  const { item } = toRefs(props);

  async function incrementQuantity() {
    adding.value = true;
    try {
      cartStore.incrementQuantity(item.value);
    } catch (err) {
      console.log(err);
    } finally {
      adding.value = false;
    }
  }
  async function decrementQuantity() {
    removing.value = true;
    try {
      cartStore.decrementQuantity(item.value);
    } catch (err) {
      console.log(err);
    } finally {
      removing.value = false;
    }
  }
  async function removeItem() {
    deleting.value = true;
    try {
      // const updatedCart = await $commerce.cart.remove(item.value.id);
      // cartStore.setCart(updatedCart);
      cartStore.removeFromCart(item.value.id);
    } catch (err) {
      console.log(err);
    } finally {
      deleting.value = false;
    }
  }
</script>

<style lang="scss" scoped>
  .cart-product-card {
    @apply bg-orange-50 bg-opacity-25 shadow-sm;
  }
  button.quantity {
    @apply p-1 px-3;
  }
</style>
