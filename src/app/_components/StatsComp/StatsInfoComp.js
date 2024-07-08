const StatsInfo = ({ Key, Value, ...other }) => {
    return (
        <div className="text-5xl w-fit border-2 p-5 border-black rounded-3xl inline-block" {...other} >
            {Key} : {Value}
        </div>
    );
}

export default StatsInfo;