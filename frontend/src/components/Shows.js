import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer"
import Show from "./Show";
import Recommendation from "./Recommendation";
import Result from "./Result"
import Feed from "./Feed"
import styles from "./Shows.module.css"
import axios from "axios"
import { connect } from "react-redux";
import woori2 from '../images/wayg.png'
import sunguri from '../images/sunguri.png'
import Loading from './Loading'
import LoadingPink from '../images/LoadingPink.png';
import Doori from './LoadingPink'

function Shows({load, search, scrapPlace ,likeFeed, myFeed, counter}) {
  

  const [items, setItems] = useState([])

  useEffect(() => {
    if (likeFeed) {
      const fetchLikeFeeds = async () => {
        try {
            const response = await axios.get(
              process.env.REACT_APP_HOST+`feed/myLikeList`,{
                params: {
                  page: 0,
                  size: 10,
                  userNo: counter.userNo,
                }
              }
              
              );
            console.log(response.data)
            setItems(response.data.myLikeList.content)
          } catch (e) {
            
          }
        };
      fetchLikeFeeds();
    }
    else if (myFeed) {
      const fetchMyFeeds = async () => {
        try {
          const response = await axios.get(
            process.env.REACT_APP_HOST+`feed/myFeed`,{
              params: {
                page: 0,
                size: 10,
                userNo: counter.userNo,
              }
            }
           
            
            );
          console.log(response.data)
          setItems(response.data.myFeedList.content)
        } catch (e) {
  
        }
      }
      fetchMyFeeds()
    }
    else if (scrapPlace) {
      const fetchMyPlaces = async () => {
        try {
          const response = await axios.get(
            process.env.REACT_APP_HOST+`place/myScrapList?`,{
              params: {
                page: 0,
                size: 10,
                userNo: counter.userNo,
              }
            }
            
          );
          console.log(response.data)
          setItems(response.data.myScrapList.content)
        } catch (e) {
  
        }
      }
      fetchMyPlaces()
    }
    else if (search) {
      console.log('search')
      // setItems(counter.results)
    }
  },[])

  const isEmptyObj = (obj) => {
    if(obj.constructor === Object
        && Object.keys(obj).length === 0)  {
      return true;
    }
    return false;
  }



  return (
    <div className="">
      {myFeed ? 
        <>
          <h2>내가 작성한 피드</h2>
          <div className={styles.shows_list}>
            {items.map((item,idx) => (
              <Feed {...item} key={idx}/>
            ))}
          </div>
        </> : null}
      {likeFeed ? 
        <>
          <h2>내가 좋아요 누른 피드</h2>
          <div className={styles.shows_list}>
            {items.map((item,idx) => (
              <Feed {...item} key={idx}/>
            ))}
          </div>
        </> : null}
      {scrapPlace ? 
        <>
          <h2>내가 스크랩한 관광지</h2>
          <div className={styles.shows_list}>
            {items.map((item,idx) => (
              <Recommendation {...item} key={idx}/>
            ))}
          </div>
        </> : null}
      {search ? 
      <>
        <div className={styles.search_title}>
          <img style={{width: "60px", height: "60px"}} src={sunguri} alt="img"/>
          <h2>검색 결과</h2>
        </div>
        <div className={styles.shows_list}>
          {counter.results.map((result,idx) => (
            <Result placeName={result} key={idx} />
          ))}
        </div>
        { load ? 
        // 두리가 움직임ㅋㅋ
          <Doori/>
          : <div className={styles.shows_list}>
              {counter.results.map((result,idx) => (
                <Result placeName={result} key={idx} />
              ))}
            </div> }
        
      </> : null}
    </div>
  );
}

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});

export default connect(
  mapStateToProps,
)(Shows);