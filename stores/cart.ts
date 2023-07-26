import {
  AddUpdateResponse,
  RemoveResponse,
} from "@chec/commerce.js/features/cart";
import { Cart } from "@chec/commerce.js/types/cart";
import { defineStore } from "pinia";

export const useCart = defineStore("userCart", {
  state: () => ({
    cart: undefined as Cart | AddUpdateResponse | RemoveResponse | undefined,
  }),
  getters: {
    getCart: (state) => state.cart,
  },
  actions: {
    setCart(cart?: Cart | AddUpdateResponse | RemoveResponse) {
      this.cart = cart;
    },
  },
});
