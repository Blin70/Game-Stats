const Division2Tabs = ({ CategorizedStats, Awards }) => {
    

    return(
        <div className="grid grid-cols-[25%,75%] space-x-4 mt-6 text-white/90">
            <aside>
                {Awards}
            </aside>
        </div>
    );


}

export default Division2Tabs;