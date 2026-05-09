import API from "@/lib/axios"
// update a  users details
export const updateUser = async (credential: any) => {
    const { data } = await API.patch("/user/update", credential)
    return data
}