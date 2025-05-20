'use client'

import EditProductCategoriesPage from "@/app/pages/edit_product_categories_page/EditProductCategoriesPage"


export default function Page(props:{params:{id:string}}){
    return(
        <main>
            <EditProductCategoriesPage productId={props.params.id}></EditProductCategoriesPage>
        </main>
    )
}