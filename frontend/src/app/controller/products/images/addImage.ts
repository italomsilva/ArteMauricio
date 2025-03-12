export async function addImage(input: {
  productId: string;
  imageOrder: number;
  file: File;
  token: string;
}) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/product/images/add`;
    const formData = new FormData();
    formData.append("productId", `${input.productId}`);
    formData.append("imageOrder", `${input.imageOrder}`);
    formData.append("file", input.file);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "api-key-value": `${process.env.NEXT_PUBLIC_APIKEY_VALUE}`,
        "auth-token": input.token,
      },
      body: formData,
    });

    if (!response.ok) {
      console.log(`Erro: ${response.status} - ${response.statusText}`);
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return false;
  }
}
