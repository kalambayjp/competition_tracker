import React, { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';
import AddPlayers from "./addPlayers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { getGames, addPlayedGame } from "../helpers/games/"
import { getFriends } from "../helpers/users";
import 'react-dropdown/style.css';

const NewGame = (props) => {
    const { user } = props;
    const [selectedGame, setSelectedGame] = useState("");
    const [gameOptions, setGameOptions] = useState([]);
    const [friends, setFriends] = useState([]);
    const [userOption, setUserOption] = useState([]);
    const [teamOneOutcome, setTeamOneOutcome] = useState(0);
    const [teamOne, setTeamOne] = useState([]);
    const [teamTwo, setTeamTwo] = useState([]);
    const [teamTwoOutcome, setTeamTwoOutcome] = useState(0);
    const [formState, setFormState] = useState(["select game"]);

    const clearStateVars = () => {
        setTeamOne([]);
        setTeamTwo([]);
    }
    useEffect(() => {
        const fetchData = async () => {
            const fetchedGameOptions = await getGames();
            const fetchedFriends = await getFriends(user.uid);
            setGameOptions(fetchedGameOptions);
            setFriends(fetchedFriends);
            setUserOption([{
                name: user.displayName, 
                value: [user.uid, user.displayName, 0], 
                key: user.uid
            }])
        }
        if(user) {
            fetchData()
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            selectedGame === null ||
            teamOne.length < 1 ||
            teamTwo.length < 1 ||
            (teamOneOutcome === 0 && teamTwoOutcome === 0)
        ) {
            return alert("Missing information, please revise form");
        }
        const gameData = {
            game: selectedGame,
            teamOne: {
                users: teamOne.map(player => player[0]),
                outcome: teamOneOutcome,
            },
            teamTwo: {
                users: teamTwo.map(player => player[0]),
                outcome: teamTwoOutcome,
            },
        }
        addPlayedGame(gameData);
        setFormState(['select game']);
        clearStateVars();
    }
    const updateGameSelected = (val) => {
        setSelectedGame(val);
        setFormState(prevState => [...prevState, "add players"])
    }
    const teamOneElements = teamOne.map((nameArr, i) => <p key={`teamOne-${i}`}>{nameArr[1]}</p>);
    const teamTwoElements = teamTwo.map((nameArr, i) => <p key={`teamTwo-${i}`}>{nameArr[1]}</p>);
    const stepBackInForm = () => {
        setFormState(prevState => prevState.slice(0, prevState.length - 1));
        clearStateVars();
    }
    const handleTeamOutcome = (team) => {
        if (team === "team one") {
            setTeamOneOutcome(1);
            setTeamTwoOutcome(0);
        } else if (team === "team two") {
            setTeamTwoOutcome(1);
            setTeamOneOutcome(0);
        }
    }
    return (
        <div className="box">
            <h2>
                Add a new game to your record
            </h2>
            {
                formState[formState.length - 1] === "select game" ?
                <Dropdown options={gameOptions} placeholder="Select a game" value={selectedGame} onChange={updateGameSelected}/> :
                null
            }
            {
                formState[formState.length - 1] === "add players" && userOption.length > 0 ? 
                <AddPlayers 
                    userOption={userOption}
                    friends={friends} 
                    teamOne={teamOne}
                    setTeamOne={setTeamOne}
                    teamTwo={teamTwo}
                    setTeamTwo={setTeamTwo}
                    setFormState={setFormState}
                /> : ""
            }
            {
                formState[formState.length - 1] === "outcome" ? 
                <> 
                    <div style={{width: "100%"}}>
                        <div className="add-players">
                            <div className={teamOneOutcome > 0 ? "team-names winner" : "team-names"} onClick={() => handleTeamOutcome('team one')}>
                                {teamOneElements}
                            </div>
                            <div className={teamTwoOutcome > 0 ? "team-names winner" : "team-names"} onClick={() => handleTeamOutcome('team two')}>
                                {teamTwoElements}
                            </div>
                        </div>
                        <p>Who won?</p>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <button type="submit" value="Submit">Add Game</button>
                    </form> 
                </> : null
            }
            {
                formState.length > 1 ?
                <FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={() => stepBackInForm()} /> : null
            }
        </div>
    )
}

export default NewGame;