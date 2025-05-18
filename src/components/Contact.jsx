
function Contact(){
    return (
        <div className="relative xl:pt-26">
            <div className="h-full flex flex-col gap-14 items-center justify-center w-full px-4">
                    <div className="flex flex-col justify-center">
                            <div className="flex xl:items-center  xl:flex-row flex-col gap-2">
                                    <p className="text-green-500 font-normal font-raleway text-2xl">Connect,</p>
                                    <h1 className="text-green-500 text-3xl xl:text-4xl font-semibold font-worksans">Contact</h1>
                            </div>
                        <p className="mt-4 text-3xl xl:text-5xl font-semibold font-raleway">Some questions concerning our company?</p>
                    </div>

                    <div className="flex flex-col items-center w-full justify-center">
                        <form className="max-w-md sm:w-md p-8 bg-white rounded-[24px] border border-zinc-200">
                            <label className="block mb-2 text-sm font-medium text-zinc-400 font-raleway" htmlFor="name">Full Name</label>
                            <input className="w-full h-[40px] px-3 py-4 mb-4 bg-gray-100 rounded-md font-raleway font-medium text-sm text-zinc-500 appearance-none focus:outline-none focus:ring" type="text" id="name" placeholder="Your Name" required />
                            
                            <label className="block mb-2 text-sm font-medium text-zinc-400" htmlFor="email">Email</label>
                            <input className="w-full px-3 py-2 mb-4 bg-gray-100 font-medium rounded-md font-raleway text-sm text-zinc-400 appearance-none focus:outline-none focus:ring" type="email" id="email" placeholder="Your Email" required />
                            
                            <label className="block mb-2 text-sm font-medium text-zinc-400 font-raleway" htmlFor="message">Message</label>
                            <textarea className="w-full px-3 py-4 mb-4 bg-gray-100 font-medium rounded-md font-raleway text-sm text-zinc-400 appearance-none focus:outline-none focus:ring" id="message" rows="5" placeholder="Your Message" required></textarea>
                            
                            <button className="w-full px-4 py-2 font-semibold text-white font-raleway bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:shadow-outline" type="submit">Send</button>
                        </form>
                    </div>
            </div>
            <div className="h-[400px] w-full flex justify-center mt-10 mb-5">
                    
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.16558543697!2d3.3210594!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d5779d66f5b%3A0x1f747b4ddc6e44e6!2sIkoyi%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1631379436801!5m2!1sen!2s"
                        width="90%"
                        height="100%"
                        style={{ border: 0,
                            borderRadius: "8px",
                         }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

            </div>
        </div>
    );}
export default Contact;