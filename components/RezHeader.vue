<template>
  <div class="rez-header text-center">
    <div class="container pt-6">
      <div
        class="logo select-none text-yellow font-header cursor-pointer inline-block"
        @click="$router.push('/')"
      >
        <span class="text-6xl block text-orange-600">The Header</span>
        <span class="text-yellow text-2xl block">The · Strap · Line</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // defineProps({
  //   cart: {
  //     type: Object,
  //     required: false,
  //   },
  // });
</script>
