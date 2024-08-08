"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Button } from 'react-daisyui'

const ProductList = () => {

  const router = useRouter()

  useEffect(() =>{
    const res =  fetch("/getProduct")
    console.log("this data in the res =>", res)
  },[])

  const handleAddbtn = () =>{
    router.push("/addProduct")
  }
  const handleEditbtn = () =>{
    router.push(`/editProduct/${id}`)
  }
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">Products</h2>
      <div className='flex flex-wrap lg:justify-between md:justify-between items-center'>
      <p className="text-gray-600 mb-6">A list of all the Products in your account including their name, image, category and price.</p>
      <Button  className="mt-4 bg-blue-500 px-4 py-2 mb-3 rounded text-white" onClick={handleAddbtn}>Add Product</Button>

      </div>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="w-full bg-gray-100 border-b">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Price</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4" >Edit</th>
              <th className="text-left py-3 px-4">Delete</th>
              <th className="text-left py-3 px-4">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4 flex items-center">
                <img className="h-10 w-10 rounded-full object-cover mr-4" src="https://img.daisyui.com/images/profile/demo/3@94.webp" alt="Profile" />
                <div>
                  <div className="font-bold">Courtney Henry</div>
                  <div className="text-sm text-gray-500">courtney.henry@example.com</div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div>Designer</div>
                <div className="text-sm text-gray-500">Intranet</div>
              </td>
              <td className="py-3 px-4">Admin</td>
              <td className="py-3 px-4">
                <Button color="ghost" size="xs" onClick={handleEditbtn}>Edit</Button>
              </td>
              <td className="py-3 px-4">
                <Button color="ghost" size="xs">Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ProductList
