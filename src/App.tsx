import AuthLayout from './_auth/AuthLayout'
import MessageForm from './_auth/forms/MessageForm'
import PasswordForm from './_auth/forms/PasswordForm'
import SacForm from './_auth/forms/SacForm'
import SignInForm from './_auth/forms/SignInForm'
import SignUpForm from './_auth/forms/SignUpForm'
import RootLayout from './_root/RootLayout'
import About from './_root/pages/About'
import Favorites from './_root/pages/Favorites'
import Home from './_root/pages/Home'
import Imobiliarias from './_root/pages/Imobiliarias'
import MyAccount from './_root/pages/MyAccount'
import Perfil from './_root/pages/Perfil'
import SearchFree from './_root/pages/SearchFree'
import Terms from './_root/pages/Terms'
import './globals.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <main className='flex h-screen'>
      <Routes>
        { /* public routes */ }
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/forgot-password' element={<PasswordForm />} />
          <Route path='/message' element={<MessageForm />} />
          <Route path='/sac' element={<SacForm />} />
        </Route>



        { /* private routes */ }
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route index element={<About />} />
          <Route index element={<SearchFree />} />
          <Route index element={<Imobiliarias />} />
          <Route index element={<MyAccount />} />
          <Route index element={<Favorites />} />
          <Route index element={<Terms />} />  
          <Route index element={<Perfil />} />  
        </Route>
        

      </Routes>
    </main>
  )
}

export default App
