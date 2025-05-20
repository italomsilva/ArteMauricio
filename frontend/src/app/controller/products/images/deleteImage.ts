export async function deleteImage(
  productImageId:number,
  token: string
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/product/images/delete`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "api-key-value": `${process.env.NEXT_PUBLIC_APIKEY_VALUE}`,
        "auth-token": token,
      },
      body: JSON.stringify({
        productImageId
      }),
    });

    if (!response.ok) {
      console.log(`Erro: ${response.status} - ${response.statusText}`);
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.sucess;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return false;
  }
}
