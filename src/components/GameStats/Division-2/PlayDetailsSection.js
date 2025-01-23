import { Ghost } from 'lucide-react';

const PlayDetailsSection = ({ stats }) => {

    const renderedStats = stats?.map(([key, value]) => (
        <div key={key} className='flex justify-between p-1.5 text-xl even:bg-[#222222]'>
            <h3>{value.displayName}</h3>
            <span>{value.displayValue}</span>
        </div>
    ))

    return(
        <div className="rounded-2xl p-2 bg-[#1e1e1e]">
            <div className="w-full flex items-center p-3 ml-3 gap-3">
                <Ghost className='size-9' />
                <h1 className="text-3xl font-serif font-semibold tracking-wide">Play Details</h1>
            </div>
            <div className='flex flex-col p-5 border-t border-t-[#2b2b2b]'>
                {renderedStats}
            </div>
        </div>
    );
}

export default PlayDetailsSection;