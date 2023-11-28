import { defineStore } from "pinia";
import { Cart } from "types";
import { CartItem } from "types";

export const useCart = defineStore("userCart", {
  state: () => ({
    cart: undefined as Cart | undefined,
  }),
  getters: {
    getCart: (state) => {
      return state.cart;
    },
  },
  actions: {
    setCart(cart?: Cart) {
      if (cart) {
        cart.cart_total = cart.items.reduce((total, item) => {
          total += item.price * item.quantity;
          return total;
        }, 0);
        this.cart = cart;
        localStorage.setItem("rezCart", JSON.stringify(cart));
        return;
      }

      const localCart = localStorage.getItem("rezCart");

      this.cart = !localCart
        ? {
            id: self.crypto.randomUUID
              ? self.crypto.randomUUID()
              : "0iid7e8huqwy2",
            items: [],
            cart_total: 0,
          }
        : JSON.parse(localCart);
    },
    addToCart(item: CartItem) {
      if (!this.cart) {
        return this.setCart();
      }
      const existingCartItem: number | undefined = this.cart?.items.findIndex(
        (i) => i.id === item.id
      );
      /**
       * If the item already exists in the cart we need to increment the quantity of the existing item
       */
      const cart = { ...this.cart };
      if (existingCartItem === undefined || existingCartItem < 0) {
        cart.items.push(item);
      } else {
        cart.items[existingCartItem].quantity += 1;
      }

      this.setCart(cart);
      // Update localStorage Cart
      localStorage.setItem("rezCart", JSON.stringify(cart));
    },
    removeFromCart(id: String) {
      const items = this.cart?.items.filter((item) => item.id !== id);
      this.cart ? (this.cart.items = items || []) : "";
      this.setCart(this.cart);
      localStorage.setItem("rezCart", JSON.stringify(this.cart));
    },
    incrementQuantity(item: CartItem) {
      const existingCartItem: number | undefined = this.cart?.items.findIndex(
        (i) => i.id === item.id
      );
      /**
       * If the item already exists in the cart we need to increment the quantity of the existing item
       */
      if (existingCartItem === undefined || existingCartItem < 0) {
        console.log(existingCartItem);
        this.cart?.items.push(item);
      } else {
        this.cart ? (this.cart.items[existingCartItem].quantity += 1) : "";
      }
      this.setCart(this.cart);
      localStorage.setItem("rezCart", JSON.stringify(this.cart));
    },
    decrementQuantity(item: CartItem) {
      if (!this.cart) return;

      const existingCartItem: number | undefined = this.cart?.items.findIndex(
        (i) => i.id === item.id
      );

      /**
       * If the item already exists in the cart we need to decrement the quantity of the existing item
       */
      if (existingCartItem !== undefined && existingCartItem > -1) {
        if (this.cart.items[existingCartItem].quantity === 1) {
          this.removeFromCart(this.cart.items[existingCartItem].id);
          return;
        }
        this.cart ? (this.cart.items[existingCartItem].quantity -= 1) : "";
      }
      this.setCart(this.cart);
      localStorage.setItem("rezCart", JSON.stringify(this.cart));
    },
  },
});
