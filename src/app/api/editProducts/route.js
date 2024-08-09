import dbConnect from "@/libs/dbConnect";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await dbConnect();
        const _id = request.nextUrl.searchParams.get("_id");
        console.log('ID in searchParams:', _id);

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

export async function PUT(request) {
    try {
        await dbConnect();
        const _id = request.nextUrl.searchParams.get("_id");
        console.log('ID in searchParams:', _id);

        if (!_id) {
            return NextResponse.json(
                { error: "Product ID is required" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { name, price, category } = body;

        if (!name || !price || !category) {
            return NextResponse.json(
                { error: "All fields (name, price, category) are required" },
                { status: 400 }
            );
        }
        const updatedProduct = await Products.findByIdAndUpdate(
            _id,
            { name, price, category },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedProduct, {
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
