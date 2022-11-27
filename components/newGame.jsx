import React, { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';
import SelectSearch from 'react-select-search';
import { getGames, addPlayedGame } from "../helpers/games/"
import { getFriends } from "../helpers/users"
import 'react-dropdown/style.css';
import 'react-select-search/style.css'



const NewGame = (props) => {
    const {user} = props;
    const [selectedGame, setSelectedGame] = useState("");
    const [options, setOptions] = useState([]);
    const [friends, setFriends] = useState();
    const [teamOne, setTeamOne] = useState([])
    const [teamTwo, setTeamTwo] = useState([])
    const [teamOneOutcome, setTeamOneOutcome] = useState(0);
    const [teamTwoOutcome, setTeamTwoOutcome] = useState(0);
    const [teamOneScore, setTeamOneScore] = useState('');
    const [teamTwoScore, setTeamTwoScore] = useState('');

    const defaultOption = [
        {
            name: user ? user.displayName : "",
            value: user ? user.displayName : ""
        }
    ]

    useEffect(() => {
        const fetchData = async () => {
            const gameOptions = await getGames();
            const friendOptions = await getFriends(user.uid);
            setOptions(gameOptions);
            setFriends(friendOptions);
        }
        if(user) {
            fetchData()
        }
    }, [user])

    const handleScoreInput = (value, func) => {
        if(isNaN(value)) {
            alert("Score inputs must be numbers")
            return;
        }
        func(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const gameData = {
            game: selectedGame,
            teamOne: {
                users: [teamOne],
                outcome: teamOneOutcome,
                score: teamOneScore
            },
            teamTwo: {
                users: [teamTwo],
                outcome: teamTwoOutcome,
                score: teamTwoScore
            },
        }
        addPlayedGame(user.uid, gameData);
    }

    return (
        <div className="box">
            
            <Dropdown options={options} placeholder="Select a game" value={selectedGame} onChange={setSelectedGame}/>
            <div className="add-players">
                {
                    friends ? 
                    <>
                        <SelectSearch 
                            options={defaultOption} 
                            placeholder="add a player" 
                            value={teamOne}
                            onChange={setTeamOne}
                        />

                        <p> vs </p>

                        <SelectSearch 
                            options={friends} 
                            search={true} 
                            placeholder="add a player"
                            value={teamTwo}
                            onChange={setTeamTwo}
                        />
                    </>
                    :
                    <p>
                        add some friends to add new games
                    </p>
                }
            </div>
            <div className="game-outcome">
                <p>Who won?</p>
                <div className="game-outcome-inputs">
                    <button className="game-outcome-option" onClick={() => setTeamOneOutcome(1)}></button>
                    <button className="game-outcome-option" onClick={() => setTeamTwoOutcome(1)}></button>
                    
                </div>
            </div>
            <div className="game-outcome">
                <p>Add Score?</p>
                <div className="game-outcome-inputs">
                    <input type="text" value={teamOneScore} onChange={(e) => handleScoreInput(e.target.value, setTeamOneScore)}></input>
                    <input type="text" value={teamTwoScore} onChange={(e) => handleScoreInput(e.target.value, setTeamTwoScore)}></input>
                </div>
            </div>
                
            <form onSubmit={(e) => handleSubmit(e)}>
                <button type="submit" value="Submit">Add Game</button>
            </form>
            
            
        </div>
    )
}

export default NewGame;