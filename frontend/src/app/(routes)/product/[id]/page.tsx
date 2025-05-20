'uuse client'

import ProductPage from "@/app/pages/product_page/ProductPage"

export default function Page(props:{params:{id:string}}){
    return(
        <main>
            <ProductPage id={props.params.id}></ProductPage>
        </main>
    )
}