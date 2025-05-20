import { ProductCategory } from "@/app/entities/ProductCategory";

export async function getAllProductCategories(productId:string): Promise<ProductCategory[]> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/categories/product/${productId}`;
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key-value": `${process.env.NEXT_PUBLIC_APIKEY_VALUE}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    const results = data.result;
    return results;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return [];
  }
}
