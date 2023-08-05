<template>
  <div>
    <div v-if="cart && !pending" class="container py-12">
      <h1 class="font-header text-6xl mb-6">Checkout</h1>
      <div class="relative grid lg:grid-cols-2 gap-6">
        <div>
          <div class="sticky top-24 bg-white p-6">
            <h2 class="mb-4 text-2xl">Your Cart</h2>
            <div
              v-for="item in cart.line_items"
              :key="item.id"
              class="flex gap-4 mb-4"
            >
              <div class="flex-none w-16 max-h-max sm:w-24">
                <div class="aspect-[5/4]">
                  <nuxt-img
                    :src="item.image.url"
                    :alt="item.name"
                    sizes="sm:100vw md:25vw"
                    densities="x1 x2"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div class="flex-1 text-base">
                <p class="item-title text-lg font-semibold">{{ item.name }}</p>
                <div class="">
                  <div class="flex justify-between items-center">
                    <p>Quantity: {{ item.quantity }}</p>
                    <p>{{ item.price.formatted_with_symbol }}</p>
                  </div>
                </div>
                <div class="flex-1 w-full mt-2 text-right text-lg">
                  Total: {{ item.line_total.formatted_with_symbol }}
                </div>
              </div>
            </div>
            <div class="cart-total text-right border-t pt-4">
              <p class="font-semibold my-4">
                Subtotal: {{ cart.subtotal.formatted_with_symbol }}
              </p>
              <div class="flex justify-between items-start">
                <p class="text-sm font-bold">Shipping</p>
                <div class="text-sm flex flex-col gap-1 items-end">
                  <div
                    v-for="method in shippingOptions"
                    :key="method.id"
                    class="inline-flex gap-2"
                  >
                    <input
                      type="radio"
                      name="shipping"
                      :id="method.id"
                      :value="method.id"
                      v-model="selectedShippingOption"
                      class="cursor-pointer"
                    />
                    <label :for="method.id"
                      >{{ method.description }} - ({{
                        method.price.formatted_with_symbol
                      }})</label
                    >
                  </div>
                </div>
              </div>
              <p class="font-semibold mt-4">Total To Pay: £{{ totalPrice }}</p>
              <!-- {{ cart.hosted_checkout_url }} -->
            </div>
          </div>
        </div>
        <div v-if="checkoutId">
          <div class="bg-white p-6">
            <form action="">
              <span class="form-section-header">Your Details</span>
              <div class="flex flex-col gap-4">
                <div class="form-group">
                  <label for="name">Name</label>
                  <div class="flex flex-wrap gap-2">
                    <input
                      type="text"
                      id="name[first_name]"
                      name="name[first_name]"
                      placeholder="First Name"
                      v-model="customer.firstname"
                    />
                    <input
                      type="text"
                      id="name[last_name]"
                      name="name[last_name]"
                      placeholder="Last Name"
                      v-model="customer.lastname"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="email">Email Address:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      v-model="customer.email"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="tel">Phone Number:</label>
                    <input
                      type="tel"
                      id="tel"
                      name="tel"
                      placeholder="Phone Number"
                      v-model="customer.phone_number"
                    />
                  </div>
                </div>
              </div>
              <span class="form-section-header">Shipping Address</span>
              <div class="flex flex-col gap-4">
                <div class="form-group">
                  <div>
                    <label for="shipping_address_name">Full Name:</label>
                    <input
                      type="text"
                      id="shipping_address_name"
                      name="shipping_address_name"
                      autocomplete="name"
                      v-model="shipping.name"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="shipping_address_first_line">First Line:</label>
                    <input
                      type="text"
                      id="shipping_address_first_line"
                      name="shipping_address_first_line"
                      autocomplete="address-line1"
                      v-model="shipping.street"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="shipping_address_city">Town / City:</label>
                    <input
                      type="text"
                      id="shipping_address_city"
                      name="shipping_address_city"
                      autocomplete="address-level2"
                      v-model="shipping.town_city"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="grid grid-cols-2 gap-2">
                    <div class="w-full">
                      <label for="address_county">County</label>
                      <select
                        name="address_county"
                        id="address_county"
                        placeholder="County"
                        v-model="shipping.county_state"
                      >
                        <option
                          v-for="locale in Object.keys(
                            subdivisions.subdivisions
                          )"
                          :key="`shipping-${locale}`"
                          :value="locale"
                        >
                          {{ subdivisions.subdivisions[locale] }}
                        </option>
                      </select>
                    </div>
                    <div class="w-full">
                      <label for="address_postcode">Postcode</label>
                      <input
                        type="text"
                        id="address_postcode"
                        name="address_postcode"
                        placeholder="Post/ZIP Code"
                        autocomplete="postal-code"
                        v-model="shipping.postal_zip_code"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <span class="form-section-header">Billing Address</span>
              <div class="flex flex-col gap-4">
                <div class="form-group">
                  <div>
                    <label for="billing_address_name">Billing Name:</label>
                    <input
                      type="text"
                      id="billing_address_name"
                      name="billing_address_name"
                      autocomplete="name"
                      v-model="billing.name"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="billing_address_first_line">First Line:</label>
                    <input
                      type="text"
                      id="billing_address_first_line"
                      name="billing_address_first_line"
                      autocomplete="address-line1"
                      v-model="billing.street"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="billing_address_city">Town / City:</label>
                    <input
                      type="text"
                      id="billing_address_city"
                      name="billing_address_city"
                      autocomplete="address-level2"
                      v-model="billing.town_city"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="grid grid-cols-2 gap-2">
                    <!-- <input
                      type="text"
                      id="billing_address_county"
                      name="address_county"
                      placeholder="County"
                      v-model="billing.county_state"
                    /> -->
                    <div>
                      <select
                        name="billing_address_county"
                        id="billing_address_county"
                        placeholder="County"
                        class="flex-1 w-1/2"
                        v-model="billing.county_state"
                      >
                        <option
                          v-for="locale in Object.keys(
                            subdivisions.subdivisions
                          )"
                          :key="`shipping-${locale}`"
                          :value="locale"
                        >
                          {{ subdivisions.subdivisions[locale] }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="address_postcode"
                        name="address_postcode"
                        placeholder="Post/ZIP Code"
                        autocomplete="postal-code"
                        v-model="billing.postal_zip_code"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <client-only>
              <Stripe
                :total="totalPrice * 100"
                :billing_details="billing"
                :customer="customer"
                :handlePayment="handlePayment"
                :submittingOrder="submittingOrder"
              />
            </client-only>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div
        class="h-96 py-24 flex flex-col justify-center items-center text-primary"
      >
        <LoadingAnimation />
        <span>Loading Checkout...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useCart } from "@/stores/cart";
  import { LineItem } from "@chec/commerce.js/types/line-item";
  const { $commerce } = useNuxtApp();
  const router = useRouter();
  const { cart, setCart } = useCart();
  const checkoutId = ref("");
  const customer = ref({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
  });
  const shipping = ref({
    name: "",
    street: "",
    town_city: "",
    county_state: "",
    postal_zip_code: "",
    country: "GB",
  });
  const billing = ref({
    name: "",
    street: "",
    town_city: "",
    // county_state: "GB-EDH",
    county_state: "",
    postal_zip_code: "",
    country: "GB",
  });
  const shippingOptions = ref();
  const selectedShippingOption = ref();
  const submittingOrder = ref(false);
  const subdivisions = ref();

  const totalPrice = computed(() => {
    return shippingOptions.value && selectedShippingOption.value
      ? cart?.subtotal.raw +
          shippingOptions.value.find(
            ({ id }) => id === selectedShippingOption.value
          ).price.raw
      : cart?.subtotal.raw || "NaN";
  });

  if (!cart) {
    router.replace("/shop/cart");
  }
  const { pending, data: commerceData } = await useLazyAsyncData(
    async () => {
      const { id } = await $commerce.checkout.generateTokenFrom(
        "cart",
        cart?.id
      );
      const shippingInfo = await $commerce.checkout.getShippingOptions(id, {
        country: "GB",
      });
      const localeSubdivisions =
        await $commerce.services.localeListSubdivisions("GB");
      return { id, shippingInfo, localeSubdivisions };
    },
    { server: false }
  );

  const handlePayment = async (stripePaymentMethod: string) => {
    if (submittingOrder.value) return;
    submittingOrder.value = true;
    const { phone_number, ...restCustomer } = customer.value;
    const { county_state, ...restBilling } = billing.value;
    const { county_state: state, ...restShipping } = shipping.value;
    restCustomer.phone = phone_number;
    const data = {
      line_items: cart?.line_items.reduce((prev: object, curr: LineItem) => {
        prev[curr.id] = { quantity: curr.quantity };
        return prev;
      }, {}),
      customer: restCustomer,
      shipping: restShipping,
      billing: billing.value,
      fulfillment: {
        shipping_method: selectedShippingOption.value,
      },
      // payment: {
      //   gateway: "test",
      //   stripe: {
      //     payment_method_id: stripePaymentMethod,
      //   },
      // },
      payment: {
        gateway: "test_gateway",
        card: {
          number: "4242 4242 4242 4242",
          expiry_month: "12",
          expiry_year: "2023",
          cvc: "123",
          postal_zip_code: "94103",
        },
      },
    };
    try {
      const response = await $commerce.checkout.capture(checkoutId.value, data);
      // Reset Cart
      setCart(undefined);
      router.replace("/shop/payment-successful");
    } catch (err) {
      console.log(err);
    } finally {
      submittingOrder.value = false;
    }
  };
  watch(commerceData, (data) => {
    if (!data) return;
    const { id, shippingInfo, localeSubdivisions } = data;
    shippingOptions.value = shippingInfo;
    selectedShippingOption.value = shippingInfo[0].id;
    subdivisions.value = localeSubdivisions;
    checkoutId.value = id;
  });
</script>

<style lang="scss" scoped></style>
