import '@styles/globals.css'
import Providers from './components/Providers'
import SignOutButton from './components/SignOutButton';


export const metadata = {
  title: "Baba Chat",
  description: "Personalised Chatting Environment - Developed By Mohit Arora 9667067062"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className='bg-white dark'>
      <head>
        <link rel="icon" href="images/baba-logo-01.png" sizes="any" />
        <meta name='description' content='Developed By Mohit Arora 9667067062'></meta>
        </head>
      <body className='bg-no-repeat'>
        <Providers>
          <div className="flex align-middle w-full h-[4rem] bg-slate-200 absolute dark:bg-slate-800 justify-between">
            <a className=" text-stone-950 text-4xl max-sm:text-2xl font-semibold mx-auto self-center max-sm:ml-15 cursor-pointer dark:text-white flex gap-x-2" href="/">
              <img className='block max-sm:hidden bg-gray-300 rounded-full h-[3rem]' src='images/baba-logo-01.png'></img>
              BabaChat
            </a>
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
