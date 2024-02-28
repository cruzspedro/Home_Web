import { z } from "zod"

export const SignUpValidation = z.object({
    nome: z.string().min(2).max(50),
    email: z.string().email(),
    login: z.string().min(2).max(50),
    senha: z.string().min(8).max(20),
    telefone: z.string().min(10, {message:"Telefone inválido"}),
    nascimento: z.coerce.date().min(new Date("1900-01-01"), { message: "Too old" }),
  })

export const SignInValidation = z.object({
    login: z.string().min(2, {message:"Login muito curto"}).max(50, {message:"Login muito grande"}),
    senha: z.string().min(8, {message:"Senha muito curta"}).max(20, {message:"Senha muito longa"}),
  })