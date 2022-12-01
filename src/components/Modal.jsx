import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
const Modal = ({ state, setState, nextAction , initialState }) => {
  return (
    <>
      <div className={styles.darkBG} />
      <div className={styles.centered}>
        <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={() => setState({ ...state, isOpen: false })}>

<RiCloseLine style={{ marginBottom: "-3px" }} />
</button>
{  (state.currentIndex==state.words.length-1)?<div className="col full flexAIC">
<h1 className="m3 p2 hp0 full" style={{color:"green",textAlign:"center"}}>ALL LEVEL COMPLETED</h1>
<button  className={styles.deleteBtn} onClick={() => setState({...initialState})}>
                  RESET GAME
</button>
</div>:
     <>          
     <div className={styles.modalHeader}>
            <h5 className={`${styles.heading}  ${(state.message !== "Winner")?styles.deleteBtn:styles.cancelBtn}`} style={{ borderRadius: "0px" }}>You {(state.message == "Winner") ? "Win" : "Lose"} Level {state.currentIndex+1}</h5>
          </div>
         
          <div className={styles.modalContent}>
            <div className="row flexAIC p1 flexJCC">
              {
                state.current.map(x => <button key={x.text+x.visible} className="line brd  dbg txtbox">{x.text}</button>)
              }


            </div>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              
              {
              (state.message !== "Winner") ? <button className={styles.deleteBtn}
                onClick={() => nextAction()}
              >
                REPLAY
              </button>
                :
                <button
                  className={styles.cancelBtn}
                  onClick={() => nextAction()}
                >
                  NEXT LEVEL
                </button>}
            </div>
          </div>
          </>
}
        </div>
      </div>
    </>
  );
};

export default Modal;