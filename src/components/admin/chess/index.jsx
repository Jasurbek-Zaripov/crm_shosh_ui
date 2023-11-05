import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../common/button';
import { openModal } from '../../../redux/instant_booking_modal';
import { OrdersBusyGet } from '../../../redux/orders';
import { RoomsGet } from '../../../redux/rooms';
import FormToInstantBooking from '../../modal/form_to_instant_booking';
import InstantBookingModal from '../../modal/instant_booking';
import DemoChess from './demo_chess';
import styles from './style.module.css';

function ChessComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUser = JSON.parse(window.localStorage.getItem('AuthDataUser'));
  const HandleClick = () => {
    switch (dataUser.role) {
      case 'Admin':
        navigate('/admin/applicationadd');
        window.location.reload();
        break;
      case 'manager':
        navigate('/manager/applicationadd');
        window.location.reload();
    }
  };

  const DateFormat = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let Month = [year, month, day].join('-');
    return Month;
  };
  const DateFormat2 = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;

    let Month = [year, month].join('-');
    return Month;
  };
  useEffect(() => {
    dispatch(RoomsGet());
  }, []);
  useEffect(() => {
    dispatch(OrdersBusyGet());
  }, []);
  const OrderGet = useSelector(state => state.Order.OrdersBusyGet.data);
  const TodayDate = new Date();
  const OrderGetFilter = OrderGet.filter(e => e.status_client === 'active');
  const OrderGetFilterNot = OrderGet.filter(e => e.status_client === 'not_active');
  const OrdersGetFilterData = OrderGetFilterNot.filter(e => e.arrival_date.slice(0, 10) === DateFormat(TodayDate));
  const OrdersGetFilterData2 = OrderGetFilter.filter(e => e.departure_date.slice(0, 10) === DateFormat(TodayDate));
  const OrdersGetFilterDepartureDate = OrderGetFilter.filter(
    e => e.departure_date.slice(0, 10) !== DateFormat(TodayDate)
  );
  const OrdersGetFilterDepartureMonth = OrderGet.filter(e => e.arrival_date.slice(0, 7) === DateFormat2(TodayDate));

  function OrdersGetMonthNight() {
    let sum = 0;
    OrdersGetFilterDepartureMonth.map(elem =>
      elem.filial?.filial_name === dataUser.filial.filial_name ? (sum += Number(elem.number_night)) : 0
    );
    return Number(sum);
  }

  const RoomsGets = useSelector(state => state.Rooms.RoomsGet?.data);

  const RoomsFilter = RoomsGets.filter(elem => elem.filial?.filial_name === dataUser.filial.filial_name);
  const RoomsFilterDate = RoomsFilter.length * 30;
  const RoomsFilterDateMonth = (OrdersGetMonthNight() * 100) / RoomsFilterDate || 0;
  return (
    <div className={styles.box}>
      <div className={styles.top}>
        <h3>{t('chess.0')}</h3>
        <div className={styles.card}>
          <p>
            {' '}
            {
              OrdersGetFilterData.map(order =>
                order.filial?.filial_name === dataUser.filial.filial_name ? order : null
              ).length
            }{' '}
          </p>
          <span>{t('chess.10')}</span>
        </div>
        <div className={styles.card2}>
          <p>
            {' '}
            {
              OrdersGetFilterData2.map(order =>
                order.filial?.filial_name === dataUser.filial.filial_name ? order : null
              ).length
            }{' '}
          </p>
          <span>{t('chess.11')}</span>
        </div>
        <div className={styles.card3}>
          <p>
            {' '}
            {
              OrdersGetFilterDepartureDate.map(order =>
                order.filial?.filial_name === dataUser.filial.filial_name ? order : null
              ).length
            }{' '}
          </p>
          <span>{t('chess.21')}</span>
        </div>
        <div className={styles.card4}>
          <p> {RoomsFilterDateMonth.toFixed(2)} %</p>
          <span>{t('chess.22')}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <Button onClick={HandleClick}>{t('chess.1')}</Button>
          <Button onClick={() => dispatch(openModal())}>
            <span className={styles.fleshIcon}>{t('chess.23')}</span>
          </Button>
        </div>
      </div>
      <DemoChess />
      <InstantBookingModal>
        <FormToInstantBooking />
      </InstantBookingModal>
    </div>
  );
}

export default ChessComponent;
