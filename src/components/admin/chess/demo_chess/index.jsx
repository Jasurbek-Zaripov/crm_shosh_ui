import {
  CalendarNav,
  CalendarNext,
  CalendarPrev,
  CalendarToday,
  Eventcalendar,
  SegmentedGroup,
  SegmentedItem,
  momentTimezone,
} from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../../utils/api';
import './app.css';
import './chess.css';

function DemoChess() {
  const [rooms, setRooms] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('month');
  const dataUser = JSON.parse(window.localStorage.getItem('AuthDataUser'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [calView, setCalView] = useState({
    timeline: {
      type: 'month',
    },
  });

  momentTimezone.moment = moment;

  const onEventClick = ({ event }) => {
    switch (dataUser?.role) {
      case 'Admin':
        navigate('/admin/update/order/' + event.id);
        break;
    }
  };

  const changeView = event => {
    let calView;
    switch (event.target.value) {
      case 'year':
        calView = {
          timeline: {
            type: 'year',
          },
        };
        break;
      case 'week':
        calView = {
          timeline: {
            type: 'week',
          },
        };
        break;
      case 'month':
      default:
        calView = {
          timeline: {
            type: 'month',
          },
        };
        break;
    }

    setView(event.target.value);
    setCalView(calView);
  };

  useEffect(() => {
    fetch(`${API_URL}/rooms`)
      .then(response => response.json())
      .then(data => setRooms(data));
    fetch(`${API_URL}/orders`)
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  const events = orders
    .filter(order => order.status !== 'deleted' && order.filial?.filial_name === dataUser.filial.filial_name)
    .map(order => ({
      id: order.id,
      title: `${order?.users[0]?.name} \n${order.users[0]?.phone}`,
      start: order.arrival_date,
      description: order.comentary,
      allDay: false,
      end: order.departure_date,
      color: order.color,
      status: order.status,
      resource: order?.rooms?.id,
      tooltip: `имя админ : ${order.staff.staff_name} ${
        order.staff.staff_surname
      } \nВремя бронирования: ${order.createdAt.slice(0, 10)}  \nкомпания : ${order.company}  \nИмя: ${
        order.users[0]?.name
      } ${order.users[0]?.surname} \nколичество гостей : ${order.count_users} \nТип номера: ${
        order.rooms.type
      }   \nНомер телефона: ${order.users[0]?.phone} \nБронировоние: ${order.booking} \nКоментарий: ${
        order.comentary
      }  \nДата заезда : ${order.arrival_date.slice(0, 10)} \nВремя заезда: ${order.arrival_date.slice(
        12,
        16
      )} \nДата выезда: ${order.departure_date.slice(0, 10)} \nВремя выезда: ${order.arrival_date.slice(12, 16)} `,
    }));

  const resource = rooms
    .filter(room => room.filial?.filial_name === dataUser.filial.filial_name)
    .map(room => ({
      id: room.id,
      name: room.rooms,
      color: 'ff4600',
    }));

  const renderMyHeader = () => {
    return (
      <>
        <CalendarNav className="md-event-listing-nav" />
        <div className="md-event-listing-picker">
          <SegmentedGroup
            value={view}
            onChange={changeView}
          >
            <SegmentedItem value="year">{t('chess.7')}</SegmentedItem>
            <SegmentedItem value="week">{t('chess.8')}</SegmentedItem>
            <SegmentedItem value="month">{t('chess.9')}</SegmentedItem>
          </SegmentedGroup>
        </div>
        <CalendarPrev className="md-event-listing-prev" />
        <CalendarToday className="md-event-listing-today" />
        <CalendarNext className="md-event-listing-next" />
      </>
    );
  };

  return (
    <div>
      <Eventcalendar
        theme="ios"
        themeVariant="light"
        view={calView}
        timezonePlugin={momentTimezone}
        data={events}
        renderHeader={renderMyHeader}
        resources={resource}
        cssClass="md-event-listing"
        onEventClick={onEventClick}
      />
    </div>
  );
}

export default DemoChess;
