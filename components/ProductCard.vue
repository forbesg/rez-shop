<template>
  <div class="product-card">
    <div
      v-if="product?.images[0]"
      class="bg-white image-wrapper overflow-hidden"
    >
      <picture>
        <source :srcset="product.images[0]?.responsiveImage.srcSet" />
        <img
          :src="product.images[0]?.responsiveImage.src"
          :alt="product.images[0]?.responsiveImage.alt"
          width="400"
          height="300"
          class="aspect-[4/3]"
        />
      </picture>
    </div>
    <div class="product-card-content">
      <h2 class="product-card-content--title">{{ product.title }}</h2>
      <div
        v-if="product.description"
        v-html="product.description"
        class="text-base"
      ></div>
    </div>
    <div class="product-card-footer">
      <div v-if="product.price" class="text-right text-base font-semibold">
        <p>Price: {{ currency(product.price) }}</p>
      </div>
      <NuxtLink
        :to="
          category_slug
            ? `/${category_slug}/${product.slug}`
            : `${$route.path}/${product.slug}`
        "
        class="button mt-2 block"
        >View</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  const currency = useCurrency();
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
        @apply font-header text-5xl mb-4;
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
