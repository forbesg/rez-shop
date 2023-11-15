<template>
  <div class="py-6 lg:py-12">
    <div v-if="product" class="container">
      <Title>{{ product.title }} | The Shop</Title>
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div
          :style="{
            backgroundImage: `url(${product.images[0]?.blurUpThumb})`,
            backgroundSize: 'cover',
          }"
          class="relative z-10"
        >
          <DatoImage
            :image="product.images[0]"
            :width="800"
            :height="800"
            class="aspect-[1/1]"
          />
        </div>
        <div class="perpective-box h-full">
          <transition name="flip" mode="out-in">
            <div
              v-if="!getInTouch"
              class="flex flex-col p-6 h-full lg:p-12 bg-white origin-top md:origin-left"
            >
              <h1 class="text-6xl font-header mb-4">{{ product.title }}</h1>
              <div class="meta text-xs font-button text-gray-500">
                <p>
                  <span>SKU:</span><span>{{ product.sku }}</span>
                </p>
                <p class="mt-1">
                  {{
                    product.inStock && product.stock > 0
                      ? "In Stock"
                      : "Out of Stock"
                  }}
                </p>
                <div class="flex gap-1 mt-2">
                  <nuxt-link
                    v-for="cat in product.categories"
                    :key="cat.id"
                    :to="`/${cat.slug}`"
                    class="bg-orange-600 text-white p-1 px-2 text-xs rounded"
                    >{{ cat.title }}</nuxt-link
                  >
                </div>
              </div>
              <div
                v-if="product?.description"
                v-html="product.description"
                class="flex-1 my-6"
              ></div>

              <p class="text-right">
                <span>Price: </span
                ><span class="font-semibold text-xl">{{
                  currency(product.price)
                }}</span>
              </p>
              <div
                v-if="!product.inStock"
                class="flex justify-between items-center gap-4 w-full mt-4 text-center font-semibold text-red-500"
              >
                <span class="text-sm">Sold Out</span>
                <button @click="getInTouch = true">Get In Touch</button>
              </div>
              <button
                v-else
                class="block w-full mt-4"
                :class="[{ loading: addingToCart }]"
                @click="handleAddToCart"
              >
                <span class="text-lg inline-block leading-none mr-1"
                  >&plus;</span
                >Add To Cart
              </button>
            </div>
            <div
              v-else
              class="flex flex-col p-6 h-full lg:p-12 bg-white origin-top md:origin-left"
            >
              <p class="text-3xl mb-4">Get In Touch</p>
              <p>
                Email your request and we will happily create the item to order.
              </p>
              <button class="mt-6" @click="() => (getInTouch = false)">
                Close
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div
      v-if="product.relatedProducts && product.relatedProducts.length"
      class="related-products"
    >
      <div class="container">
        <h2>You might also like...</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="relatedProduct in product.relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
            :category_slug="relatedProduct.category[0].slug"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCart } from "@/stores/cart";
  const cart = useCart();
  import { useNotification } from "@/stores/notification";
  import { CartItem } from "types";
  const notification = useNotification();
  const getInTouch = ref(false);
  const addingToCart = ref(false);
  const handleAddToCart = () => {
    console.log("Add to cart");
    const { id, title, quantity = 1, sku, price, images } = product;
    const cartItem: CartItem = { id, title, quantity, sku, price, images };
    cart.addToCart(cartItem);
    notification.setNotification({
      type: "success",
      title: "Added to Cart",
      message: "Your item has been added to your cart",
    });
  };
  const {
    params: { product_slug },
  } = useRoute();

  const currency = useCurrency();

  const PRODUCT_QUERY = `
    query ($slug: String) {
      product (filter: { slug: { eq: $slug }}) {
        id
        title
        description
        sku
        _seoMetaTags {
          attributes
          tag
        }
        images {
          blurUpThumb
          responsiveImage(imgixParams: { w: 800, h: 800, fit: crop, crop: focalpoint, auto:format }) {
            alt
            src
            srcSet
          }
        }
        price
        salePrice
        stock
        inStock
        categories: category {
          id
          title
          slug
        }
        height
        width
        length
        relatedProducts {
          id
          title
          # description
          slug
          price
          images {
            blurUpThumb
            responsiveImage(imgixParams: { w: 800, h: 800, fit: crop, crop: focalpoint, auto:format }) {
              alt
              src
              srcSet
            }
          }
          category {
            slug
          }
        }
      }
    }
  `;
  const { data, pending } = await useGraphqlQuery({
    query: PRODUCT_QUERY,
    variables: { slug: product_slug },
  });

  const product = data?.value?.product;
</script>

<style lang="scss" scoped>
  .perpective-box {
    @apply relative z-0;
    perspective: 1000px;
  }
  .related-products {
    @apply bg-white bg-opacity-25 py-24 my-12;
    h2 {
      @apply text-2xl mb-6;
    }
  }
</style>
