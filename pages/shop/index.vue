<template>
  <div>
    <Title>The Shop</Title>
    <div v-if="pending">
      <div
        class="h-96 py-24 flex flex-col justify-center items-center text-primary"
      >
        <LoadingAnimation />
        <span>Loading...</span>
      </div>
    </div>
    <div v-else>
      <div v-if="categories && Array.isArray(categories)">
        <div class="container">
          <h1 class="py-4">Shop</h1>
        </div>
        <div
          v-for="category in categories"
          :key="category.id"
          class="bg-yellow-100 py-6"
        >
          <div class="container">
            <h2 class="text-6xl font-header mb-4">{{ category.name }}</h2>
            <p>{{ category.description }}</p>
            <div v-if="category.categoryProducts" class="mt-6">
              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ProductCard
                  v-for="product in category.categoryProducts"
                  :key="product.id"
                  :product="product"
                  :category_slug="category.slug"
                />
              </div>
            </div>
            <NuxtLink
              :to="`/${category.slug}`"
              class="arrow inline-block p-4 mt-4 text-orange-600 font-semibold"
              >View {{ category.name }}</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="products">
        <div class="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div> -->
  </div>
</template>

<script setup lang="ts">
  import { Category } from "@chec/commerce.js/types/category";
  import { Product } from "@chec/commerce.js/types/product";

  interface RezCategory extends Category {
    categoryProducts: Product[];
  }

  const { $commerce } = useNuxtApp();
  // const { data: products } = await $commerce.products.list();
  const {
    data: categories,
    pending,
    error,
  } = await useLazyAsyncData("shop", async () => {
    const categoryCollection = await $commerce.categories.list();
    const categories = await Promise.all(
      categoryCollection.data.map(async (cat: Category) => {
        const { data: categoryProducts } = await $commerce.products.list({
          category_id: cat.id,
          limit: 3,
        });
        const newCategory: RezCategory = { ...cat, categoryProducts };
        return newCategory;
      })
    );
    return categories;
  });

  // if (!categories.value) {
  //   createError({ statusCode: 404 });
  // }
  watch(categories, (newData) => {
    categories.value = newData;
  });
</script>

<style scoped></style>
