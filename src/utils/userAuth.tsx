import { supabase } from "./supabase";

async function UserSignUp(user: {email:string, password: string}){
    try {
        let { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password
        })
      
        if (error) {
            throw error
        }
    
        if (data){
            console.log(data)
            return data
        }
    } catch (error) {
        return {user: null, session: null, weakPassword: null}
    }
}

async function UserSignIn(user: {email:string, password: string}){
    try {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password
        })
      
        if (error) {
            throw error
        }
    
        if (data){
            console.log(data)
            return data
        }
    } catch (error) {
        return {user: null, session: null, weakPassword: null}
    }
    
}

export {UserSignUp, UserSignIn}; 