<template>
  <div class="rez-header text-center">
    <div class="py-4 flex justify-between items-center">
      <RezMainNav class="flex-1 hidden md:block" />
      <div
        class="logo select-none text-yellow font-header cursor-pointer inline-block flex-none w-28"
        @click="$router.push('/')"
      >
        <Logo />
        <span class="text-yellow text-2xl block">The · Strap · Line</span>
      </div>
      <nav class="flex-1 text-right">
        <NuxtLink to="/shop/cart" class="relative text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            title="cart"
            fill="currentColor"
            class="aspect-square w-8 h-8 inline-block"
          >
            <path
              d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"
            />
          </svg>
          <span
            v-if="cart && cart.line_items.length"
            class="absolute -top-1 -right-3 font-sans text-sm bg-orange-600 border border-white text-white font-semibold leading-none inline-flex justify-center items-center w-6 h-6 rounded-full"
          >
            {{ cart.total_items }}</span
          ></NuxtLink
        >
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    cart: {
      type: Object,
      required: false,
    },
  });
  onMounted(() => {
    console.log("mounted");
    const sentinal = document.querySelector(".sentinal");
    const header = document.querySelector(".rez-header ");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          header?.classList.add("sticky");
        } else {
          header?.classList.remove("sticky");
        }
      });
    });
    if (sentinal) observer.observe(sentinal);
  });
</script>

<style lang="scss">
  .rez-header {
    @apply static top-0 right-0 left-0 z-20 bg-primary;
    &.sticky {
      @apply bg-opacity-100 transition transition-all duration-700;
      position: sticky;
      animation: fadeInDown 200ms ease-in;
    }
    > div {
      max-width: 1560px;
      padding-inline: 1.25rem;
      margin-inline: auto;
    }
    nav {
      a {
        @apply text-3xl;
        // font-size: clamp(1.2rem, 6vw, 2.25rem);
        > span {
          font-size: 0.5em;
          height: clamp(1.2rem, 6vw, 1.5rem);
          width: clamp(1.2rem, 6vw, 1.5rem);
        }
        &.router-link-active {
          @apply text-yellow-200;
        }
      }
    }
  }
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-6rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
