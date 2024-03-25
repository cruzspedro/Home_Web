import { supabase } from "./supabase"


async function insertImovelImage(file: File, path:string){
    try {
        const { data, error } = await supabase.storage
        .from('imoveis_pics')
        .upload(path, file)

        if (error) {
            throw error
        } else {
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export default insertImovelImage
