import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  GoogleAuthProvider,
  signInWithPopup,
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
    recaptchaWidgetId: number | undefined;
    grecaptcha: any;
  }
}

let confirmationResult: ConfirmationResult | undefined;



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



// GOOGLE LOGIN

export const loginWithGoogle = async () => {

  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(
    auth,
    provider
  );

  const user = result.user;

  // Save/update user in Firestore

  await setDoc(
    doc(
      db,
      "users",
      user.uid
    ),
    {
      uid: user.uid,

      name: user.displayName,

      email: user.email,

      photoURL: user.photoURL,

      loginType: "google",

      createdAt: Date.now(),
    },
    { merge: true }
  );

  return result;

};



// RECAPTCHA

// Renders the invisible widget ONCE per page load, and
// stores its widgetId. On subsequent OTP attempts we
// reset the same widget via grecaptcha.reset() rather
// than destroying/re-rendering it — destroying the DOM
// node while Google's script still holds references to
// it causes "Cannot read properties of null" errors.

export const generateRecaptcha = async () => {

  if (typeof window === "undefined") return;

  if (!window.recaptchaVerifier) {

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",

        callback: () => {
          console.log("Recaptcha verified");
        }
      }
    );

    window.recaptchaWidgetId =
      await window.recaptchaVerifier.render();

  } else if (
    window.grecaptcha &&
    window.recaptchaWidgetId !== undefined
  ) {

    // Reset the existing widget so it can be used again
    // for a new sendOTP attempt (invisible reCAPTCHA
    // tokens are single-use).

    window.grecaptcha.reset(
      window.recaptchaWidgetId
    );

  }

};



// SEND OTP

export const sendOTP =
async(
phone:string
)=>{

try{

// Ensure widget exists (first time) or reset it
// (subsequent attempts) before requesting a code

await generateRecaptcha();

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

if(!confirmationResult){

throw new Error(
"Please request an OTP first."
);

}

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

// Clear so a stale confirmationResult can't be
// reused if the user tries phone login again later

confirmationResult=undefined;

return result;

};