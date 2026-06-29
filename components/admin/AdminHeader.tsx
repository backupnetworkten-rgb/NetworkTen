"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
Box,
Typography,
Avatar,
IconButton,
Badge,
Menu,
MenuItem,
TextField,
InputAdornment,
Chip
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

interface AdminHeaderProps{
title:string;
}

export default function AdminHeader({
title
}:AdminHeaderProps){

const router =
useRouter();

const [anchorEl,setAnchorEl] =
useState<null | HTMLElement>(
null
);

const open =
Boolean(anchorEl);

const handleLogout = ()=>{

localStorage.removeItem(
"adminLoggedIn"
);

router.push(
"/admin/login"
);

};

const today =
new Date().toLocaleDateString(
"en-IN",
{
day:"numeric",
month:"long",
year:"numeric"
}
);

return(

<Box

sx={{

height:"88px",

display:"flex",

alignItems:"center",

justifyContent:"space-between",

px:4,

background:
"rgba(255,255,255,.95)",

backdropFilter:
"blur(12px)",

borderBottom:
"1px solid #edf1f7",

position:"sticky",

top:0,

zIndex:1000

}}

>

{/* LEFT */}

<Box>

<Typography

sx={{

fontSize:"12px",

fontWeight:700,

letterSpacing:"1px",

textTransform:"uppercase",

color:"#8BC53F",

mb:.5

}}

>

NetworkTen Admin

</Typography>

<Typography

sx={{

fontSize:"28px",

fontWeight:900,

color:"#102048",

lineHeight:1

}}

>

{title}

</Typography>

</Box>

{/* RIGHT */}

<Box

sx={{

display:"flex",

alignItems:"center",

gap:2

}}

>

<TextField

size="small"

placeholder="Search..."

InputProps={{

startAdornment:(

<InputAdornment
position="start"

>

<SearchRoundedIcon
sx={{
color:"#98A2B3"
}}
/>

</InputAdornment>

)

}}

sx={{

width:"260px",

"& .MuiOutlinedInput-root":{

borderRadius:"14px",

background:"#fff"

}

}}

/>

<Chip

icon={ <CalendarMonthRoundedIcon />
}

label={today}

sx={{

height:"40px",

background:"#fff",

border:
"1px solid #edf1f7"

}}

/>

<IconButton

sx={{

background:"#fff",

border:
"1px solid #edf1f7",

width:"44px",

height:"44px"

}}

>

<Badge

badgeContent={3}

color="error"

>

<NotificationsRoundedIcon />

</Badge>

</IconButton>

<Box

onClick={(e)=>
setAnchorEl(
e.currentTarget
)
}

sx={{

display:"flex",

alignItems:"center",

gap:1.5,

background:"#fff",

border:
"1px solid #edf1f7",

borderRadius:"16px",

px:1.5,

py:1,

cursor:"pointer"

}}

>

<Avatar

sx={{

width:42,

height:42,

background:"#8BC53F",

color:"#08142e",

fontWeight:800

}}

>

A

</Avatar>

<Box>

<Typography

sx={{

fontWeight:800,

fontSize:"14px",

color:"#102048"

}}

>

Admin

</Typography>

<Typography

sx={{

fontSize:"11px",

color:"#667085"

}}

>

Administrator

</Typography>

</Box>

</Box>

<Menu

anchorEl={anchorEl}

open={open}

onClose={()=>
setAnchorEl(null)
}

PaperProps={{

sx:{

borderRadius:"14px",

minWidth:"180px"

}

}}

>

<MenuItem>

<PersonRoundedIcon
sx={{
mr:1
}}
/>

Profile

</MenuItem>

<MenuItem
onClick={
handleLogout
}
>

<LogoutRoundedIcon
sx={{
mr:1
}}
/>

Logout

</MenuItem>

</Menu>

</Box>

</Box>

);

}
