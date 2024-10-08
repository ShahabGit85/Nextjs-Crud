"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { Toaster, toast } from "react-hot-toast";

const getProducts = async () => {
  try {
    const response = await fetch("/api/getProducts");
    if (response.ok) {
      const data = await response.json();
      return data.products;
    } else {
      console.error(
        "Failed to fetch products: ",
        response.status,
        response.statusText
      );
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error("An error occurred while fetching products:", error);
    return [];
  }
};

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const RemoveProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/deleteProducts/?_id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        toast.success("Your product has been deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete product");
        console.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product");
      console.error("An error occurred while deleting the product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">Products</h2>
      <div className="flex flex-wrap lg:justify-between md:justify-between items-center">
        <p className="text-gray-600 mb-6">
          A list of all the Products in your account including their name,
          image, category, and price.
        </p>
        <Link
          className="mt-4 bg-blue-500 px-4 py-2 mb-3 rounded text-white"
          href={"/addProduct"}
        >
          Add Product
        </Link>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="w-full bg-gray-100 border-b">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Price</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Edit</th>
              <th className="text-left py-3 px-4">Delete</th>
              <th className="text-left py-3 px-4">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 border-b">
                  <td className="py-3 px-4 flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover mr-4"
                      src="https://picsum.photos/200/300"
                      alt={product.name}
                    />
                    <div>
                      <div className="font-bold">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        {product.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.price}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td>
                    <Link
                      color="ghost"
                      size="xs"
                      className="bg-blue-600 px-4 py-2 rounded text-white"
                      href={`/editProduct/?id=${product._id}`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      color="ghost"
                      size="xs"
                      className="bg-red-600  p-2 rounded text-white"
                      onClick={() => RemoveProduct(product._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-3 px-4 text-center text-gray-500"
                >
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Toaster />
      </div>
    </div>
  );
}
