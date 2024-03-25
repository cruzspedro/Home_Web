import { z } from "zod"


export const SignUpValidation = z.object({
    nome: z.string().min(2, {message: "Nome muito curto"}).max(50, {message:"Nome muito grande"}),
    email: z.string().email({message:"E-mail inválido"}),
    login: z.string().min(2, {message:"Login muito curto"}).max(50, {message:"Login muito grande"}),
    senha: z.string().min(8, {message:"Senha muito curta"}).max(20, {message:"Senha muito longa"}),
    telefone: z.string().min(10, {message:"Telefone inválido"}),
    nascimento: z.string().min(2).max(10),
  })

export const SignInValidation = z.object({
    login: z.string().min(2, {message:"Login muito curto"}).max(50, {message:"Login muito grande"}),
    senha: z.string().min(8, {message:"Senha muito curta"}).max(20, {message:"Senha muito longa"}),
  })

export const FilterValidation = z.object({
    tipo_contrato: z.string(),
    tipo_imovel : z.string(),
    qtd_quartos : z.string(),
    qtd_banheiros : z.string(),
  })