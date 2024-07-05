const TableInputs = ({name, placeholder, value, onChange}) => {
    return (
        <input autoComplete="off" required type="text" name={name} placeholder={placeholder} value={value} onChange={onChange} className="w-48 h-12 rounded-2xl text-2xl p-2" />
    );
}

export default TableInputs;