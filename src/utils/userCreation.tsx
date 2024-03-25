import { supabase } from "./supabase";

async function userCreation(user: {id: string| undefined, nome:string, email:string, telefone:string, nascimento:string}){
    try {
        const { error } = await supabase
        .from('Pessoas')
        .insert({id: user.id, nome: user.nome, email: user.email, telefone: user.telefone, data_nascimento: user.nascimento})

        if (error){
            throw error;
        }
    } catch (error) {
        console.log(error);
    }
    
}

export default userCreation