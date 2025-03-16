/* eslint-disable react/no-unescaped-entities */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


const Help = () => {

    return (
      <>
          <div className="text-center py-12 ">
            <h1 className="text-5xl font-bold">Need Help?</h1>
            <p className="mt-4 text-lg">
              Find answers to common questions or contact us for support.
            </p>
          </div>
          <div className="w-full flex flex-col items-center">
            <Textarea id="HelpMessage" name="HelpMessage" placeholder="Type your message here." className="w-1/2 h-96 bg-transparent border-black dark:border-inherit !text-base focus-visible:ring-0 focus-visible:ring-offset-0" />
            <Button className="w-fit mt-5">Send message</Button>
          </div>

          <div className="px-4 py-8 mt-10 ml-3">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions (FAQ)</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I change my password?</AccordionTrigger>
                <AccordionContent>
                To change your password, go to the Settings page and click on 'Reset Password'. Follow the instructions to update your credentials
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I search for my stats?</AccordionTrigger>
                <AccordionContent>
                Select a supported game from the Supported Games page and enter your in-game username accurately to view your stats.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I contact?</AccordionTrigger>
                <AccordionContent>
                For further assistance, use the 'Contact Us' button on this page. Provide as much detail as possible for quicker resolution.                
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>My stats are incorrect, what should I do?</AccordionTrigger>
                <AccordionContent>
                If your stats appear incorrect, double-check your game username and ensure it's entered correctly. Contact support if issues persist.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
      </>
    );
}

export default Help;