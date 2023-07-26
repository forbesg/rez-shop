<template>
  <div class="dato-module intro">
    <div class="container" :class="[{ 'text-center': module?.align?.center }]">
      <h2 v-if="module?.title" class="intro--title">{{ module.title }}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi itaque
        fugiat velit non atque omnis, facere quia architecto perspiciatis
        laboriosam, natus placeat eum ipsa corporis nemo illo. Et, excepturi
        impedit.
      </p>
      <NuxtLink to="/shop" class="button mt-6 inline-block"
        >Visit Shop</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    module: {
      type: Object,
      required: false,
    },
  });
</script>

<style lang="scss" scoped>
  .intro {
    @apply bg-yellow-100 py-24;
    &--title {
      @apply text-8xl font-header text-primary mb-6;
      font-size: clamp(3.5rem, 10vw, 6rem);
    }
  }
</style>
