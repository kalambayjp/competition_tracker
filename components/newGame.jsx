import React, { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';
import AddPlayers from "./addPlayers";
import { getGames, addPlayedGame } from "../helpers/games/"
import { getFriends } from "../helpers/users";
import 'react-dropdown/style.css';

const NewGame = (props) => {
    const {user} = props;
    const [selectedGame, setSelectedGame] = useState("");
    const [gameOptions, setGameOptions] = useState([]);
    const [friends, setFriends] = useState([]);
    const [userOption, setUserOption] = useState([]);
    const [teamOneOutcome, setTeamOneOutcome] = useState(0);
    const [teamOne, setTeamOne] = useState([]);
    const [teamTwo, setTeamTwo] = useState([]);
    const [teamTwoOutcome, setTeamTwoOutcome] = useState(0);
    const [formState, setFormState] = useState("select game");
    
    useEffect(() => {
        const fetchData = async () => {
            const fetchedGameOptions = await getGames();
            const fetchedFriends = await getFriends(user.uid);
            setGameOptions(fetchedGameOptions);
            setFriends(fetchedFriends);
            setUserOption([{
                name: user.displayName, 
                value: user.uid, 
                key: user.uid
            }])
        }
        if(user) {
            fetchData()
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const gameData = {
            game: selectedGame,
            teamOne: {
                users: teamOne,
                outcome: teamOneOutcome,
            },
            teamTwo: {
                users: teamTwo,
                outcome: teamTwoOutcome,
            },
        }
        addPlayedGame(gameData);
        setResetForm(true);
    }
    
    const updateGameSelected = (val) => {
        setSelectedGame(val);
        setFormState(prevState => "add players")
    }

    return (
        <div className="box">

            <h2>
                Add a new game to your record
            </h2>
            {
                formState === "select game" ?
                <Dropdown options={gameOptions} placeholder="Select a game" value={selectedGame} onChange={updateGameSelected}/> :
                null
            }

            {
            formState === "add players" && userOption.length > 0 ? 
            <AddPlayers 
                userOption={userOption}
                friends={friends} 
                teamOne={teamOne}
                setTeamOne={setTeamOne}
                teamTwo={teamTwo}
                setTeamTwo={setTeamTwo}
            /> : ""
            }
            <div className="game-outcome">
                <p>Who won?</p>
                <div className="game-outcome-inputs">
                    <button className="game-outcome-option" onClick={() => setTeamOneOutcome(1)}></button>
                    <button className="game-outcome-option" onClick={() => setTeamTwoOutcome(1)}></button>
                </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <button type="submit" value="Submit">Add Game</button>
            </form>
        </div>
    )
}

export default NewGame;