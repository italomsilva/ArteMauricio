import { ErrorResponse } from "@/app/entities/ErrorResponse";

export async function getProductById(
  id: string
): Promise<GetProductByIdOutput | ErrorResponse> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/products/${id}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "api-key-value": `${process.env.NEXT_PUBLIC_APIKEY_VALUE}`,
    },
  });

  const data = await response.json();
  if (!response.ok || !data) {
    return new ErrorResponse(
      data.statusCode,
      data.message,
      data.error,
    );
  }

  return data;
}

export type GetProductByIdOutput = {
  id: string;
  title: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  mainPhoto: string;
  categories: string[];
  images: {
    url: string;
    order: number;
  }[];
};
