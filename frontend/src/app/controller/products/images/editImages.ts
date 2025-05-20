export async function editImage(input: {
  productImageId: number;
  token: string;
  newOrder?: number;
  image?: File | null;
}): Promise<boolean> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/product/images/edit`;
  try {
    const formData = new FormData();
    formData.append("productImageId", `${input.productImageId}`);
    if (input.newOrder) formData.append("newOrder", `${input.newOrder}`);
    if (input.image) formData.append("file", input.image);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "api-key-value": `${process.env.NEXT_PUBLIC_APIKEY_VALUE}`,
        "auth-token": input.token,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.sucess;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return false;
  }
}
