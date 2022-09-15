import {useEffect, useState} from 'react'
import ChatBot from "../components/ChatBot";
import Feeds from "../components/Feeds";
import Recommendations from "../components/Recommendations";
import CreateFeed from "../components/CreateFeed";
import styles from "./Main.module.css"

function Main() {

  const [addFeed, setAddFeed] = useState(false)
  const parentFunction = () => {
    setAddFeed((current)=> !current)
  }
  return (
    <div className="d-flex" style={{width: "100vw", height: "100vh"}}>
      <div className={styles.ChatBot}>
        <ChatBot addFeed={addFeed} parentFunction={parentFunction}/>
      </div>
      {addFeed ?  <CreateFeed></CreateFeed>:<div className="d-flex-row justify-content-center">
        <br />
        <Feeds/>
        <br />
        <Recommendations/>
      </div>}
    </div>
  );
}

export default Main;
