import React, { useEffect, useState } from "react";
import SelectSearch from 'react-select-search';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import 'react-select-search/style.css'

const AddPlayers = (props) => {
    const {userOption, friends, teamOne, setTeamOne, teamTwo, setTeamTwo} = props;
   
    const updateTeamOne = (val) => {
        setTeamOne(prevState => [... prevState, val])
    }
    const updateTeamTwo = (val) => {
        setTeamTwo(prevState => [... prevState, val])
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
    const [editplayers, setEditPlayers] = useState(true);
  
    const updateInputField = (val, func, state) => {
        if (val) {
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
                        
                        {
                            editplayers ? 
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
                            </div> : null
                        }
                    </div>

                    <p> vs </p>

                    <div className="player-inputs">
                        
                        {teamTwoInputs}

                        {
                            editplayers ? 
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
                            </div> : null
                        }

                        {
                            teamOne.length && teamTwo.length ?
                            <button onClick={() => setEditPlayers(false)}> Click to confirm team inputs</button> : null
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