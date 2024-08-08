import dbConnect from "@/libs/dbConnect";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function GET(request) {
   await dbConnect();
   try{
    const products = await Products.find()
    return NextResponse.json({products})
   }catch(error){
    return new Response(JSON.stringify({error: error.message}),{
        status:500,
        headers:{'Content-Type':'application/json'}
    })
   }
}