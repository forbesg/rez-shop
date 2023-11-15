<template>
  <picture
    ref="picture"
    :style="{
      backgroundImage: `url(${image?.blurUpThumb})`,
      backgroundSize: 'cover',
    }"
    class="dato-image"
  >
    <source :srcset="image.responsiveImage.srcSet" />
    <img
      :src="image.responsiveImage.src"
      :alt="image.responsiveImage.alt"
      :width="width"
      :height="height"
    />
  </picture>
</template>

<script setup lang="ts">
  const picture = ref(null);
  defineProps({
    image: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  });
  onMounted(() => {
    // console.log("mounted");
    // console.log(picture);
    const pictureElement = picture.value;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("intersectiong");
          entry.target.classList.add("loaded");
          entry.target.querySelector("img").classList.add("loaded");
        }
      });
    });

    observer.observe(pictureElement);
  });
</script>

<style lang="scss" scoped>
  .dato-image {
    img {
      opacity: 0;
      transition: opacity 0.25s ease-in;
      &.loaded {
        opacity: 1;
      }
    }
  }
</style>
