import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { uploadImage, addToDB } from '@/appwrite';


const AddProducts = () => {
    const [ formData, setFormData ] = React.useState({
        name: "",
        description: "",
        creator: "Admin",

    });
    const [isPending, setIsPending] =  React.useState(false)
    const [image, setSelectedImage] = React.useState(null);
    const [preview, setPreview] = React.useState(null);
    const navigate = useNavigate()

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const imageUrl = URL.createObjectURL(file)
        setPreview(imageUrl)
        setSelectedImage(file)
        }
      };
    
    const handelChange = (event) => {
        const {id , value} = event.target
        setFormData({...formData, [id] : value})
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const imageId = await uploadImage(image)
        const result = await addToDB(formData, imageId)
        console.log("Item saved:", result);
        setIsPending(true);
        navigate('/dashboard');
    }

    return ( 
        <div className="relative bg-lightgreen-100">
            
            <div className="z-10 sticky top-0 pt-2 px-4 xl:px-12 shadow-md flex flex-col justify-center xl:flex-row xl:items-center xl:justify-between bg-white w-full h-[100px]">
                <Link to={"/dashboard"} className='font-raleway text-[20px] font-semibold flex items-center gap-2 cursor-pointer hover:underline text-zinc-500'><IoArrowBack className='text-green-500'/> All Products</Link>
                <h2 className="mt-4 xl:text-3xl text-2xl font-semibold font-raleway text-green-500">Add products</h2>
            </div>

            <div className='flex flex-col items-center justify-center py-12 px-12'>

                <form onSubmit={handleSubmit} className='flex lg:flex-row flex-col-reverse gap-8'>
                    <div className='w-full md:w-sm '>
                        <label className="flex text-1xl font-bold font-raleway gap-4 pt-4 text-zinc-500">Product Name:</label>
                        <input
                            id='name'
                            type='text'
                            required
                            value={formData.name}
                            onChange={handelChange}
                            className="w-full h-[40px] px-3 py-4 mb-4 bg-gray-100 rounded-md font-raleway font-medium text-sm text-zinc-500 appearance-none focus:outline-none focus:ring"
                        />

                        <label className="flex items-center text-1xl font-bold font-raleway gap-4 pt-4 text-zinc-500">Description:</label>
                        <textarea
                        type='text'
                        id='description'
                        required
                        value={formData.description}
                        onChange={handelChange}
                        className="w-full min-h-[150px] px-3 py-4 mb-4 bg-gray-100 rounded-md font-raleway font-medium text-sm text-zinc-500 appearance-none focus:outline-none focus:ring"
                        ></textarea>
                        
                        <label className="flex items-center text-1xl font-bold font-raleway gap-4 pt-4 text-zinc-500">Created By:</label>
                        <select className='w-full h-[40px] px-3 mb-4 bg-gray-100 rounded-md font-raleway font-medium text-sm text-zinc-500 appearance-none focus:outline-none focus:ring cursor-pointer'
                        value={formData.creator}
                        id='creator'
                        onChange={handelChange}>
                            <option value="Admin">Admin</option>
                            <option value="Ola">Ola</option>
                        </select>

                        { !isPending && <button className='w-full px-4 py-2 font-semibold text-white font-raleway bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:shadow-outlin'>Add Product</button>}
                        { isPending && <button disabled>Add Prodcut...</button>}
                    </div>



                        
                    <div className='flex flex-col items-center- justify-end'>
                        { image && (
                            <img
                            alt='Product image'
                            value={image}
                            src={preview}
                            // onChange={handleImageChange}
                            // src={URL.createObjectURL(selectedImage)}
                            className='w-sm h-full object-cover mb-2 rounded-2xl'/>)}

                        <div className='gap-2 flex flex-col items-center justify-center'>
                            <input 
                                type="file"
                                id='image'
                                name='Product Image'
                                accept='image/*'
                                // onChange={(event) => setSelectedImage(event.target.files[0])}
                                onChange={handleImageChange}
                                className='w-sm border h-[40px] py-2 px-2 bg-gray-100 rounded-md font-raleway font-bold text-sm text-zinc-500 appearance-none focus:outline-none'/>


                            <input onClick={() =>
                            setSelectedImage(null)} 
                            type='button'
                            value='Remove'
                            className='flex items-center font-bold font-raleway gap-2 w-sm border h-[40px] py-2 px-2 bg-gray-100 rounded-md text-sm text-zinc-500 appearance-none focus:outline-none'/>
                        </div>    
                    </div>


                </form>
            </div>
        </div>
    );
}
export default AddProducts;