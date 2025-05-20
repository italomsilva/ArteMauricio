import { ProductImage } from "@/app/entities/ProductImage";
import { getAllProductImages } from "@/app/controller/products/images/getAllProductimages";
import { deleteImage } from "@/app/controller/products/images/deleteImage";
import { editImage } from "@/app/controller/products/images/editImages";
import { addImage } from "@/app/controller/products/images/addImage";

export async function loadProductImages(
  productId: string,
  token: string
): Promise<ProductImage[]> {
  return await getAllProductImages(productId, token);
}

export function handleFileChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setFile: (file: File | null) => void
) {
  if (e.target.files && e.target.files.length > 0) {
    setFile(e.target.files[0]);
  }
}

export function handleCreate(
  e: React.MouseEvent<HTMLButtonElement>,
  setImageSelected: (image: ProductImage) => void,
  setOrder: (order: number) => void,
  productId: string
) {
  e.preventDefault();
  setImageSelected({ id: -1, order: 0, productId, url: "" });
  setOrder(1);
}

export async function handleDelete(
  e: React.MouseEvent<HTMLButtonElement>,
  imageSelected: ProductImage | undefined,
  token: string | null
) {
  e.preventDefault();
  if (imageSelected && token) {
    const result = await deleteImage(imageSelected.id, token);
    if (result) {
      alert("Deletada com sucesso");
    } else {
      alert("Falha ao deletar");
    }
    location.reload();
  }
}

export async function handleSubmit(
  e: React.FormEvent,
  imageSelected: ProductImage | undefined,
  order: number | undefined,
  file: File | null,
  token: string | null,
  productId: string
) {
  e.preventDefault();
  if (imageSelected && token) {
    let result: boolean;
    if (imageSelected.id == -1) {
      result = await addImage({
        productId,
        imageOrder: order ?? 0,
        file: file!,
        token: token,
      });
    } else {
      result = await editImage({
        productImageId: imageSelected.id,
        newOrder: order,
        token,
        image: file,
      });
    }
    console.log(result);
    if (result) {
      alert("Operação efetuada com sucesso");
    } else {
      alert("Algo deu errado, tente novamente mais tarde");
    }
    location.reload();
  }
}
