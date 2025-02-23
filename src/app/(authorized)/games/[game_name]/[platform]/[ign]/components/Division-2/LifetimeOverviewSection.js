import { Sparkles, Clock } from 'lucide-react';
import { renderedOtherStats } from '../RenderStats';


const LifetimeOverviewSection = ({ stats, playtime }) => {
    
    return(
        <div className="rounded-2xl bg-[#1e1e1e] w-full p-2">
            <div className="w-full flex items-center p-3 ml-3 gap-3">
                <Sparkles className="size-9" />
                <h1 className="text-3xl font-serif font-semibold tracking-wide">Lifetime Overview</h1>
                <div className='ml-4 flex items-center space-x-2 text-[#858585]'>
                    <Clock />
                    <span>{playtime.displayValue} Playtime</span>
                </div>
            </div>
            <div className="flex justify-center flex-wrap gap-10 p-4 border-t border-t-[#2b2b2b]">
                {renderedOtherStats(stats)}
            </div>
        </div>
    );
}

export default LifetimeOverviewSection;