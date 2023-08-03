<template>
  <div class="bg-primary text-white py-24">
    <div class="container grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div class="">
        <h2 class="text-5xl font-header mb-2">Sign Up For News & Offers</h2>
        <p>
          Subscribe to my email newsletter to receive news, product updates and
          offers.
        </p>
      </div>
      <form
        action=""
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-1"
      >
        <div class="inline-flex flex-col">
          <label for="first_name" class="flex-none text-sm font-semibold"
            >First Name:</label
          >
          <input
            id="first_name"
            name="first_name"
            type="text"
            class="flex-1 max-h-max p-2"
          />
        </div>
        <div class="inline-flex flex-col">
          <label for="last_name" class="flex-none text-sm font-semibold"
            >Last Name:</label
          >
          <input
            id="last_name"
            name="last_name"
            type="text"
            class="flex-1 max-h-max p-2"
          />
        </div>
        <div class="inline-flex flex-col sm:col-span-2">
          <label for="email" class="flex-none text-sm font-semibold"
            >Email:</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="flex-1 max-h-max p-2"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
