<template>
  <div class="bg-primary-950 text-white">
    <div class="container py-12">
      <h2 class="mb-4">The Footer</h2>
      <div class="grid grid-cols-2 lg:grid-cols-3">
        <div>
          <h3>Column 1</h3>
        </div>
        <div>
          <h3>Column 1</h3>
        </div>
        <div>
          <h3>Column 1</h3>
        </div>
      </div>
    </div>
    <div class="copy text-center text-white text-xs p-1">
      &copy;Rez {{ new Date().getFullYear() }}
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
