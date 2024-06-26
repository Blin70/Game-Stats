import { supabase } from "@/app/Supabase/SupabaseClient";

const SubmitToSupabase = async (username, email, phone) => {
    const { data, error } = await supabase
    .from('TestTable')
    .insert({ Username: username, Email: email, Phone: phone, Joined: new Date().toLocaleString()});

    if(error){
        console.error("Error while inserting data ", error)
    } else if(data){
        console.log("Insert Successfull: ", data)
    }
}

const FetchTableData = async () => {
    let { data, error } = await supabase
    .from('TestTable')
    .select('*');
    
    const renderedData = data.map((item) => (
        <tr key={item.id} className="h-10 text-xl">
            <td>{item.id}</td>
            <td>{item.Username}</td>
            <td>{item.Email}</td>
            <td>{item.Phone}</td>
            <td>{item.Joined}</td>
        </tr>
    ));

    if(error){
        console.error("Error fetching data from table", error)
        return [];
    }

    return renderedData;
} 

export { SubmitToSupabase, FetchTableData };
