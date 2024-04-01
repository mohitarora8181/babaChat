import { useSession, signIn, signOut } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";


export default function LoginButton() {
    const { data: session } = useSession()
    if (!session) {
        return (
            <div className="w-full align-middle flex justify-center">
                <p className="self-center mr-2">Not signed in</p>
                <button className="flex align-middle p-2 px-3 m-1 ml-2 rounded-full bg-gray-100 border transition-all hover:border-indigo-500" onClick={() => signIn("google")}>Sign in with <FcGoogle className="self-center text-lg ml-2" /></button>
            </div>
        );
    }
}