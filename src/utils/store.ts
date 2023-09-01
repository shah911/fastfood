import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITAIL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITAIL_STATE.products,
      totalItems: INITAIL_STATE.totalItems,
      totalPrice: INITAIL_STATE.totalPrice,

      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) =>
            product.id === item.id && product.optionTitle === item.optionTitle
        );
        if (productInState) {
          const updatedProducts = products.map((product) =>
            product.id === productInState.id &&
            product.optionTitle === item.optionTitle
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                }
              : item
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },
      removeFromCart(item) {
        set((state) => ({
          products: state.products.filter(
            (product) =>
              product.id !== item.id || product.optionTitle !== item.optionTitle
          ),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price,
        }));
      },
      emptyCart() {
        set(() => ({
          products: [],
          totalItems: 0,
          totalPrice: 0,
        }));
      },
    }),
    { name: "cart", skipHydration: true }
  )
);
