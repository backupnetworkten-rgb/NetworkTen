"use client";

import { useRouter } from "next/navigation";

import {
Box,
Typography
} from "@mui/material";

import AdminPanelSettingsRoundedIcon
from "@mui/icons-material/AdminPanelSettingsRounded";

export default function FloatingAdminButton(){

const router =
useRouter();

return(

<Box

onClick={()=>
router.push(
"/admin/login"
)
}

sx={{

position:"fixed",

right:0,

top:"50%",

transform:
"translateY(-50%)",

width:"180px",

height:"58px",

background:
"linear-gradient(135deg,#102048 0%,#08142e 100%)",

borderRadius:
"16px 0 0 16px",

display:"flex",

alignItems:"center",

justifyContent:"center",

gap:1.2,

cursor:"pointer",

zIndex:9999,

boxShadow:
"0 15px 40px rgba(0,0,0,.25)",

border:
"1px solid rgba(255,255,255,.08)",

transition:
"all .35s ease",

overflow:"hidden",

"&::before":{

content:'""',

position:"absolute",

top:0,

left:0,

width:"4px",

height:"100%",

background:"#8BC53F"

},

"&:hover":{

width:"210px",

background:
"linear-gradient(135deg,#8BC53F,#74ab35)",

boxShadow:
"0 20px 50px rgba(139,197,63,.35)"

}

}}

>

<AdminPanelSettingsRoundedIcon
sx={{
fontSize:28,
color:"#fff"
}}
/>

<Box>

<Typography
sx={{
color:"#fff",
fontWeight:800,
fontSize:"13px",
lineHeight:1.2
}}

>

Admin Panel </Typography>

<Typography
sx={{
color:
"rgba(255,255,255,.65)",
fontSize:"10px"
}}

>

Manage Products </Typography>

</Box>

</Box>

);

}
