const IgnNotFound = ({ errorMessage }) => {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-5">
            <h1 className="text-7xl">Sorry!</h1>
            <h2 className="text-5xl">{ errorMessage }</h2>
        </div>
    );
}

export default IgnNotFound;