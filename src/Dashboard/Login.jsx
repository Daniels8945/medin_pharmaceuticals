import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login(){
    const [isPending, setIsPending] =  React.useState(false)
    const { login }  = useAuth();
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });
    
    const handelChange = (event) => {
        const {id , value} = event.target
        setFormData({...formData, [id] : value})
    };

    const handelSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(formData.email, formData.password);
            if (login.status == 200) {
                setIsPending(true);
            }
            alert("Login successful")
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed, Email or password incorrect", error);
        }
    }
    
    
    return(
        <div className="w-full mx-auto flex justify-center items-center h-screen">
            <form onSubmit={handelSubmit}>
            <div className="mx-auto w-sm sm:w-[434px] max-h-[500px] bg-white drop-shadow-md" >
                <div className="py-4 justify-items-center grid gap-4">
                    <h1 className="text-center font-medium font-inter text-[22px] font-raleway text-green-500">Medin Pharmaceuticals</h1>
                    <div className="gap-3.5 flex flex-col justify-center">


                       <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label htmlFor="Email" className=" font-normal text-[14px] font-raleway">Email</label>
                            <input
                            
                                type="text"
                                id="email"
                                required
                                value={formData.email}
                                onChange={handelChange}
                                className="w-[320px] sm:w-[385px] h-[40px] rounded-[8px] border outline-none indent-4"/>
                       </div>

                       <div className="grid w-full max-w-sm items-center gap-1.5">
                            <label htmlFor="Password" className="font-inter font-normal text-[14px] font-raleway">Password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={formData.password}
                                onChange={handelChange}
                                className="w-[320px] sm:w-[385px] h-[40px] rounded-[8px] border outline-none indent-4"/>
                       </div>
                    </div>

                        <div className="flex w-full" >
                            <div className="mx-6.5 flex w-full gap-2">
                             { !isPending && <button  type="submit" className="bg-green-500 hover:bg-green-600 w-[280px]- w-full h-[39px] cursor-pointer text-white font-raleway font-bold text-[16px] rounded-[8px]">Sign In</button>}
                            </div>
                        </div>
                </div>
            </div>
            </form>
        </div>
    )
}