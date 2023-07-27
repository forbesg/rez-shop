<template>
  <div class="dato-module fixed-background" :style="backgroundStyles">
    <div class="inner-wrapper">
      <div class="container">
        <div class="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 class="fixed-background--title">Title</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
              exercitationem fugiat facilis perferendis autem? Corrupti delectus
              officiis expedita consectetur est iste hic id, repellendus nemo
              rerum. Numquam aspernatur ut ab.
            </p>
          </div>
          <div>
            <div class="aspect-4/3 rounded overflow-hidden">
              <nuxt-img
                src="/chicken.jpg"
                quality="80"
                sizes="sm:100vw md:50vw lg:600px"
                width="600"
                height="400"
                alt="Chicken"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const image = useImage();
  const backgroundStyles = computed(() => {
    const backgroundImageUrl = image("/images/wood-grain-background.jpg", {
      width: 600,
    });
    return {
      backgroundImage: `url('${backgroundImageUrl}')`,
    };
  });
</script>

<style lang="scss" scoped>
  .fixed-background {
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    .inner-wrapper {
      @apply bg-primary-800 bg-opacity-75 py-24 text-white;
    }
    &--title {
      @apply text-6xl text-yellow font-header mb-6;
    }
  }
</style>
