import dbConnect from "@/libs/dbConnect";
import ProductModal from "@/models/products";


export async function POST(request) {
    try{
        await dbConnect()
    
        const {name, price, category} = await request.json()
    
        if(!name || !price || !category){
            return new Response(JSON.stringify({error: "all field are required"}),
        {
            status:400,
            headers:{
                "Content-Type":"application/json"
            }
        })
        }
        const Product = new ProductModal({
            name: name,
            price: price,
            category: category
        })

        await Product.save()
        return new Response(JSON.stringify({message: "Product add successfully", Product}),{
            status: 201,
            headers:{
                "Content-Type": "application/json"
            }
        })
    }catch(error){
       return new Response(JSON.stringify({error: error}),{
        status:500,
        headers:{
            "Content-Type":"application/json"
        }
       })
    }
}