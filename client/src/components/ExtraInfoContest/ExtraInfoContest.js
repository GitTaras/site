import React from 'react';
import moment from 'moment';
import Button from '../Button/Button';
import styles from './ExtraInfoContest.module.sass';

const ExtraInfoContest = (props) => {
  const {
    pastTime, contest, user, history,
  } = props;
  return (
    <div className={styles.extraInfo}>
      <div className={styles.cost}>
        <i className="fa fa-diamond" />
        <span>{`$ ${contest.price}`}</span>
      </div>
      <div className={styles.timeAndPrice}>
        <div className={styles.timeCol}>
          <div className={styles.timeRow}>
            <i className="fa fa-hourglass-half" />
            <span>{`Passed time: ${pastTime}`}</span>
          </div>
          <div className={styles.timeRow}>
            <i className={`fa fa-check-circle ${styles.prizeIcon}`} />
            <span>Guaranteed prize</span>
          </div>
        </div>
        <div className={styles.timeCol}>
          {contest.winner
          && (<>
            <div className={styles.timeRow}>
              <i className={`fa fa-trophy ${styles.trophy}`} />
              <span>{`Winner: ${contest.winner.firstName} ${contest.winner.lastName}`}</span>
            </div>
            <div className={styles.timeRow}>
              <i className="fa fa-calendar" />
              <span>{`Date: ${moment(contest.updatedAt).format('DD.MM.YY h:mm A')}`}</span>
            </div>
          </>)}
          <div className={styles.timeRow}>
            <i className={`fa fa-bookmark ${styles.bookmark}`} />
            {contest.countEntries && <span>{`Entries: ${contest.countEntries}`}</span>}
          </div>
        </div>
      </div>
      {user.role === 'creative' && contest.isActive
      && (
      <div className={styles.timeAndPrice}>
        <Button
          content="Suggest an idea"
          btnStyle="suggestIdea"
          onClick={() => history.push(`/entry/create/${contest.id}`)}
        />
      </div>
      )}
    </div>
  );
};

export default ExtraInfoContest;
