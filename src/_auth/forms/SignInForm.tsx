import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignInValidation } from "@/lib/validation"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { UserSignIn } from "@/utils/userAuth"
import { useToast } from "@/components/ui/use-toast"

const SignInForm = () => {

  const navigate = useNavigate()
  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      login: "",
      senha: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    var user = {email:values.login, password:values.senha}
    console.log(user)
    UserSignIn(user).then(response => {
      if (!response?.session){
        return toast({title:'Autenticação falhou! Verifique as credenciais e tente novamente em alguns segundos.', variant:'destructive'})
      }
      console.log(response?.session)
      window.sessionStorage.setItem("data", JSON.stringify(response?.session))
      window.sessionStorage.setItem("isLoggedIn", "true")
      navigate('/profile')
    })
  }
  
  return (
    <Form {...form}>
      <div className="md:w-[320px] lg:w-[420px] flex-col mx-10 max-h-full py-5">
        <a href="/"><img className="w-full h-auto" src="/src/assets/logo_forms.png"/></a>
        <h2 className="pt-3 font-bold text-base text-zinc-800 text-center">Preencha os campos abaixo para entrar</h2>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full mt-4">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome de usuário" {...field} />
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
                  <Input type="password" placeholder="Entre com sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-2">Entre</Button>
        </form>
        <p className=" text-center pt-3"> Não possui uma conta?<Link to="/sign-up" className="ml-2 font-semibold text-slate-900">Cadastre-se</Link> </p> 
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

export default SignInForm