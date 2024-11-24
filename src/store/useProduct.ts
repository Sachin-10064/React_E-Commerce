import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "../types";

interface productStore {
  products: Product[];
  product: Product;
  loading: boolean;
  categories: Array<string>;
  // category: string,
  setProduct: (product: Product[]) => void;
  // setCategory: (category: string) => void,

  getAllProducts: () => void;
  getProductById: (productId: string) => void;
  getProductByCategory: (category: Array<string>) => void;
  getCategory: () => void;
}
export const useProductStore = create<productStore>()(
  persist(
    (set) => ({
      products: [],
      product: null,
      categories: [],
      loading: false,
      
      setProduct: (products) => set({ products }),
      // setCategory: (categories) => set({ categories }),

   
      getAllProducts: async () => {
        try {
          set({ loading: true });
          const response = await fetch("https://fakestoreapi.com/products");
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          const data = await response.json();
          set({ products: data, loading: false });
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      getProductById: async (productId) => {
        try {
          console.log("productId", productId);
          set({ loading: true });
          const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          const data = await response.json();
          set({ product: data, loading: false });
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      getCategory: async () => {
        try {
          set({ loading: true });
          const response = await fetch(
            `https://fakestoreapi.com/products/categories`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          const data = await response.json();
          set({ categories: data, loading: false });
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      getProductByCategory: async (category) => {
        console.log(category);
        try {
          set({ loading: true });

          const categoryPromises = category.map(async (cate) => {
            const response = await fetch(
              `https://fakestoreapi.com/products/category/${encodeURIComponent(
                cate
              )}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch products for category: ${cate}`);
            }
            return response.json();
          });
          const categoryProducts = await Promise.all(categoryPromises);
          set({ products: categoryProducts.flat(), loading: false });
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
    }),
    {
      name: "product",
    }
  )
);
