"use client";

import { Box } from "@mui/material";

import AdminSidebar
from "./AdminSidebar";

import AdminHeader
from "./AdminHeader";

interface AdminLayoutProps{

title:string;

children:
React.ReactNode;

}

export default function AdminLayout({

title,

children

}:AdminLayoutProps){

return(

<Box

sx={{

display:"flex",

minHeight:"100vh",

background:
"#f5f7fb"

}}

>

{/* SIDEBAR */}

<AdminSidebar />

{/* MAIN AREA */}

<Box

sx={{

ml:"290px",

width:
"calc(100% - 290px)",

minHeight:"100vh",

display:"flex",

flexDirection:"column"

}}

>

{/* HEADER */}

<AdminHeader
title={title}
/>

{/* CONTENT */}

<Box

sx={{

flex:1,

p:{
xs:2,
md:4
},

background:
"linear-gradient(180deg,#f8fafc 0%,#f5f7fb 100%)"

}}

>

<Box

sx={{

maxWidth:"1600px",

mx:"auto"

}}

>

{children}

</Box>

</Box>

</Box>

</Box>

);

}
