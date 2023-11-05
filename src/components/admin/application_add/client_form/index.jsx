import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../common/button';
import Input from '../../../../common/input';
import { ChangePost } from '../../../../redux/change';
import { UsersPost } from '../../../../redux/users';
import styles from './style.module.css';

function ClientForm({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [value, setValue] = useState(dayjs());
  const [value2, setValue2] = useState(dayjs());
  const [surname, setsurname] = useState(null);
  const [father_name, setfather_name] = useState(null);
  const [birthday, setbirthday] = useState(null);
  const [adress, setadress] = useState(null);
  const [dateof, setdateof] = useState(null);
  const [email, setemail] = useState(null);
  const LidId = useSelector(state => state.Lids.LidsGet.data);
  const OrderId = useSelector(state => state.Order.OrdersGet.data);
  const OrderFind = OrderId.filter(elem => elem.id === id);
  const data = JSON.parse(window.localStorage.getItem('AuthDataUser'));

  let seriya = useRef();
  let name = useRef();
  let phone = useRef();
  let number = useRef();
  const handleSubmit = async e => {
    e.preventDefault();
    const body = {
      status: 'busy',
    };
    if (
      OrderFind.map(elem => elem.status_client)[0] === 'not_active' &&
      OrderFind.map(elem => elem.status_payment)[0] === 'Оплачено'
    ) {
      await dispatch(
        ChangePost({
          full_name: name.current.value,
          staff: data.id,
          rooms: OrderFind.map(elem => elem.rooms.id)[0],
          cash_coming:
            OrderFind.map(elem => elem.type_payment)[0] === 'Наличные' ? OrderFind.map(elem => elem.booking)[0] : 0,
          enum_coming:
            OrderFind.map(elem => elem.type_payment)[0] === 'Перечисление' ? OrderFind.map(elem => elem.booking)[0] : 0,
        })
      );
    }
    if (
      OrderFind.map(elem => elem.status_payment)[0] === 'Оплачено' &&
      OrderFind.map(elem => elem.status_client)[0] === 'active'
    ) {
      await dispatch(
        ChangePost({
          full_name: name.current.value,
          staff: data.id,
          rooms: OrderFind.map(elem => elem.rooms.id)[0],
          cash_coming:
            OrderFind.map(elem => elem.type_payment)[0] === 'Наличные' ? OrderFind.map(elem => elem.booking)[0] : 0,
          enum_coming:
            OrderFind.map(elem => elem.type_payment)[0] === 'Перечисление' ? OrderFind.map(elem => elem.booking)[0] : 0,
          arrival_date: OrderFind.map(elem => elem.arrival_date)[0],
        })
      );
    } else if (OrderFind.map(elem => elem.status_payment)[0] === 'Долговое') {
      await dispatch(
        ChangePost({
          full_name: name.current.value,
          staff: data.id,
          rooms: OrderFind.map(elem => elem.rooms.id)[0],
          arrival_date: OrderFind.map(elem => elem.arrival_date)[0],
        })
      );
    }
    await dispatch(
      UsersPost({
        name: name.current.value,
        surname: surname,
        father_name: father_name,
        birthday: DateFormat(value.$d),
        phone: phone.current.value,
        seriya: seriya.current.value,
        number: number.current.value,
        adress: adress,
        dateof: DateFormat2(value2.$d),
        email: email,
        orders: id,
      })
    );
  };
  const DateFormat2 = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let Month = [year, month, day].join('-');
    return Month;
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
  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <>
          <div className={styles.inputdiv}>
            <p>{t('application_add.26')}</p>
            <input
              required
              ref={name}
              placeholder={0}
            />
          </div>
          <Input
            required
            style={{ marginLeft: '12px' }}
            value={surname}
            onChange={e => setsurname(e.target.value)}
            text={t('application_add.25')}
            placeholder={0}
          />
          <Input
            required
            value={father_name}
            onChange={e => setfather_name(e.target.value)}
            style={{ marginLeft: '12px' }}
            text={t('application_add.27')}
            placeholder={0}
          />
          <div className={styles.inputdiv}>
            <p>{t('application_add.28')}</p>
            <input
              ref={seriya}
              placeholder={0}
            />
          </div>
          <div className={styles.inputdiv}>
            <p>№</p>
            <input
              ref={number}
              placeholder={0}
            />
          </div>
          <div className={styles.Calendar}>
            <p>{t('application_add.29')}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  value={value}
                  onChange={newValue => setValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className={styles.Calendar}>
            <p>{t('application_add.30')}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  value={value2}
                  onChange={newValue => setValue2(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <Input
            value={adress}
            onChange={e => setadress(e.target.value)}
            style={{ marginLeft: '12px' }}
            text={t('application_add.31')}
            placeholder={0}
          />
          <div className={styles.inputdiv}>
            <p>{t('application_add.32')}</p>
            <input
              ref={phone}
              placeholder={0}
            />
          </div>
          <Input
            value={email}
            onChange={e => setemail(e.target.value)}
            style={{ marginLeft: '12px' }}
            text={t('application_add.33')}
            placeholder={0}
            type="email"
          />
        </>

        <Button style={{ width: '130px' }}>{t('application_add.21')}</Button>
      </form>
    </>
  );
}

export default ClientForm;
