import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteItems } from "@/appwrite";
import * as React from "react";

export default function ProductItems({ id, name, description, image, imageId }){
    // const navigate =  useNavigate()

    const handelClick = async () => { 
        await deleteItems( id, imageId );
        window.location.reload();
        // navigate('/dashboard');
    }

    return (
        <div className="w-full">
            <div className="flex xl:flex-row gap-8 justify-center py-4 pb-12">
                <div className="w-md h-fit -h-[400px] bg-white border-1 border-neutral-200 shadow-md rounded-lg flex flex-col items-center">
                    <img src={image} alt="product image" className="rounded-t-md h-[320px] w-full object-cover hover:scale-[1.015]"/>
                    <div className="relative flex flex-col w-full p-4 gap-2">
                        <h3 className="break-all text-2xl font-semibold font-raleway">{name}</h3>
                    </div>
                </div>
            
                <div className="relative flex flex-col gap-12 justify-between items-center ">
                    <p className="break-all w-sm p-4 text-md font-medium font-raleway">{description}</p>
                    <button onClick={handelClick} className="bg-red-500 w-[200px] p-2 rounded-sm text-md font-raleway font-semibold flex  justify-center items-center gap-2 text-white cursor-pointer">Delete Products <MdDeleteForever className="text-white text-2xl"/></button>
                </div>
            </div>
        </div>
    )
}