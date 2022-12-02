import React, { useEffect, useState } from "react";
import SelectSearch from 'react-select-search';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import 'react-select-search/style.css'

const AddPlayers = (props) => {
    const {
        userOption, 
        friends, 
        teamOne, 
        setTeamOne, 
        teamTwo, 
        setTeamTwo,
        setFormState
    } = props;
    const getAllSelectedPlayerUids = () => {
        const allPlayers = [...teamOne, ...teamTwo];
        return allPlayers.map(player => player[0]);
    }
    const updateTeamOne = (val) => {
        if (teamOne.length > 0) {
            let players = [...teamOne];
            players[val[2]] = val
            setTeamOne(players);
        } else {
            setTeamOne([val]);  
        }
    }
    const updateTeamTwo = (val) => {
        if (teamTwo.length > 0) {
            let players = [...teamTwo];
            players[val[2]] = val
            setTeamTwo(players);
        } else {
            setTeamTwo([val]);
            
        }
     
    }
    const [teamOneInputs, setTeamOneInputs] = useState([
        <SelectSearch 
            key={"teamOne-playerOne"}
            options={userOption ?? null}
            onChange={updateTeamOne}
            placeholder={'add a player'}
        />
    ]);
    const [teamTwoInputs, setTeamTwoInputs] = useState([
        <SelectSearch 
            key={"teamTwo-playerOne"}
            options={friends ?? null}
            onChange={updateTeamTwo}
            placeholder={"add a player"}
            search={true}
        />
    ]);
    const updateInputField = (val, func, state) => {
        // create a new input field
        if (val) {
            // filter for players already selected
            const allPlayerUids = getAllSelectedPlayerUids();
            const availablePlayers = friends.filter(friend => !allPlayerUids.includes(friend.value[0]));
            if (state === teamOne) {
                availablePlayers.forEach((player) => player.value[2] = teamOneInputs.length);
            } else {
                availablePlayers.forEach((player) => player.value[2] = teamTwoInputs.length);
            }
            func(prevState => [...prevState, <SelectSearch 
                key={`team${state === teamOne ? "One" : "Two"}-player${state === teamOne ? teamOneInputs.length : teamTwoInputs.length}`}
                options={availablePlayers}
                onChange={state === teamOne ? updateTeamOne : updateTeamTwo}
                placeholder={"add a player"}
                search={true}
            />])
            return;
        }
        // remove an input field
        func(prevState => prevState.slice(0, prevState.length - 1));
        
        if (state === teamOne && teamOneInputs.length === state.length) {
            state.pop()
            setTeamOne(state);
            return;
        }
        if (state === teamTwo && teamTwoInputs.length === state.length) {
            state.pop();
            setTeamTwo(state);
            return
        }
    }
    const handleChangeState = () => {
        // check for duplicates
        const players = getAllSelectedPlayerUids();
        function hasDuplicates(arr) {
            return new Set(arr).size !== arr.length;
        }
        if (hasDuplicates(players)) {
            return alert("players can only be entered once, please revise form")
        } else {
            setFormState(prevState => [...prevState, "outcome"])
        }
    }

    return (
        <div className="add-players">
            {
                friends ? 
                <>
                    <div className="player-inputs">
                        {teamOneInputs}
                        <div className="add-players">
                            <FontAwesomeIcon 
                                icon={faCirclePlus} 
                                onClick={() => updateInputField(1, setTeamOneInputs, teamOne)}
                            />

                            {
                                teamOneInputs.length >= 2 ? 
                                <FontAwesomeIcon 
                                    icon={faCircleMinus} 
                                    onClick={() => updateInputField(0, setTeamOneInputs, teamOne)}
                                /> : 
                                null
                            }
                        </div>
                    </div>

                    <p> vs </p>

                    <div className="player-inputs"> 
                        {teamTwoInputs}
                            <div className="add-players">
                            <FontAwesomeIcon 
                                icon={faCirclePlus} 
                                onClick={() => updateInputField(1, setTeamTwoInputs, teamTwo)}
                            />
                            {
                                teamTwoInputs.length >= 2 ? 
                                <FontAwesomeIcon 
                                    icon={faCircleMinus} 
                                    onClick={() => updateInputField(0, setTeamTwoInputs, teamTwo)}
                                /> : 
                                null
                            }
                            </div> 
                        {
                            teamOne.length && teamTwo.length ?
                            <button onClick={() => handleChangeState()}> Click to confirm team inputs</button> : null
                        }
                    </div>
                </> :
                <p>
                    add some friends to add new games
                </p>
            }
        </div>
    )
}

export default AddPlayers