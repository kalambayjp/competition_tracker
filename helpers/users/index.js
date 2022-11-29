import { app } from "../../firebase/clientApp"
import { collection, doc, getDoc, getFirestore, query, setDoc } from "firebase/firestore";

const db = getFirestore(app);

export const createUserDoc = async (uid, user) => {
    await setDoc(doc(db, "users", uid), JSON.parse(JSON.stringify(user)))
}

export const getFriends = async (uid) => {
    
    const docRef = doc(db, "friends", uid);
    const docSnap = await getDoc(docRef);
    let friends = [];

    if (!docSnap.data()) {
        console.log('err: document not found!')
        return null;
    } else if (docSnap.data().friends.length < 1) {
        return null;
    }

    docSnap.data().friends.forEach(friend=> {
        friends.push({name: friend.displayName, value:friend.uid});
    })
    
    return friends;
}


