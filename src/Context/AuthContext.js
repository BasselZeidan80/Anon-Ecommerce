import { createContext, useEffect, useState } from "react"

export const AuthContext= createContext()

export default function AuthContextProvider ({children}) {

const [Token, setToken] = useState(null)
const [user, setUser] = useState({})


//each refresh will lose data 

useEffect( ()=>{
    console.log("refresh");

    const value = localStorage.getItem('tkn')
    const UserData = localStorage.getItem("userData")
    if(value !== null || UserData!== null){
        setToken(value)
        setUser(UserData)
    }
} , [] )

  return <AuthContext.Provider value={{myToken: Token , setToken , setUser , user}}>

              {children}
  </AuthContext.Provider>
}
