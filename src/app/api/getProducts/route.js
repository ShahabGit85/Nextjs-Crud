import { ProductsModal } from "@/models/products"
import dbConnect from "../../../../libs/dbConnect"

export async function GET(request) {

    try{
        await dbConnect()
        const products = await ProductsModal.find()
        return NextResponse.json({products})
    }catch(error){
        return new Response(JSON.stringify({error: error}),
    {
        status: 500,
        headers:{
            "Content-Type":"application/json"
        }
    }
    )
    }
    
}