export async function addProductCategory(input: {
  productId: string;
  categoryName: string;
  token: string;
}): Promise<boolean> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/categories/product/add`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key-value": `${process.env.NEXT_PUBLIC_APIKEY_VALUE}`,
        "auth-token": `${input.token}`
      },
      body:JSON.stringify({
        productId: input.productId,
        categoryName: input.categoryName
      })
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    const result = data.result;
    return result??false;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return false;
  }
}
