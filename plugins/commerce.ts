import Commerce from "@chec/commerce.js";

// Create a Commerce instance
const commerce = new Commerce(
  "pk_test_53392f93868a1c62829453cbdb40c7a0991e6929b204f"
);

export default defineNuxtPlugin(() => {
  // Doing something with nuxtApp
  return {
    provide: {
      commerce,
    },
  };
});
