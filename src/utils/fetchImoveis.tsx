import { supabase } from '@/utils/supabase';

async function fetchImoveis (tipo_contrato : string="1", tipo_imovel: string="1", quartos: string="0", banheiros: string="0"):Promise<any> {
    const { data, error } = await supabase
    .from('Imoveis')
    .select()
    .eq('tipo_contrato', tipo_contrato)
    .eq('tipo_imovel', tipo_imovel)
    .gte('quartos', parseInt(quartos))
    .gte('banheiros', parseInt(banheiros))

    if (error) {
        console.log(error)
    }

    if (data){
        return data
    }
}

export default fetchImoveis