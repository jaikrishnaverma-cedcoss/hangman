import React, { memo } from 'react'

const Keyboard = (props) => {
    const btnHandler=(e)=>{
        if( e.target.classList.contains("btnDisabled")){
            return false
        }
        e.target.classList.add("btnDisabled")
      return true
    }
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return (
        
            <div className={`row wrap full brd p4 m2 hm0 flexJCC ${props.keyboard}`} style={{ backgroundColor: "grey" }}>
                {
                    alphabet.map((x, i) => {
                        return <button key={x+i+props.index}  className="kys p1 m1 line brd row flexAIC flexJCC" onClick={(e)=>{btnHandler(e)&& props.keypressed(x)}}>{x}</button>
                    })
                }
            </div>

    )
}

export default memo(Keyboard)