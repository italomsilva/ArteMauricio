export async function createCategory(
  categoryName: string,
  token: string
): Promise<boolean> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/categories/create`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key-value": `${process.env.NEXT_PUBLIC_APIKEY_VALUE}`,
        "auth-token": `${token}`,
      },
      body: JSON.stringify({
        categoryName: categoryName,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    const result = data.result;
    return result ?? false;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return false;
  }
}
