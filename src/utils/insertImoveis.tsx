import { supabase } from "./supabase"

async function insertImoveis(imovel: {imobiliaria:string, titulo:string, tipo_contrato:string,
    tipo_imovel:string, endereco:string, quartos:number, banheiros:number, area_util: number,
     descricao:string, foto_principal:string, tags:string, favoritos: number, status:boolean}){
    try {
        
        const { error } = await supabase
        .from('Imoveis')
        .insert(imovel)

        if (error){
            throw error;
        }
    }
    catch (error) {
        console.log(error);
    }
}


export default insertImoveis