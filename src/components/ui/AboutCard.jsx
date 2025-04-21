

function AboutCard({ icon, title, description }) {
    return(
        <div className="rounded-md flex gap-6 border border-zinc-200  items-center p-4 hover:scale-[1.015] transition-all duration-300 ease-in-out shadow-md">
            <div className="rounded-sm bg-green-500 min-h-16 min-w-16 flex items-center justify-center text-white text-3xl">
                {icon}
            </div>
            <div className="border-l-1 border-zinc-200  pl-4">
                <h3 className="text-[24px] font-bold font-raleway max-w-xs wrap-break-word">{title}</h3>
                <p className="text-[16px] font-worksansh max-w-xs wrap-break-word">{description}</p>
            </div>
        </div>
    )
}
export default AboutCard;