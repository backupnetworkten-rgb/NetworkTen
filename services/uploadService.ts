import {
ref,
uploadBytes,
getDownloadURL
} from "firebase/storage";

import { storage }
from "@/lib/firebase";

export const uploadImage =
async(
file:File
)=>{

const fileName=
`products/${Date.now()}-${file.name}`;

const storageRef=
ref(
storage,
fileName
);

await uploadBytes(
storageRef,
file
);

const url=
await getDownloadURL(
storageRef
);

return url;

};