import '@styles/globals.css'

export const metadata = {
  title: "Baba Chat",
  description: "Personalised Chatting Environment"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className='bg-white'>
      <body className='bg-no-repeat'>
        <div className=" flex align-middle w-full h-[4rem] bg-slate-200 absolute">
          <a className=" text-stone-950 text-4xl font-semibold self-center ml-10 cursor-pointer" href="/">BabaChat</a>
        </div>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
