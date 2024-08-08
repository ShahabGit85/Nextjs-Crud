import mongoose from "mongoose";

const ProductsSchema =  new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    image:{
        type : String,
    },
    category:{
        type: String,
        require: true
    }

})


export const ProductsModal =  mongoose.model.ProductList || mongoose.model("ProductList", ProductsSchema)