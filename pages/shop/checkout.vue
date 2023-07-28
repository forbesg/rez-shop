<template>
  <div>
    <div class="container py-12">
      <h1 class="font-header text-6xl mb-6">Checkout</h1>
      <div v-if="cart" class="relative grid lg:grid-cols-2 gap-6">
        <div>
          <div class="sticky top-24 bg-white p-6">
            <h2 class="mb-4 text-2xl">Your Cart</h2>
            <div
              v-for="item in cart.line_items"
              :key="item.id"
              class="flex gap-4 mb-4"
            >
              <nuxt-img
                :src="item.image.url"
                width="100"
                height="80"
                :alt="item.name"
                class="flex-none"
              ></nuxt-img>
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
              <p class="text-sm">Shipping: Free</p>
              <p class="font-semibold">
                Total To Pay: {{ cart.subtotal.formatted_with_symbol }}
              </p>
              <!-- {{ cart.hosted_checkout_url }} -->
            </div>
          </div>
        </div>
        <div v-if="checkoutId">
          <div class="bg-white p-6">
            <pre class="text-xs">checkout id: {{ checkoutId }}</pre>
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
                      v-model="customer.phone_number"
                    />
                  </div>
                </div>
              </div>
              <span class="form-section-header">Shipping Address</span>
              <div class="flex flex-col gap-4">
                <div class="form-group">
                  <div>
                    <label for="shipping_address_name">Customer Name:</label>
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
                  <div class="flex gap-2">
                    <input
                      type="text"
                      id="address_county"
                      name="address_county"
                      placeholder="County"
                      v-model="shipping.county_state"
                    />
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
                  <div class="flex gap-2">
                    <input
                      type="text"
                      id="address_county"
                      name="address_county"
                      placeholder="County"
                      v-model="billing.county_state"
                    />
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
            </form>
            <!-- <client-only>
              <Stripe
                :total="cart.subtotal.raw * 100"
                :billing_details="billing"
                :customer="customer"
                :handlePayment="handlePayment"
              />
            </client-only> -->
          </div>
        </div>
      </div>
    </div>
    <pre v-if="cart">{{ cart }}</pre>
  </div>
</template>

<script lang="ts" setup>
  import { useCart } from "@/stores/cart";
  import { LineItem } from "@chec/commerce.js/types/line-item";
  const { $commerce } = useNuxtApp();
  const router = useRouter();
  const { cart } = useCart();
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
    county_state: "GB-EDH",
    postal_zip_code: "",
    country: "GB",
  });
  const shippingOptions = ref();
  console.log(customer);

  if (!cart) {
    router.replace("/shop/cart");
  } else {
    const { id } = await $commerce.checkout.generateTokenFrom("cart", cart.id);
    const shippingInfo = await $commerce.checkout.getShippingOptions(id, {
      country: "GB",
    });
    shippingOptions.value = shippingInfo;
    checkoutId.value = id;
  }

  const handlePayment = async (stripePaymentMethod: sting) => {
    console.log(stripePaymentMethod);
    const { phone_number, ...restCustomer } = customer.value;
    const { county_state, ...restBilling } = billing.value;
    const { county_state: state, ...restShipping } = shipping.value;
    restCustomer.phone = phone_number;
    const data = {
      line_items: cart.line_items.reduce((prev: object, curr: LineItem) => {
        prev[curr.id] = { quantity: curr.quantity };
        return prev;
      }, {}),
      customer: restCustomer,
      shipping: restShipping,
      billing: restBilling,
      fulfillment: {
        shipping_method: shippingOptions.value[0].id,
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
    console.log(data);

    const response = await $commerce.checkout.capture(checkoutId.value, data);
  };
</script>

<style lang="scss" scoped></style>
