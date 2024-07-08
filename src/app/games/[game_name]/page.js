const UsernameEntry = ({ params:{game_name} }) => {

    
    return (
        <div className="h-fit w-fit mx-auto p-4 text-center mt-40 space-y-4">
            <h1 className="text-5xl">{decodeURIComponent(game_name)} Stats</h1>
            <form>
                <input type="text" name="Username" placeholder="Enter Username" className="rounded-2xl text-3xl h-16 p-2" autoComplete="off" />
            </form>
        </div>
    );

}

export default UsernameEntry;