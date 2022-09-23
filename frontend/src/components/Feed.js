import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Feed.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

function Feed({feedNo, feedTitle, feedContent, feedNickname, userNo, feedFiles, feedLike,feedLikeYn}) {
  const [feed, setFeed] = useState({
    feedNo: {feedNo}.feedNo,
    feedTitle: {feedTitle}.feedTitle,
    feedContent: {feedContent}.feedContent,
    feedNickname: {feedNickname}.feedNickname, 
    userNo: {userNo}.userNo, 
    feedFiles: {feedFiles}.feedFiles, 
    feedLike: {feedLike}.feedLike, 
    feedLikeYn: {feedLikeYn}.feedLikeYn,
  })
  const [detailContent,setDetailContent] = useState('')
  const [handle, setHandle] = useState(false);
  const handleClose = () => setHandle(false);

  const plusLike = async () => {
    try {
        const response = await axios.post(
          process.env.REACT_APP_HOST+`feed/like`
          ,{
          // userNo: {userNo}.userNo,
          userNo: 1,
          feedNo: {feedNo}.feedNo
        });
        console.log(response.data)
        if (response.data.message === 'success'){
          feed.feedLikeYn = true;
          setFeed(feed)
          console.log('aaaaa')
          
        }
      } catch (e) {
        
      }
  };
  

  const deleteLike = async () => {
    try {
        const response = await axios.delete(
          process.env.REACT_APP_HOST+`feed/like/1`
          
          ,
          {
          params: {
            userNo: 1,
            feedNo: {feedNo}.feedNo,
          }
        });
        console.log(response.data)
        if (response.data.message === 'success'){
          feed.feedLikeYn = false;
          setFeed(feed)
          console.log('ww')
          
        }
      } catch (e) {
        
      }
    };

  // const shareKakaoLink = () => {
  //   window.Kakao.Share.sendCustom({
  //     templateId: 83280,
  //     templateArgs: {
  //       title: '제목 영역입니다.',
  //       description: '설명 영역입니다.',
  //     },
  //   });
  // };

  // const shareKakaoLink = () => {
  //   window.Kakao.Share.sendDefault({
  //     objectType: 'feed',
  //     content: {
  //       title: '여행지 이름',
  //       description: '여행지 설명',
  //       imageUrl:
  //         'https://j7c202.p.ssafy.io/static/media/wayg2.ffea7454ef416b4ccb29.png',
  //       link: {
  //         mobileWebUrl: 'https://developers.kakao.com',
  //         webUrl: 'https://developers.kakao.com',
  //       },
  //     },
  //     itemContent: {
  //       // profileText: 'Kakao',
  //       // profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
  //     },
  //     social: {
  //       likeCount: 10,
  //     },
  //     // buttons: [
  //       // {
  //       //   title: '웹으로 이동',
  //       //   link: {
  //       //     mobileWebUrl: 'https://developers.kakao.com',
  //       //     webUrl: 'https://developers.kakao.com',
  //       //   },
  //       // },
  //     // ],
  //   });
  // }

  const share = () => {
    // shareKakaoLink()
    console.log('share')
  }
  
  const onClickFeed = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_HOST+`feed/view?userNo=${userNo}&feedNo=${feedNo}`
      )
      console.log(response.data.feed.feedContent)
      await setDetailContent(response.data.feed.feedContent)
      await setHandle(true)
    }catch (e) {
      console.log(e)
    }
  } 

  return (
    // for map 사용
    <>
    <div onClick={onClickFeed} className={styles.feed}>
      <div>
        <img className={styles.feed_img} src={feed.feedFiles} alt='img' />
        <div>
          <div className={styles.feed_box}>
            {feed.feedLikeYn ? 
              <FontAwesomeIcon onClick={deleteLike} className={styles.likeY} icon={solidHeart} /> 
              : <FontAwesomeIcon onClick={plusLike} icon={faHeart} />} 
            &nbsp;<small>{feed.feedLike}</small>
            &nbsp;&nbsp;
            <FontAwesomeIcon onClick={share()} icon={faPaperPlane} />
          </div>
          <div className={styles.feed_box}> 
          <p className={styles.feed_writer}>{feed.feedNickname}</p>&nbsp;&nbsp;
          <p className={styles.feed_title}>{feed.feedTitle}</p>
          </div>
        </div>
      </div>
    </div>
    {/* 모달 */}
    <Modal show={handle} onHide={handleClose}>
    <div className={styles.show}>
      <div>{feedFiles}
        <img className={styles.show_img} src={feedFiles} alt='img' />
        <div>
          <div className={styles.show_box}>
            <div>
                <FontAwesomeIcon icon={faHeart} />
                <span> </span>
                <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <p className={styles.show_writer}>작성자</p>
          <div className={styles.show_box}>
            <p>{feedNickname}</p>
            <p className={styles.show_title}>{feedTitle}</p>
            <p className={styles.show_content}>{detailContent}</p>
            <p>{feedLike}</p>
            <p>{feedNo}</p>
          </div>
        </div>
      </div>
    </div>
      </Modal>
    </>
  )
}

export default Feed;
