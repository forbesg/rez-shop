<template>
  <div id="payment-successful">
    <div class="success-tick text-center py-24 text-orange-600">
      <div
        class="aspect-square w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-64 mx-auto px-6"
      >
        <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
          <g
            stroke="currentColor"
            stroke-width="1.25"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              class="circle"
              d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
            />
            <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
          </g>
        </svg>
      </div>

      <span class="text-3xl md:text-4xl block text-center"
        >Payment Successful</span
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  svg {
    path {
      &.circle {
        stroke-dasharray: 88;
        animation: animateCircle 0.75s ease-in-out forwards;
      }
      &.tick {
        stroke-dasharray: 28;
        opacity: 0;
        animation: animateTick 0.85s 0.5s ease-in-out forwards;
      }
    }
  }
  @keyframes animateCircle {
    from {
      stroke-dashoffset: 100px;
    }
    to {
      stroke-dashoffset: 176px;
    }
  }
  @keyframes animateTick {
    from {
      stroke-dashoffset: 90px;
      opacity: 1;
    }
    to {
      stroke-dashoffset: 62px;
      opacity: 1;
    }
  }
</style>
