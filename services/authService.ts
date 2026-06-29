import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "@/lib/firebase";

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

let confirmationResult:
ConfirmationResult;



// SIGNUP

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user =
    userCredential.user;

  await setDoc(
    doc(
      db,
      "users",
      user.uid
    ),
    {
      uid: user.uid,

      name,

      email,

      loginType:
        "email",

      createdAt:
        Date.now(),
    }
  );

  return user;
};



// LOGIN

export const loginUser =
async (
  email: string,
  password: string
) => {

  return await
  signInWithEmailAndPassword(
    auth,
    email,
    password
  );

};



// RECAPTCHA

export const generateRecaptcha =
() => {

if (
typeof window !==
"undefined"
) {

if (
!window
.recaptchaVerifier
) {

window
.recaptchaVerifier =
new RecaptchaVerifier(
auth,
"recaptcha-container",
{
size:
"invisible",

callback:()=>{
console.log(
"Recaptcha verified"
);
}
}
);

}

}

};




// SEND OTP

export const sendOTP =
async(
phone:string
)=>{

try{

generateRecaptcha();

const appVerifier=
window.recaptchaVerifier;


// Remove spaces/dashes

let formattedPhone=
phone
.replace(/\s/g,"")
.replace(/-/g,"");


// Add India code automatically

if(
!formattedPhone.startsWith("+")
){

formattedPhone=
`+91${formattedPhone}`;

}


// Validate length

if(
!/^\+\d{10,15}$/
.test(
formattedPhone
)
){

throw new Error(
"Enter valid phone number"
);

}


confirmationResult=
await signInWithPhoneNumber(
auth,
formattedPhone,
appVerifier
);

return true;

}catch(error){

console.log(
"OTP Error:",
error
);

throw error;

}

};




// VERIFY OTP

export const verifyOTP =
async(
otp:string
)=>{

const result=
await confirmationResult.confirm(
otp
);

const user=
result.user;

await setDoc(
doc(
db,
"users",
user.uid
),
{
uid:
user.uid,

phone:
user.phoneNumber,

loginType:
"phone",

createdAt:
Date.now()
}
);

return result;

};