import styles from "./ChatBot.module.css";
import {useState, useEffect} from "react";
import store from "../store"
import wayg from '../images/wayg.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ChatBot({parentFunction, addFeed, goLikeFeed, goLoadingScreen, goMyFeed}) {
  // 데이터전송 axios를 위한 useState()
  const [receives, setReceives] = useState([]);
  const [receive, setReceive] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [greeting,setGreeting] = useState(false)
  const [send, setSend] = useState("")
  const [sends, setSends] = useState([])
  const [upfunc, setUpFunc] = useState(false)
  const [story, setStory] = useState([])
  const [returnMessage, setReturnMessage] = useState(false)

  const onChange = (event) => setSend(event.target.value)
  const onSubmit = async (event) => {
    event.preventDefault();
    // if (send ==="") {
    //   return
    // }
    await setSends((currentArray) => [...currentArray,send])
    await setStory(story.concat(
      <div>
        <div className={styles.sendMessage}>{send}</div>
      </div>
    ))
    setSend("")
    await setReturnMessage((event) => (!event))
  }
  
  useEffect(() => {
    console.log("penguin")
    setGreeting((current) => !current)
  },[])
/////////////////////////////////
  useEffect(() => {
    const fetchUsers = async () => {
      console.log(sends)
      if (greeting ===true) {

      
      try {
        setError(null);
        // setUsers(null)
        setReceive('');
        setReceives([]);
        setLoading(false);
  
        const response = await axios.get(
          `http://localhost:5000/morph?text=${sends[sends.length-1]}`
        );
        console.log(response.data)
        // if (response.data[0][0]==='undefined') {
        //   return
        //     // response.data.pop()
        // }
        setReceive(() => setReceive(JSON.stringify(response.data)))
        setReceives((currentArray) => [...currentArray,receive])
        console.log(receive)
        console.log(receives)
        ///
        if (response.data[0][0] !=="undefined") {
          setStory(story.concat(
            <div>
    
              <div className={styles.receivedMessage}>{response.data}</div>
            </div>
          ))
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false)
    } 
  }

    fetchUsers();

  }, [greeting, returnMessage])




  const upAnotherFunction = () => {
    setUpFunc(current => !current)
  }
    




  if (loading) return <div>로딩중..</div>
  if (error) return <div>에러가 발생 하였습니다.</div>
  return (
    <div className={styles.chatbot}>
      <div className={styles.chatbot_title}>
        <div>wayg</div>
      </div>
      
      <br />
      {greeting ? (
        <div>
          <img className={styles.chatbot_wayg} src={wayg} alt="character" />
          <span className={styles.receivedMessage}>안녕? 추천받고 싶은 여행지가 있니?</span>
        </div> ) : null}
      
        {upfunc ? <ul className={styles.anotherFunction}>
        <li>대화 새로 시작하기</li>
        <li onClick={() => {goLoadingScreen()}}>이번달 인기피드 보러가기</li>
        <li onClick={() => {goLikeFeed();}}>내가 좋아요 누른 피드 보러가기</li>
        <li>내가 즐겨찾기한 관광지 보러가기</li>
        <li onClick={() => {goMyFeed();}}>내가 올린 피드보기</li>
        <li onClick={() => {parentFunction();}}>피드작성하기</li>

      </ul>: null}

      <div className={styles.chatting}> 
        <FontAwesomeIcon className="additionalBtn fa-2xl" onClick={upAnotherFunction} icon={faBars} />
        <form onSubmit={onSubmit}>
          <input className={styles.sendInput} onChange={onChange} value={send} type="text" placeholder="내용입력" />
          <button className={styles.chatBtn}>보내기</button>
        </form>
      </div>
      {/* 여기는 채팅 내용 ui */}
      <ul>
        <div>
          {story}
        </div>
      </ul>




      {/* <ul>
        {sends.map((send, idx) => (
            <div>
              <div className={styles.sendMessage} key={idx}>
              {send}
            </div>
            </div>
        ))}

        {receives.map((receive, idx) => (
          <div className={styles.receivedMessage} key={idx}>
            {receive}
            </div>
        ))}

      </ul> */}

    </div>
    
  );
}

export default ChatBot;