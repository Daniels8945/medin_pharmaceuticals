import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";


const AddProducts = () => {
    const [name, setName] = React.useState('');
    const [description, setDescription ] =  React.useState('');
    const [creator, setCreator ] = React.useState('Admin');
    const [isPending, setIsPending] =  React.useState(false)
    const [image, setImage] = React.useState(null);
    const navigate = useNavigate()

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const products = { name, description, creator, image};
        setIsPending(true);

        fetch('http://localhost:5172/allProducts',{
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(products)
        }).then(() => {
            setIsPending(false);
            navigate('/dashboard');
        });
    }

    return ( 
        <div className="relative bg-lightgreen-100">
            
            <div  className="gap-2 z-10 sticky top-0 px-4 xl:px-12 shadow-md flex flex-col xl:flex-row xl:items-center-safe justify-center xl:justify-between bg-white w-full h-[100px]">
                <Link to={"/dashboard"} className='text-2xl font-semibold flex items-center gap-2 cursor-pointer hover:underline '><IoArrowBack className='text-green-500'/> Products</Link>
                <h2 className="mt-4 text-4xl font-semibold font-raleway pb-8 text-green-500">Add a New Product</h2>
            </div>
            <div className='flex flex-col items-center justify-center py-12 px-12'>
                <form onSubmit={handleSubmit} className='flex flex-row gap-8'>
                    <div className='w-md'>
                        <label className="flex  text-1xl font-bold font-raleway gap-4 pt-4">Product Name:</label>
                        <input
                            type='text'
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="w-full h-[40px] px-3 py-4 mb-4 bg-gray-100 rounded-md font-raleway font-medium text-sm text-zinc-500 appearance-none focus:outline-none focus:ring"
                        />

                        <label className="flex items-center text-1xl font-bold font-raleway gap-4 pt-4">Description:</label>
                        <textarea
                        type='text'
                        required
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="w-full min-h-[150px] px-3 py-4 mb-4 bg-gray-100 rounded-md font-raleway font-medium text-sm text-zinc-500 appearance-none focus:outline-none focus:ring"
                        ></textarea>
                        
                        <label className="flex items-center text-1xl font-bold font-raleway gap-4 pt-4">Created By:</label>
                        <select className='w-full h-[40px] px-3 mb-4 bg-gray-100 rounded-md font-raleway font-medium text-sm text-zinc-900 appearance-none focus:outline-none focus:ring cursor-pointer'
                        value={creator}
                        onChange={(event) => setCreator(event.target.value)}>
                            <option value="Admin">Admin</option>
                            <option value="Dami">Dami</option>
                        </select>

                        { !isPending && <button className='w-full px-4 py-2 font-semibold text-white font-raleway bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:shadow-outlin'>Add Product</button>}
                        { isPending && <button disabled>Add Prodcut...</button>}
                    </div>
                        
                    <div className='relative flex flex-col items-center- justify-end'>
                        { image && (
                            <img
                            alt='Product image'
                            value={image}
                            src={image}
                            // onChange={handleImageChange}
                            // src={URL.createObjectURL(selectedImage)}
                            className='w-sm h-full object-cover border mb-2 rounded-2xl'/>)}

                        <div className='gap-2 flex flex-col items-center justify-center'>
                            <input 
                                type="file"
                                id='image'
                                name='Product Image'
                                accept='image/*'
                                // onChange={(event) => setSelectedImage(event.target.files[0])}
                                onChange={ handleImageChange }
                                className='w-sm border h-[40px] py-2 px-2 bg-gray-100 rounded-md font-raleway font-bold text-sm text-zinc-900 appearance-none focus:outline-none'/>


                            <input onClick={() =>
                            setImage(null)} 
                            type='button'
                            value='Remove'
                            className='flex items-center font-bold font-raleway gap-2 w-sm border h-[40px] py-2 px-2 bg-gray-100 rounded-md text-sm text-zinc-900 appearance-none focus:outline-none'/>
                        </div>    
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AddProducts;