import Feed from "./Feed";
import axios from "axios";
import styles from "./Feeds.module.css"
import React, {useEffect, useState} from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {useSelector} from 'react-redux';

function Feeds() {

  const [feeds, setFeeds] = useState([])
  const userNo = useSelector(state => {
    return state.counter.value
  })
  
  useEffect(()=> {

    const fetchFeeds = async () => {
      try {
          const response = await axios.get(process.env.REACT_APP_HOST+'feed'
          ,{
            params: {
              page: 2,
              size: 10,
              userNo: userNo,
            }
          });
          console.log(response.data)
          setFeeds(response.data.feedList.content)
        } catch (e) {
          
        }
      };
    fetchFeeds();
  },[])

  return (
    <div className="" style={{width: "70vw", height: "40vh"}}>
      <h2>사용자들이 올린 피드</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: false }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {feeds.map((feed,idx) => (
          <SwiperSlide key={idx}>
            <Feed {...feed} key={idx}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Feeds;