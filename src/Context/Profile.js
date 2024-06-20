import { createContext, useState } from "react";

export let profileContext = createContext()

 
 export default function ProfileContextProvider({children}) {
    const [userName, setUserName] = useState('Bassel')
    console.log(userName);
   return <profileContext.Provider value={{MyName: userName}} >
    {children}
   </profileContext.Provider>
 }
 