"use client";

import {
createContext,
useContext,
useEffect,
useState
} from "react";

interface User{
uid:string;
name:string;
email:string;
}

interface AuthType{
user:User|null;
login:(u:User)=>void;
logout:()=>void;
}

const AuthContext=
createContext<AuthType>({
user:null,
login:()=>{},
logout:()=>{}
});

export function AuthProvider({

children

}:{
children:React.ReactNode
}){

const [user,setUser]=
useState<User|null>(null);

useEffect(()=>{

const saved=
localStorage.getItem(
"user"
);

if(saved){

setUser(
JSON.parse(saved)
);

}

},[]);

const login=(u:User)=>{

localStorage.setItem(
"user",
JSON.stringify(u)
);

setUser(u);

};

const logout=()=>{

localStorage.removeItem(
"user"
);

setUser(null);

window.location.href="/";

};

return(

<AuthContext.Provider

value={{

user,

login,

logout

}}

>

{children}

</AuthContext.Provider>

);

}

export const useAuth=
()=>useContext(
AuthContext
);