<template>
  <div class="hero">
    <div class="hero--image">
      <img
        :src="section.image.responsiveImage.src"
        :srcSet="section.image.responsiveImage.srcSet"
        :alt="section.image.responsiveImage.alt"
      />
    </div>

    <div class="absolute bottom-0 right-0 z-10 p-12">
      <div class="container text-right">
        <h1 class="text-orange text-7xl font-header">{{ section.title }}</h1>
        <h2
          v-if="section.subtitle"
          class="inline-block leading-loose border-t-2 border-orange-600 mt-2"
        >
          {{ section.subtitle }}
        </h2>
      </div>
    </div>
    <!-- <pre>{{ section }}</pre> -->
  </div>
</template>

<script setup>
  defineProps({
    section: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .hero {
    @apply relative overflow-hidden;
    height: calc(100vh - 12rem);

    &--image {
      @apply absolute z-0 w-full h-full object-cover object-center;
      img {
        @apply w-full h-full object-cover object-center;
      }
    }
  }
</style>
