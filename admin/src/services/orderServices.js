import axios from "axios";
import { URL } from "../Redux/Url";

export const changestatusOrder = async (status,id) => {
const {data} = await axios.put(`${URL}/api/orders/${id}/changestatus`,{status:status});
return data.message;
}