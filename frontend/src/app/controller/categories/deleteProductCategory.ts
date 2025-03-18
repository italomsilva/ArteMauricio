export async function deleteProductCategory(productCategoryId:number, token:string): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/categories/product/delete`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "api-key-value": `${process.env.NEXT_PUBLIC_APIKEY_VALUE}`,
          "auth-token": `${token}`
        },
        body:JSON.stringify({
          productCategoryId
        })
      });
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
      const result = data.sucess;
      return result??false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  }
  