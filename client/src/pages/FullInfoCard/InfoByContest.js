import React from 'react';
import moment from 'moment';
import Modal from 'react-responsive-modal';
import styles from './FullInfoCard.module.sass';
import MyTab from '../../components/MyTab/MyTab';
import {imgUrl} from '../../api/baseURL';
import ExtraInfoContest from '../../components/ExtraInfoContest/ExtraInfoContest';
import Chat from '../Chat/Chat';
import PreviewImg from '../../components/PreviewImg/PreviewImg';

const InfoByContest = (props) => {
  const {contest, user, openChat, isShow, srcImg,
    setImgInfo, entriesForCreative, payNow, renderEdit, renderListStyles, likeByContest } = props;
  const pastTime = moment(contest.createdAt).toNow(true);
  const creative = user.role === 'creative';
  const buyer = user.role === 'buyer';

  return (
    <div className={styles.mainContainer}>
      <div className={styles.briefWrapper}>
        <div className={styles.content}>
          <div className={styles.briefCardContainer}>
            <div className={styles.container}>
              <div className={styles.wrapper}>
                <div className={styles.row}>
                  <span className={styles.title}>Name </span>
                  <span className={styles.description}>{contest.name}</span>
                  <span className={styles.description}>{`(# ${contest.id})`}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.title}>Type </span>
                  <span className={styles.description}>{contest.type}</span>
                  <span className={styles.description}>{`(posted ${pastTime} ago)`}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.title}>My company</span>
                  <span className={styles.description}>{contest.purpose}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.title}>Type of Industry</span>
                  {contest.industry.map(item => (
                    <span key={item} className={styles.description}>{`${item}, `}</span>
                  ))}
                </div>
                <div className={styles.row}>
                  <span className={styles.title}>Description</span>
                  <span className={[styles.description, styles.business].join(' ')}>{contest.businessDo}</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.title}>Target customer</span>
                  <span className={[styles.description, styles.business].join(' ')}>{contest.targetCustomer}</span>
                </div>
                {contest.style && renderListStyles(contest.style)}
                {contest.photos &&
                <div className={styles.row}>
                  <img
                    src={`${imgUrl}/${contest.owner_id}/${contest.photos}`}
                    alt="photos"
                    className={styles.photoContest}
                    onClick={() => setImgInfo(true, `${imgUrl}/${contest.owner_id}/${contest.photos}`)}
                  />
                </div>}
                <div className={styles.row}>
                  <div className={styles.price}>
                    <i className="fa fa-diamond"/>
                  </div>
                  <span className={styles.price}>{`$ ${contest.price}`}</span>
                </div>
                {contest.isPayed === false && buyer && payNow(contest.uuidGroup)}
              </div>
              {contest.isActive !== false && buyer && renderEdit(contest.id)}
              {creative && likeByContest()}
            </div>
            {buyer && contest.isPayed === true && <MyTab contest={contest} user={user}/>}
            {creative &&
            <>
              <span className={styles.titleSuggestion}>Your suggestions: </span>
              <div className={styles.entries}>
                {entriesForCreative()}
              </div>
            </>}
          </div>
          <ExtraInfoContest {...props} pastTime={pastTime}/>
        </div>
      </div>
      <Modal open={isShow} onClose={() => setImgInfo(false, '')} center>
        <PreviewImg onClose={() => setImgInfo(false, '')} srcImg={srcImg}/>
      </Modal>
      <Chat openChat={openChat}/>
    </div>
  );
};
export default InfoByContest;