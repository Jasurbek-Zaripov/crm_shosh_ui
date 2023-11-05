import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LidsActiveGet, LidsGet, LidsNewGet } from '../../../redux/lids';
import CustomerCharts from './customer_chart';
import Hot from './hot';
import LeaderBoard from './leaderboard';
import Schedule from './schedule';
import styles from './style.module.css';

function Applications() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LidsGet());
    dispatch(LidsNewGet());
    dispatch(LidsActiveGet());
  }, []);

  return (
    <>
      <div className={styles.top}>
        <div className={styles.box}>
          <Schedule />
        </div>
        <div className={styles.box}>
          <LeaderBoard />
        </div>
        <div className={styles.box}>
          <CustomerCharts />
        </div>
      </div>
      <div className={styles.bottom}>
        <Hot />
      </div>
    </>
  );
}

export default Applications;
