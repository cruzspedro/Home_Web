import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {

  const isAuth = false;

  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ): (
        <>
          <section className='flex flex-1 justify-center items-center min-h-full'>
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout