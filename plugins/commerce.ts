import Commerce from "@chec/commerce.js";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  // Create a Commerce instance
  const commerce = new Commerce(runtimeConfig.public.commerceJsKey);
  return {
    provide: {
      commerce,
    },
  };
});
