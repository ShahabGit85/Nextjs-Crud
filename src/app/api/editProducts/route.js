import dbConnect from "@/libs/dbConnect";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const _id = searchParams.get("_id");
        if (!_id) {
            return NextResponse.json(
                { error: "Product ID is required" },
                { status: 400 }
            );
        }
        const product = await Products.findById(_id);
        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(product, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "An error occurred" },
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
