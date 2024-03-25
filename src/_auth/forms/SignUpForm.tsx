import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpValidation } from "@/lib/validation"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { UserSignUp } from "@/utils/userAuth"
import { useToast } from "@/components/ui/use-toast"
import userCreation from "@/utils/userCreation"

const SignUpForm = () => {

  const navigate = useNavigate();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      nome: "",
      email: "",
      login: "",
      senha: "",
      telefone: "",
      nascimento: "",
    },
  });

  //  2. Define a submit handler.
 function onSubmit(values: z.infer<typeof SignUpValidation>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  var user = {email:values.email, password:values.senha}
  console.log(user)
  UserSignUp(user).then(response => {
    if (!response?.session){
      return toast({title:'Autenticação falhou! Verifique as credenciais e tente novamente em alguns segundos.', variant:'destructive'})
    }
    console.log(response?.session)
    userCreation({id:response?.user?.id, nome:values.nome, email:values.email, telefone:values.telefone, nascimento:values.nascimento})
    window.sessionStorage.setItem("data", JSON.stringify(response?.session))
    window.sessionStorage.setItem("isLoggedIn", "true")
    navigate('/profile')
  })
  
}

  return (
    <Form {...form}>
      <div className="md:w-[320px] lg:w-[420px] flex-col mx-10 max-h-full py-5">
      <a href="/"><img className="w-full h-auto" src="/src/assets/logo_forms.png"/></a>
        <h2 className="pt-3 font-bold text-base text-zinc-800 text-center">Preencha os campos abaixo para se cadastrar</h2>
        <form id="my-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full mt-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Seu endereço de e-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder="Seu Nome de Usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Escolha uma senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="Seu telefone completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nascimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Informe sua data de nascimento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button form="my-form" type="submit" className="mt-2">Cadastre-se</Button>
        </form>
        <p className="text-center pt-3"> Já possui uma conta?<Link to="/sign-in" className="ml-2 font-semibold text-slate-900">Entre</Link> </p> 
        <p className="text-center py-3 separator">ou</p>
        <div className="pb-5 flex items-center justify-center dark:bg-gray-800 w-full text-center">
          <button className="items-center justify-center px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 w-full">
              <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
              <span>Entre com Google</span>
          </button>
        </div>
      </div>
    </Form>
  )
}

export default SignUpForm