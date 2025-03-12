'use client'

import EditProductImagesPage from "@/app/pages/edit_product_images_page/EditProductImagesPage"



export default function Page(props:{params:{id:string}}){
    return(
        <main>
            <EditProductImagesPage productId={props.params.id}></EditProductImagesPage>
        </main>
    )
}