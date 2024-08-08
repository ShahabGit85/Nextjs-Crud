import { ProductsModal } from "@/models/products";
import dbConnect from "../../../../libs/dbConnect";
import ProductList from "@/app/products/page";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{

        await dbConnect()
    
        const {name , price, Image,  category} = await request.json();
        const product =  new ProductsModal({
            name,
            price,
            Image,
            category
        })
        await product.save()
        return new Response(JSON.stringify({product}),
        {
            status: 201,
            headers:{
                "Content-Type": "application/json"
            }
        }
    )
    } catch(error){
        return new Response(JSON.stringify({error: error.message}),{
            status:500,
            headers:{'Content-Type': 'application/json'}
        })
    }
}

