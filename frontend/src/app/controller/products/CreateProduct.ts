import { Product } from "@/app/entities/Product";

export async function createProduct(input: {
    token: string;
    title: string;
    price: number;
    description?: string;
    mainPhoto?: File | null;
}): Promise<Product | null> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/products/create`;
  try {
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("price", input.price.toString());
    if (input.description) formData.append("description", input.description);
    if (input.mainPhoto) formData.append("file", input.mainPhoto);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "api-key-value": `${process.env.NEXT_PUBLIC_APIKEY_VALUE}`,
        "auth-token": input.token,
      },
      body: formData,
    });

    if (response.status != 201) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return null;
  }
}
