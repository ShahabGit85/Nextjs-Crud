import dbConnect from "@/libs/dbConnect";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    await dbConnect();
    const _id = request.nextUrl.searchParams.get("_id");

    if (!_id) {
      return new NextResponse(
        JSON.stringify({ message: "Product ID is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const deletedProduct = await Products.findByIdAndDelete({_id});

    if (!deletedProduct) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Product deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete product" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
