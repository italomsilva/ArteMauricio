import { ProductImage } from "@/app/entities/ProductImage";

export async function getAllProductImages(productId: string, token:string): Promise<ProductImage[]> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/product/images/${encodeURIComponent(productId)}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key-value": `${process.env.NEXT_PUBLIC_APIKEY_VALUE}`,
          "auth-token": token,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return [];
    }
  }
  
