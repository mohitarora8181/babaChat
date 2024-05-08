'use client'
import { ref, onValue, push } from "firebase/database"
import { useEffect, useState } from "react"
import database from "@firebase"
import { firestore } from "@firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useSession } from "next-auth/react"

const AllUsers = ({ setRelation, relation, setList, setActiveUser, setLoading }) => {
  const { data: session } = useSession();
  const [allUsers, setallUsers] = useState([{}])
  const [searchedUsers, setSearchedUsers] = useState([])
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    onValue(ref(database, "users/"), (res) => {
      setallUsers(res.val());
    })
  }, [])


  useEffect(() => {
    setSearchedUsers(Object.values(allUsers).filter(ele => ele.email?.includes(searchUser)));
  }, [searchUser])


  const handleClick = async (user) => {
    setList([]);
    setRelation(parseInt(user.babaCode) + parseInt(session?.user.babaCode));
    setActiveUser(user)
    localStorage.setItem("relation", btoa(parseInt(user.babaCode) + parseInt(session?.user.babaCode)));
  }

  useEffect(() => {
    if (relation) {
      recvFromDB();
    }
  }, [relation])

  const recvFromDB = async () => {
    setLoading(true);
    const timestamp = new Date();
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1;
    const day = timestamp.getDate();
    const perfectDate = day.toString() + "-" + month.toString() + "-" + year;

    const docReffff = await getDocs(collection(firestore, relation.toString()));
    docReffff.forEach((doc) => {
      console.log(doc.id);
    })


    const docRef = doc(firestore, relation.toString(), perfectDate);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      reframeData(docSnap.data())
    } else {
      console.log("No such document!");
    }

    setLoading(false);
  }


  const reframeData = (obj) => {
    const data = Object.entries(obj).sort();
    const pushed = [];
    data.map((d) => {
      if (d[1].sender.babaCode == session.user.babaCode) {
        d[1].recv = false;
        d[1].sender.name = "Me"
      } else {
        d[1].recv = true;
      }
      pushed.push(d[1]);
    })
    setList(pushed)
  }

  return (
    <div className="max-sm:hidden h-[86vh] w-1/5 m-2 mt-[5rem] p-2 bg-white resize-x border-2 rounded-lg border-green-100 shadow-inner shadow-green-50 overflow-hidden">
      <div className="h-20 bg-transparent w-full flex justify-center">
        <input onChange={e => setSearchUser(e.target.value)} value={searchUser} className="p-5 my-[20px] m-2 outline-gray-400 rounded-lg border border-gray-400 w-full" placeholder="Search by email...." type="text"></input>
      </div>
      <div className="h-[88%] overflow-y-scroll overflow-x-hidden scroll-smooth scrollbar-none">
        {
          searchedUsers.length > 0 ?
            Object.values(searchedUsers).map((ele, index) => {
              if (ele.email != session?.user.email) {
                return (
                  <div key={"searched" + index} onClick={() => handleClick(ele)} className="m-3 mx-auto w-[90%] p-5 cursor-pointer select-none flex justify-start gap-5 align-middle rounded-xl bg-gray-100">
                    <img className='h-[48px] -ml-3 max-sm:h-[30px] rounded-full self-center' src={ele.image}></img>
                    <span className="self-center">
                      <h1 className="h-fit self-center whitespace-nowrap text-nowrap">{ele.name}</h1>
                      <p className="text-xs text-gray-400">{ele.email}</p>
                    </span>
                  </div>
                )
              }
            })
            :
            Object.values(allUsers).map((ele, index) => {
              if (ele.email != session?.user.email) {
                return (
                  <div key={index} onClick={() => handleClick(ele)} className="m-3 mx-auto w-[90%] p-5 py-4 cursor-pointer select-none flex justify-start gap-5 align-middle rounded-xl bg-gray-100">
                    <img className='h-[48px] -ml-3 max-sm:h-[30px] rounded-full self-center' src={ele.image}></img>
                    <span className="self-center">
                      <h1 className="h-fit self-center whitespace-nowrap text-nowrap">{ele.name}</h1>
                      <p className="text-xs text-gray-400">{ele.email}</p>
                    </span>
                  </div>
                )
              }
            })}
      </div>
    </div>
  )
}

export default AllUsers
