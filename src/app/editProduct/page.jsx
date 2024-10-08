"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
export default function AddProduct() {
    const router = useRouter()
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    useEffect(() => {
        const getProductById = async () => {
            try {
                const res = await fetch(`/api/editProducts/?_id=${id}`);
                if (!res.ok) {
                    throw new Error('Error occurred');
                }
                const data = await res.json();
                setName(data?.name || "");
                setPrice(data?.price || "");
                setCategory(data?.category || "");

            } catch (error) {
                console.log("error", error);
            }
        };

        getProductById();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            name: name,
            price: price, 
            category: category, 
        };
        try {
            const res = await fetch(`/api/editProducts/?_id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
        
            const data = await res.json();
            if (!res.ok) {
                console.error("Server response:", res.status, res.statusText, data);
                throw new Error('Error occurred while updating the product');
            }     
            console.log("Updated product data:", data);
            toast.success("You procduct update successfully")

            router.refresh()
            router.push("/products")
        } catch (error) {
            console.log("Error:", error.message);
            toast.error("soory can't update the product")

        }
    
        
    };
    

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Update the product
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Price
                        </label>
                        <div className="mt-2">
                            <input
                                id="price"
                                name="price"
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Category
                        </label>
                        <div className="mt-2">
                            <input
                                id="category"
                                name="category"
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
                <Toaster/>
            </div>
        </div>
    );
}
