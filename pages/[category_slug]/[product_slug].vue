<template>
  <div class="bg-yellow-100 py-6">
    <div v-if="product" class="container">
      <div class="grid gap-6 lg:grid-cols-2 bg-white">
        <div class="aspect-square">
          <nuxt-img
            v-if="product.image"
            :src="product.image.url"
            :alt="product.name"
            sizes="sm:100vw md:50vw lg:600px"
            densities="x1 x2"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="p-6">
          <h1 class="text-6xl font-header mb-4">{{ product.name }}</h1>
          <div class="meta text-xs font-button text-gray-500">
            <p>
              <span>SKU:</span><span>{{ product.sku }}</span>
            </p>
            <p class="mt-1">
              {{
                product.is.active && !product.is.sold_out
                  ? "In Stock"
                  : "Out of Stock"
              }}
            </p>
            <div class="flex gap-1 mt-2">
              <nuxt-link
                v-for="cat in product.categories"
                :key="cat.id"
                :to="`/${cat.slug}`"
                class="bg-orange-600 text-white p-1 px-2 text-xs rounded"
                >{{ cat.name }}</nuxt-link
              >
            </div>
          </div>
          <div
            v-if="product?.description"
            v-html="product.description"
            class="my-6"
          ></div>

          <p class="text-right">
            <span>Price: </span
            ><span class="font-semibold text-xl">{{
              product.price.formatted_with_symbol
            }}</span>
          </p>
          <button
            class="block w-full mt-4"
            :class="[{ loading: addingToCart }]"
            @click="handleAddToCart"
          >
            <span class="text-lg inline-block leading-none mr-1">&plus;</span
            >Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCart } from "@/stores/cart";
  import { useNotification } from "@/stores/notification";

  const cartStore = useCart();
  const { setNotification } = useNotification();
  const addingToCart = ref(false);
  const route = useRoute();
  const {
    params: { category_slug, product_slug },
  } = route;
  const { $commerce } = useNuxtApp();
  const { data: product, error } = await useAsyncData(
    `${category_slug}-${product_slug}`,
    () =>
      $commerce.products.retrieve(`${product_slug}`, {
        type: "permalink",
      })
  );

  if (!product.value) {
    createError({ statusCode: 404, statusMessage: "Page Not Found" });
  }

  async function handleAddToCart() {
    console.log("Add to cart");
    if (!product || !product.value) return;
    try {
      addingToCart.value = true;
      const { $commerce } = useNuxtApp();
      // const { id } = await $commerce.cart.retrieve();
      const cartUpdate = await $commerce.cart.add(product.value.id);

      cartStore.setCart(cartUpdate);
      setNotification({
        title: "Added to Cart",
        message: "This item has been successfully added to your cart",
      });
    } catch (err) {
      console.log(err);
    } finally {
      addingToCart.value = false;
    }
  }
</script>

<style lang="scss" scoped></style>
