import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login(){
    const { login }  = useAuth();
    
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });
    
    const handelChange = (e) => {
        const {id , value} = e.target
        setFormData({...formData, [id] : value})
    };

    const handelSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate("/dashboard");
        } catch (error) {
             console.error("Login failed:", error);
        }}
    
    
    return(
        <div className="w-full mx-auto grid place-items-center h-screen">
            <form onSubmit={ handelSubmit }>
            <div className="mx-auto w-[434px] max-h-[500px] bg-white drop-shadow-md" >
                <div className="py-4 justify-items-center grid gap-4">
                    <h1 className="text-center font-extrabold font-inter text-[22px] font-raleway text-green-500">Medin Pharmaceuticals</h1>
                    <div className="gap-3.5 grid relative">


                       <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label htmlFor="Email" className="font-inter font-semibold text-[14px] font-worksans">Email</label>
                            <input
                                name="email"
                                type="text"
                                id="email"
                                value={formData.email}
                                onChange={handelChange}
                                 className="w-[385px] h-[40px] rounded-[8px] border outline-none indent-4"/>
                       </div>

                       <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label htmlFor="Password" className="font-inter font-semibold text-[14px] font-worksans">Password</label>
                            <input
                                name="password"
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handelChange}
                                 className="w-[385px] h-[40px] rounded-[8px] border outline-none indent-4"/>
                       </div>
                    </div>


                    <div className="flex w-full" >
                        <div className="mx-6.5 flex w-full gap-2">
                        <button onClick={handelSubmit} type="submit"  className="bg-green-500 w-[280px]- w-full h-[39px] cursor-pointer text-white font-inter font-bold text-[12px] rounded-[8px]">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    )
}