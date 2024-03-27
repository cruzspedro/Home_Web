import { ImovelValidation } from "@/lib/validation"
import insertImovelImage from "@/utils/insertImovelImage"
import { ChangeEvent } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const handleFileInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files){
      return
    }
    const file = files[0]
    insertImovelImage(file, 'TESTE1')
    console.log("File inserted in Image Bucket")
}



const Imobiliarias = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof ImovelValidation>>({
    resolver: zodResolver(ImovelValidation),
    defaultValues: {
      titulo: "Imovel X",
      tipo_contrato: "1",
      tipo_imovel: "1",
      endereco: "",
      qtd_quartos: "0",
      qtd_banheiros: "0",
      area_util: "",
      area_construida: "",
      descricao: "",
      foto_principal: "",
      fotos: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ImovelValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-2 flex-col clear-both justify-center m-auto py-5">
    <h2 className="pt-3 font-bold text-base text-white text-center">Preencha os campos para cadastrar o imóvel</h2>
    <FormField
        control={form.control}
        name="titulo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Título do imóvel</FormLabel>
            <FormControl>
              <Input placeholder="" {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tipo_contrato"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-white'>Tipo de contrato</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="--" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Venda">Venda</SelectItem>
                <SelectItem value="Aluguel">Aluguel</SelectItem>
                <SelectItem value="Temporada">Temporada</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tipo_imovel"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-white'>Tipo de imóvel</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="--" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Casa">Casa</SelectItem>
                <SelectItem value="Apartamento">Apartamento</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
          control={form.control}
          name="endereco"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Endereço do imóvel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
        control={form.control}
        name="qtd_quartos"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-white'>Quantidade de quartos</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="--" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="qtd_banheiros"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-white'>Quantidade de banheiros</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="--" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="area_util"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Area útil do imóvel</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Área útil do imóvel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="area_construida"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Área construída</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Área construída do imóvel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="descricao"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Descrição</FormLabel>
            <FormControl>
              <Input placeholder="Descrição do imóvel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="foto_principal"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Foto principal</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} id="foto_principal"/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fotos"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Fotos</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} id="fotos"/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-col">
        <h2 className="pt-2 font-bold text-base text-white pb-2">Insira a imagem principal do Imóvel</h2>
        <input className="py-1" type="file" onChange={handleFileInput} />
      </div>
      <div className="py-2">
        <Button className="w-full" type="submit">Cadastrar</Button>
      </div>
    </form>
  </Form>
    
  )
}

export default Imobiliarias