import '@styles/globals.css'
import Providers from './components/Providers'
import SignOutButton from './components/SignOutButton';

export const metadata = {
  title: "Baba Chat",
  description: "Personalised Chatting Environment"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className='bg-white dark'>
      <body className='bg-no-repeat'>
        <Providers>
          <div className=" flex align-middle w-full h-[4rem] bg-slate-200 absolute dark:bg-slate-800 justify-between">
            <a className=" text-stone-950 text-4xl font-semibold self-center ml-40 max-sm:ml-5 cursor-pointer dark:text-white" href="/">BabaChat</a>
            <SignOutButton />
          </div>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
