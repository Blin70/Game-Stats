import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { renderedOtherStats } from "../RenderStats";

const Playlists = ({ playlists, length }) => {

    const renderedPlaylists = playlists?.map((i) => (
        <Accordion key={i.attributes.key} type="single" collapsible className="m-2.5">
            <AccordionItem value={i.attributes.key} className="border-b-0 bg-[#313131] rounded-lg">
                <AccordionTrigger className="flex flex-1 hover:no-underline bg-[#313131] p-6 rounded-lg">
                    <h2 className="font-semibold text-xl">{i.metadata.name}</h2>
                </AccordionTrigger>
                <AccordionContent className="flex flex-wrap [&>*]:flex-1 justify-center p-5 gap-10">
                    {renderedOtherStats(Object.entries(i.stats).slice(0,length))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ));

    return(
        <div className="rounded-2xl flex flex-col bg-[#1e1e1e] w-full p-2">
            <div className="w-full flex items-center p-3 ml-3 gap-3">
                <h1 className="text-3xl font-serif font-semibold tracking-wide">Playlists</h1>
            </div> 
            {renderedPlaylists}
        </div>
    );
}

export default Playlists;