import React, { useCallback, useState } from 'react'
import Keyboard from './Keyboard'
import { useEffect } from 'react'
import Modal from './Modal'
const Main = () => {
    const initial = {
        words: [
            { text: "DOG", hint: "A common domesticated animal that is color-blind is the" },
             { text: "GIRAFFE", hint: "The tallest living animal is the" },
             { text: "CAT", hint: "A common domesticated animal that cannot taste sweet is the" },
            //  { text: "CATFISH", hint: "The fish that can taste with its whole body is the" },
             { text: "HUMAN", hint: "The only animal that sleeps on its back is" },
            //  { text: "BAT", hint: "The only mammal that can fly is the" },
            //  { text: "CHINA", hint: "Goldfish originally belongs to" },
            //  { text: "BULL", hint: "The male of a cow is called a" },
            ].sort(() => (Math.random() > 0.5) ? 1 : -1),
        currentIndex: 0,
        turn: 1,
        current: [],
        wrong: 1,
        message: "",
        isOpen: false
    }

    useEffect(() => {
        state.current = state.words[state.currentIndex].text.split('').map(x => { return { text: x, visible: "hideChar" } })
        setState({ ...state })
    }, [])

    let [state, setState] = useState(initial)

    // Check Exist and Update visibility of charcater
    const exist = (keyChar) => {
        let flag = false
        state.current.map((character, i) => {
            if (character.text == keyChar) {
                state.current[i].visible = "showChar"
                flag = true
            }
        })
        return flag
    }

    const keypressed =useCallback((key)=>{
        console.log(exist(key))
        if (exist(key)) {
        } else if(state.message == ''){
            state.wrong++
             state.turn++
        }

        if (state.turn > 6) {
            state.message = "Loser"
            state.isOpen = true
        }
        if (state.current.filter(x => x.visible == "hideChar").length == 0) {
            state.message = 'Winner'
            state.isOpen = true
        }


        setState({ ...state })},[state])

    // modal button controller
    const nextAction = () => {
        if (state.message == "Winner") {
        (state.currentIndex==state.words.length-1)?state.currentIndex=1:state.currentIndex++
            state.turn = 1
            state.current = state.words[state.currentIndex].text.split('').map(x => { return { text: x, visible: "hideChar" } })
            state.wrong = initial.wrong
            state.message = ''
        }
        if (state.message == "Loser") {
            state.turn = 1
            state.current = state.words[state.currentIndex].text.split('').map(x => { return { text: x, visible: "hideChar" } })
            state.wrong = initial.wrong
            state.message = ''
        }
        state.isOpen = false
        setState({ ...state })
    }

    console.log("state", state)
    
    return (
        <>
            <div className='w40  m1 brd row flexAIC flexJCC side1'>
                <img src={`${state.wrong}.png`} />
            </div>
            <div className='w50 col flexSB side2'>
                <div className="col full flexAIC flexSB">

                    <div className="col full  p4 hm1 hp1 flexAIC ">
                    <h2 style={{fontSize:"30px",color:"red"}}>LEVEL:{state.currentIndex+1}</h2>
                        <h2 style={{fontSize:"30px",color:"orange"}}>{(state.turn < 8) ? 'Remaning: ' + (7-state.turn) : state.message}</h2>
                        <p className='m1'>Hint: {state.words[state.currentIndex].hint}</p>
                    </div>
                    <div className="row full flexJCC p1">
                        {
                            state.current.map((x, i) => <div key={x+i} className=" m1 line brd row p2 flexAIC flexJCC txtbox txtbox1 " style={{ borderColor: "black" }}>{(x.visible == "hideChar") ? "_" : x.text}</div>)
                        }
                    </div>
                </div>
                <Keyboard keypressed={keypressed} keyboard={(state.message === "") ? "keyboard" : ""} index={state.message}   />
            </div>
            {state.isOpen && <Modal state={state} setState={setState} nextAction={nextAction} initialState={initial} />}

        </>
    )
}

export default Main