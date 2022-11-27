import { app } from "../../firebase/clientApp"
import { doc, getFirestore, setDoc, collection, query, where, getDocs, updateDoc, arrayUnion } from "firebase/firestore";


const db = getFirestore(app);

export const getGames = async () => {
    const q = query(collection(db, "competitions"));
    let options = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        options.push({value: doc.id, label: doc.data().name});
    });

    return options;
}

export const addPlayedGame = (uid, gameData) => {
    const docRef = doc(db, "gamesPlayed", uid);
    updateDoc(docRef, {gamesPlayed: arrayUnion(gameData)});
}