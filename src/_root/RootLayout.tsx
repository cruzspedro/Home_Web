import { Outlet} from 'react-router-dom'


const RootLayout = () => {
  return (

    <section className='flex-col w-full bg-gray-600'>
      <header className=" bg-opacity-10 bg-transparent h-16 mb-10 flex justify-between p-5 text-white font-bold">
        <a className='' href='/'>Meu site</a>
        <a rel="stylesheet" href="/about">
          Sobre
        </a>
        <a rel="stylesheet" href="/search-free">
          BuscaFree
        </a>
        <a rel="stylesheet" href="/imobiliarias">
          Imobiliarias
        </a>
        <a rel="stylesheet" href="/">
          Ajuda
        </a>
        <a rel="stylesheet" href="/sign-in">
          Login
        </a>
      </header>
      <div className='w-full'>
        <Outlet />  
      </div>
    </section>
  )
}

export default RootLayout