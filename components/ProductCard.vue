<template>
  <div class="product-card">
    <div v-if="product?.image" class="bg-white image-wrapper overflow-hidden">
      <nuxt-picture
        :src="product.image?.url"
        :alt="product?.name"
        sizes="sm:100vw md:50vw lg:600px"
        width="500"
        height="400"
        densities="x1 x2"
        class="aspect-[5/4]"
      />
    </div>
    <!-- <pre>{{ product }}</pre> -->
    <div class="product-card-content">
      <h2 class="product-card-content--title">{{ product.name }}</h2>
      <div v-html="product.description" class="text-base"></div>
    </div>
    <div class="product-card-footer">
      <NuxtLink
        :to="
          category_slug
            ? `/${category_slug}/${product.permalink}`
            : `${$route.path}/${product.permalink}`
        "
        class="button mt-2 block"
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

<style lang="scss">
  .product-card {
    @apply flex flex-col bg-white;
    &-content {
      @apply flex-1 p-6 text-base;
      &--title {
        @apply font-header text-5xl mb-2;
      }
      p {
        @apply my-2;
      }
    }
    &-footer {
      @apply p-4 pt-0;
    }
  }
</style>
