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
        teamOneNames,
        setTeamOne, 
        setTeamOneNames,
        teamTwo, 
        teamTwoNames,
        setTeamTwo,
        setTeamTwoNames,
        setFormState
    } = props;
    const updateTeamOne = (val) => {
        setTeamOne(prevState => [... prevState, val]);
        friends.forEach(friend=> {
            friend.value === val ? setTeamOneNames(prevState => [...prevState, friend.name]) : null
        });
        if (val === userOption[0].value) {
            setTeamOneNames(prevState => [...prevState, userOption[0].name])
        }
    }
    const updateTeamTwo = (val) => {
        setTeamTwo(prevState => [... prevState, val]);
        friends.forEach(friend=> {
            friend.value === val ? setTeamTwoNames(prevState => [...prevState, friend.name]) : null
        });
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
        />
    ]);
    const updateInputField = (val, func, state) => {
        // create a new input field
        if (val) {
            // filter for players already selected
            const allPlayers = [...teamOne, ...teamTwo];
            const availablePlayers = friends.filter(friend => !allPlayers.includes(friend.value));
            func(prevState => [...prevState, <SelectSearch 
                key={`team${state === teamOne ? "One" : "Two"}-player${state === teamOne ? teamOneInputs.length : teamTwoInputs.length}`}
                options={availablePlayers}
                onChange={state === teamOne ? updateTeamOne : updateTeamTwo}
                placeholder={"add a player"}
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
                            <button onClick={() => setFormState(prevState => [...prevState, "outcome"])}> Click to confirm team inputs</button> : null
                        }
                    </div>
                </>
                :
                <p>
                    add some friends to add new games
                </p>
            }
        </div>
    )
}

export default AddPlayers