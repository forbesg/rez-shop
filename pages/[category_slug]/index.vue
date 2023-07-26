<template>
  <div>
    <div v-if="category">
      <div v-if="images" class="banner relative h-96 overflow-hidden">
        <nuxt-img
          :src="images[0].url"
          :alt="category.name"
          sizes="sm:100vw lg:1200px"
          preload
          class="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div
          class="h-full bg-black bg-opacity-25 flex flex-col justify-center relative z-10"
        >
          <div class="container text-white">
            <h1 class="text-8xl font-header mb-2">{{ category.name }}</h1>
            <p>{{ category.description }}</p>
          </div>
        </div>
      </div>
      <div class="bg-yellow-100 py-12">
        <div class="container">
          <div class="breadcrumbs text-base mb-4">
            <NuxtLink to="/shop">Shop</NuxtLink> <span>&gt; </span>
            <span>{{ category.name }}</span>
          </div>
          <h1 class="text-5xl font-header mb-2">{{ category.name }}</h1>
          <p>{{ category.description }}</p>
        </div>
      </div>
      <div v-if="products" class="products py-12">
        <div class="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const {
    params: { category_slug },
  } = useRoute();

  const { $commerce } = useNuxtApp();
  const [{ data: category }, { data: categoryProducts }] = await Promise.all([
    useAsyncData(`${category_slug}`, () =>
      $commerce.categories.retrieve(`${category_slug}`, {
        type: "slug",
      })
    ),
    useAsyncData(`${category_slug}-products`, () =>
      $commerce.products.list({
        category_slug: [category_slug],
      })
    ),
  ]);

  const images =
    category.value && category.value.assets
      ? category.value.assets.filter((asset) => asset.is_image)
      : null;

  const { data: products } = categoryProducts.value;
</script>

<style lang="scss" scoped></style>
