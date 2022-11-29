import { app } from "../../firebase/clientApp"
import { doc, getFirestore, setDoc, collection, query, where, getDocs, updateDoc, arrayUnion, increment, getDoc } from "firebase/firestore";


const db = getFirestore(app);

export const getGames = async () => {
    const q = query(collection(db, "competitions"));
    let options = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        options.push({value: doc.id, label: doc.data().name, key: doc.id});
    });

    return options;
}
const getWinningUids = (teamOne, teamTwo) => {
    const winningTeam = teamOne.outcome > 0 ? teamOne : teamTwo;
    const playerUids = [...winningTeam.users];
    return playerUids;
}

export const addPlayedGame = (gameData) => {
    
    const allUsers = [...gameData.teamOne.users, ...gameData.teamTwo.users];
    const winningPlayers = getWinningUids(gameData.teamOne, gameData.teamTwo);

    allUsers.forEach(async user => {
        const gamesDocRef = doc(db, "gamesPlayed", user);
        await updateDoc(gamesDocRef, {gamesPlayed: arrayUnion(gameData)});

        const recordDocRef = doc(db, "records", user);
        if (winningPlayers.includes(user)) {
            await updateDoc(recordDocRef, {wins: increment(1)})
            console.log(`gave user: ${user} a W`)
        } else {
            console.log(`gave user: ${user} an L`)
            await updateDoc(recordDocRef, {losses: increment(1)})
        }
    })
}

export const getRecord = async (uid) => {
    const docRef = doc(db, "records", uid);
    const docSnap = await getDoc(docRef)
    const record = {
        wins: docSnap.data().wins,
        losses: docSnap.data().losses
    }
    
    return record;
}