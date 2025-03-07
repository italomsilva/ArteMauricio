'use client'

import EditProductPage from "@/app/pages/edit_product_page/EditProductPage"


export default function Page(props:{params:{id:string}}){
    return(
        <main>
            <EditProductPage id={props.params.id}></EditProductPage>
        </main>
    )
}