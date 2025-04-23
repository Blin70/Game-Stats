import { renderedOtherStats } from "../RenderStats";


const OtherSections = ({ stats, title, icon }) => {

    return(
        <div className="rounded-2xl bg-[#1e1e1e] w-full p-2">
            <div className="w-full flex items-center p-3 ml-3 gap-3">
                {icon}
                <h1 className="text-3xl font-serif font-semibold tracking-wide">{title}</h1>
            </div>
            <div className="flex flex-wrap [&>*]:flex-1 justify-center p-5 gap-10 border-t border-t-[#2b2b2b]">
                {renderedOtherStats(stats)}
            </div>
        </div>
    );
}

export default OtherSections;