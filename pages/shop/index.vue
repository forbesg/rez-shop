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
        <div v-for="category in categories" :key="category.id" class="py-6">
          <div class="container">
            <h2 class="text-6xl font-header mb-4">{{ category.title }}</h2>
            <div v-html="category.description"></div>
            <div v-if="category.products" class="mt-6">
              <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ProductCard
                  v-for="product in category.products"
                  :key="product.id"
                  :product="product"
                  :category_slug="category.slug"
                />
              </div>
            </div>
            <NuxtLink
              :to="`/${category.slug}`"
              class="arrow inline-block p-4 mt-4 text-orange-600 font-semibold"
              >View {{ category.title }}</NuxtLink
            >
          </div>
        </div>
      </div>
      <div v-else>
        <span>No Categories Found</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const SHOP_QUERY = `
  
    query {
      categories: allCategories {
        id
        title
        description
        slug
        _seoMetaTags {
          attributes
          content
          tag
        }
        products: _allReferencingProducts(first: 5) {
          title
          id
          slug
          description
          images {
            blurUpThumb
            responsiveImage(imgixParams: { w: 400, h:300, fit: crop, crop: focalpoint, auto: format}) {
              srcSet
              src
              alt
            }
          }
          category {
            title
            slug
          }
        }
      }
    }
  
  `;
  const { data, pending } = await useGraphqlQuery({ query: SHOP_QUERY });
  console.log(data);

  const categories = data?.value?.categories;
</script>

<style scoped></style>
