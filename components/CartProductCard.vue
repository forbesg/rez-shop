<template>
  <div
    class="cart-product-card bg-white grid grid-cols-1 md:grid-cols-4 shadow"
  >
    <div class="col-span-1">
      <div class="image-wrapper h-full w-full overflow-hidden">
        <nuxt-picture
          :src="item.image.url"
          :alt="item.name"
          sizes="sm:100vw md:25vw"
          densities="x1 x2"
          class="aspect-[5/4]"
        />
      </div>
    </div>
    <div
      class="col-span-3 p-8 text-base flex flex-wrap gap-4 items-center md:grid-cols-3"
    >
      <div class="flex-none w-full">
        <p class="text-xl font-semibold leading-none">
          {{ item.name }}
        </p>
        <span class="text-xs text-gray-600">SKU: {{ item.sku }}</span>
        <button
          class="white"
          :class="[{ loading: deleting }]"
          @click="removeItem"
        >
          Remove
        </button>
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
        <span>{{ item.price.formatted_with_symbol }}</span>
      </p>
      <div class="text-right flex-none w-full mt-4">
        <p class="text-xl font-semibold">
          <span>Total Price: </span
          ><span>{{ item.line_total.formatted_with_symbol }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCart } from "@/stores/cart";

  const { $commerce } = useNuxtApp();
  const cartStore = useCart();
  const adding = ref(false);
  const removing = ref(false);
  const deleting = ref(false);
  const quantity = ref();
  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  });
  const { item } = toRefs(props);

  async function incrementQuantity() {
    adding.value = true;
    try {
      const updatedCart = await $commerce.cart.update(item.value.id, {
        quantity: item.value.quantity + 1,
      });
      cartStore.setCart(updatedCart);
    } catch (err) {
      console.log(err);
    } finally {
      adding.value = false;
    }
  }
  async function decrementQuantity() {
    removing.value = true;
    try {
      const updatedCart = await $commerce.cart.update(item.value.id, {
        quantity: item.value.quantity - 1,
      });
      cartStore.setCart(updatedCart);
    } catch (err) {
      console.log(err);
    } finally {
      removing.value = false;
    }
  }
  async function removeItem() {
    deleting.value = true;
    try {
      const updatedCart = await $commerce.cart.remove(item.value.id);
      cartStore.setCart(updatedCart);
    } catch (err) {
      console.log(err);
    } finally {
      deleting.value = false;
    }
  }
</script>

<style lang="scss" scoped>
  button.quantity {
    @apply p-1 px-3;
  }
</style>
