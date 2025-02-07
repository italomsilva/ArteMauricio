import { Product } from "@/app/entities/Product";

export async function getProductById(id: string): Promise<Product | null> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/products/${id}`;
  console.log(url)
  try {
    const response = await fetch(url, {
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
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null;
  }
}
