import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill in all fields." };
        }

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error("sever error while creating product");
            }

            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product created!" };

        } catch (error) {
            if (error.name === "TypeError") {
                // Handle network errors or CORS issues
                return {
                  success: false,
                  message: "Network error. Please try again later.",
                };
              }
            return { success: false, message: error.message };
        }
    },
}));
