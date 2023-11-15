<template>
  <div>
    <div v-if="pending"></div>
    <div v-if="category">
      <Title>{{ category.title }} | The Shop</Title>
      <div v-if="category?.image" class="banner relative h-96 overflow-hidden">
        <picture class="absolute inset-0 z-0 h-full w-full object-cover">
          <source :srcset="category.image.responsiveImage.srcSet" />
          <img
            :src="category.image?.responsiveImage.src"
            :alt="category.image?.responsiveImage.alt"
            width="600"
            height="300"
            class="aspect-[4/3]"
          />
        </picture>
        <div
          class="h-full bg-black bg-opacity-25 flex flex-col justify-center relative z-10"
        >
          <div class="container text-white">
            <h1 class="banner--title text-6xl md:text-8xl font-header mb-6">
              {{ category.title }}
            </h1>
            <h2 v-if="category.subtitle">{{ category.subtitle }}</h2>
            <div v-html="category.description"></div>
          </div>
        </div>
      </div>
      <div class="py-6">
        <div class="container">
          <div class="breadcrumbs text-base mb-4">
            <NuxtLink to="/shop">Shop</NuxtLink> <span>&gt; </span>
            <span>{{ category.title }}</span>
          </div>
          <h1 class="text-5xl font-header mb-2">{{ category.title }}</h1>
          <div v-html="category.description"></div>
        </div>
      </div>
      <div v-if="category.products" class="products py-6">
        <div class="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="product in category.products"
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
  const CATEGORY_QUERY = `
    query ($slug: String) {
      category(filter: { slug: { eq: $slug }}) {
        id
        title
        subtitle
        description
        slug
        _seoMetaTags {
          attributes
          content
          tag
        }
        image {
          responsiveImage(imgixParams: { w: 1200, h:600, fit: crop, crop: focalpoint, auto: format}) {
            srcSet
            src
            alt
          }
        }
        products: _allReferencingProducts {
          title
          id
          slug
          description
          price
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
  const { data, pending } = await useGraphqlQuery({
    query: CATEGORY_QUERY,
    variables: { slug: category_slug },
  });
  console.log(data, category_slug);

  const category = data?.value?.category;
</script>

<style lang="scss" scoped>
  .banner {
    &--title {
      font-size: clamp(3.5rem, 10vw, 6rem);
      position: relative;
      display: inline-block;
      &:after {
        content: "";
        @apply w-full h-1 bg-orange-600 absolute left-0 bottom-0 right-0 transform translate-y-1 rounded-lg;
      }
    }
  }
</style>
