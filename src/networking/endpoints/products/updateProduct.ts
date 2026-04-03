import { baseUrl } from "@/networking/apiUrl";

export interface UpdateProductPayload {
    id: string;
  
    category_id: string | number;
    product_category_id: string | number;
    
}

export async function updateProduct(
    productId: string,
    payload: UpdateProductPayload
): Promise<void> {
    console.log({ payload });
    const response = await fetch(`${baseUrl}/updateProducts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`);
        alert("Failed to update product");
    }
    alert("Product updated successfully");
}