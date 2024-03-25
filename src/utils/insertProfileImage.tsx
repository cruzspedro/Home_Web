import { supabase } from "./supabase"


async function insertProfileImage(file: File, path:string){
    try {
        const { data, error } = await supabase.storage
        .from('profile_pics')
        .upload(path, file)

        if (error) {
            throw error
            return
        } else {
            console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export default insertProfileImage