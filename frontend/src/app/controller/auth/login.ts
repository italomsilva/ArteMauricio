export async function login(login: string, password: string): Promise<string | null> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/login`;
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key-value": `${process.env.NEXT_PUBLIC_APIKEY_VALUE}`,
        },
        body: JSON.stringify({ login, password })
      });
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }
  