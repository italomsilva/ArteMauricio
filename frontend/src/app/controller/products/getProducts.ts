import { Product } from "@/app/entities/Product";

export async function getProducts(
  page: number,
  searchQuery: string,
  category?: string
): Promise<Product[]> {
  var url = `${
    process.env.NEXT_PUBLIC_BASE_URL_BACKEND
  }/products?page=${page}&limit=28}`;
  if(searchQuery){
    url += `&search=${encodeURIComponent(searchQuery)}`;
  }
  if (category) {
    url += `&category=${encodeURIComponent(category)}`;
  }
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
    console.log(data);
    const results: Product[] = data.result;
    return results;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return [];
  }
}
