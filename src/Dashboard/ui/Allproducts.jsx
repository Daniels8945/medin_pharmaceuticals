import { MdDeleteForever } from "react-icons/md";
import * as React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useNavigate } from "react-router-dom";

export default function ProductItems({ id, name, description, image, imageId,  onDelete }){
    const navigate = useNavigate()
    const handelClick = async () => { 
        await onDelete( id, imageId );
        navigate("/addproducts");
    }

    return (
            <div className="flex flex-row justify-center w-fit px-4">
                <div className="border-b rounded-2xl gap-6 flex items-center justify-around px-4">
                    <div className="relative flex flex-row items-center w-sm py-2 gap-2">
                        <img src={image} alt="product image" className="rounded-full h-[60px] w-[60px] object-cover hover:scale-[1.015]"/>
                        <h3 className="break-all text-[14px] w-sm font-semibold font-raleway text-zinc-600">{name}</h3>
                    </div>
                    <HoverCard>
                        <HoverCardTrigger className="break-all text-[14px] font-semibold w-sm font-raleway text-zinc-600 p-2 truncate">{description}</HoverCardTrigger>
                            <HoverCardContent>
                                {description}
                            </HoverCardContent>
                    </HoverCard>
                    <button onClick={handelClick} className="bg-red-500 w-[150px] p-2 rounded-sm text-[12px] font-raleway font-semibold flex justify-center items-center gap-2 text-white cursor-pointer">Delete Products <MdDeleteForever className="text-white text-2xl"/></button>
                </div>
            </div>
            )}