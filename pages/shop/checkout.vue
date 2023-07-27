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
                    />
                    <input
                      type="text"
                      id="name[last_name]"
                      name="name[last_name]"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="email">Email Address:</label>
                    <input type="email" id="email" name="email" />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="tel">Phone Number:</label>
                    <input type="tel" id="tel" name="tel" />
                  </div>
                </div>
              </div>
              <span class="form-section-header">Shipping Address</span>
              <div class="flex flex-col gap-4">
                <div class="form-group">
                  <div>
                    <label for="address_first_line">First Line:</label>
                    <input
                      type="text"
                      id="address_first_line"
                      name="address_first_line"
                      autocomplete="address-line1"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="address_second_line">Second Line:</label>
                    <input
                      type="text"
                      id="address_second_line"
                      name="address_second_line"
                      autocomplete="address-line2"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="address_city">Town / City:</label>
                    <input
                      type="text"
                      id="address_city"
                      name="address_city"
                      autocomplete="address-level2"
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
                    />
                    <input
                      type="text"
                      id="address_postcode"
                      name="address_postcode"
                      placeholder="Post/ZIP Code"
                      autocomplete="postal-code"
                    />
                  </div>
                </div>
              </div>
              <span class="form-section-header">Billing Address</span>
              <div class="flex flex-col gap-4">
                <div class="form-group">
                  <div>
                    <label for="address_first_line">First Line:</label>
                    <input
                      type="text"
                      id="address_first_line"
                      name="address_first_line"
                      autocomplete="address-line1"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="address_second_line">Second Line:</label>
                    <input
                      type="text"
                      id="address_second_line"
                      name="address_second_line"
                      autocomplete="address-line2"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div>
                    <label for="address_city">Town / City:</label>
                    <input
                      type="text"
                      id="address_city"
                      name="address_city"
                      autocomplete="address-level2"
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
                    />
                    <input
                      type="text"
                      id="address_postcode"
                      name="address_postcode"
                      placeholder="Post/ZIP Code"
                      autocomplete="postal-code"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <pre v-if="cart">{{ cart }}</pre>
  </div>
</template>

<script lang="ts" setup>
  import { useCart } from "@/stores/cart";
  // const { $commerce } = useNuxtApp();
  // const router = useRouter();
  const { cart } = useCart();
  // const checkoutId = ref("");
  // if (!cart) {
  //   router.replace("/shop/cart");
  // } else {
  //   const { id } = await $commerce.checkout.generateTokenFrom("cart", cart.id);
  //   console.log(id);
  //   checkoutId.value = id;
  // }
</script>

<style lang="scss" scoped></style>
