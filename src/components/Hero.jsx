import banner from "../assets/banner.jpg";

function Hero() {
  return (
    <div className="m-auto relative top-0 p-0 flex h-[620px] xl:h-full">
      <div className="relative w-full flex flex-col items-center h-[360px] xl:h-full">
            <div className="relative w-full h-[360px] h--full xl:h-screen flex flex-col"> 
                <img src={banner} alt="banner image" className="h-full xl:h-screen  object-cover"/>
            </div>
            <div className="hidden xl:block absolute left-0 w-1/2 h-full bg-linear-to-r from-green-500 to-green-0 opacity-70"></div>
                <div className="xl:pt-30 px-4 lg:px-4 p-0 m-0 absolute mb:top-1-/2 w-full min-h-2/2 flex flex-col items-center">
                  <div className="relative w-full flex flex-col items-center">
                      <div className="absolute top-73 xl:top-0 xl:relative xl:border-0 border-b-1 border-zinc-200 xl:bg-inherit bg-white md:shadow-inherit rounded-t-md w-full xl:w-6xl xl:h-[390px] flex flex-col xl:justify-center p-4 pb-12">
                              <p className="xl:absolute relative xl:top-48 text-[16px] xl:text-[30px] xl:text-white text-black font-normal pb-2 font-worksans">Experiment with years of research and development</p>
                              <h1 className="text-[32px] xl:text-[64px] xl:text-white text-black md:text--white font-bold pb-13 sm:w-full w-[345px] font-raleway">Simplified Formulation</h1>
                              <p className="xl:absolute relative xl:top-60 xl:text-white text-[14px] xl:text-[18px] font-normal pb-3 font-raleway">We create healthy innovations to make healthcare <br></br>affordable and accessible to the Nigerian health sector.</p>
                              <h1 className="xl:absolute xl:top-0 w-[190px] xl:w-[268px] xl:text-[18px] font-normal bg-green-500 p-2  px-2 text-white shadow-2xl rounded-[5px] flex items-center justify-center font-raleway">Medin Pharmaceuticals</h1>
                      </div>
                  </div>
                </div>
      </div>
    </div>
  );
}
export default Hero;