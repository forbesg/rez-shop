<template>
  <div class="product-card">
    <div
      v-if="product?.image"
      class="bg-white image-wrapper aspect-[5/4] w-full overflow-hidden"
    >
      <nuxt-img
        :src="product.image?.url"
        :alt="product?.image?.alt"
        sizes="sm:100vw md:50vw lg:600px"
        densities="x1 x2"
        class="h-full w-full object-cover"
      />
    </div>
    <!-- <pre>{{ product }}</pre> -->
    <div class="product-card-content">
      <h2 class="product-card-content--title">{{ product.name }}</h2>
      <div v-html="product.description"></div>
      <NuxtLink
        :to="
          category_slug
            ? `/${category_slug}/${product.permalink}`
            : `${$route.path}/${product.permalink}`
        "
        class="button mt-4 block"
        >View</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    product: {
      type: Object,
      required: true,
    },
    category_slug: {
      type: String,
      required: false,
    },
  });
</script>

<style lang="scss" scoped>
  .product-card {
    @apply bg-white;
    &-content {
      @apply p-6 text-base;
      &--title {
        @apply font-header text-4xl mb-2;
      }
    }
  }
</style>
