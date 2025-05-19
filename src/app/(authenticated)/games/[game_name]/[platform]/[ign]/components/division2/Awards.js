import { Progress } from "@/components/ui/progress";
import { Circle } from "lucide-react";

const Awards = ({ stats }) => {

    const renderedStats = Object.entries(stats).map(([key, value]) => (
        <div key={key} className={`flex items-center -space-x-4 ${value.percentile && '-ml-6'}`}>
            {value.percentile && <Progress value={value.percentile} className="[&>*]:bg-[#B7B7B7] bg-black h-2 w-16 -rotate-90"/>}
            <div className="flex flex-col items-start">
                <span className="text-lg font-semibold text-[#757575]">{value.displayName}</span>
                <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold">{value?.displayValue || 'N/A'}</h2>
                    {value.percentile && <span className="text-xs text-[#ffd43b] flex items-center"><Circle className="size-1.5 fill-[#ffd43b] mx-1"/> Top {Number.isInteger(value.percentile) ? (100 - value.percentile) : (parseFloat(100 - value.percentile).toFixed(1))}%</span>}
                </div>
            </div>
        </div>
    ))

    return (
        <div className="w-full rounded-2xl bg-[#1e1e1e] p-10 space-y-5">
            {renderedStats}
        </div>
    );
}

export default Awards;