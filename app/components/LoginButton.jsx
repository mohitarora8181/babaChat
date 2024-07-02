import { useSession, signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import { ref, set } from "firebase/database";
import database from "@firebase";
import { useState } from "react";


export default function LoginButton() {
    const { data: session } = useSession();
    const [click, setClick] = useState(false);
    if (session) {
        let user = (session.user.email).split("@")[0];
        let unicode = "";
        for (let i = 0; i < user.length; i++) {
            unicode += user.charCodeAt(i)
        }
        session.user.babaCode = unicode;
        user = user.replaceAll(".", "").replaceAll("#", "").replaceAll("[", "").replaceAll("]", "");
        set(ref(database, 'users/' + user), session.user);
    }
    if (!session) {
        return (
            <div className="w-full align-middle flex justify-center">
                <p className="self-center mr-2">Not signed in</p>
                <button disabled={click} className={`flex dark:text-black align-middle p-2 px-3 m-1 ml-2 rounded-full bg-gray-100 border transition-all hover:border-indigo-500 ${click ? "cursor-not-allowed opacity-50 hover:border-black" : "curstor-pointer" }`} onClick={() => { setClick(true); signIn("google"); }}>Sign in with <FcGoogle className="self-center text-lg ml-2" /></button>
            </div>
        );
    }
}