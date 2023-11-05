import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/button';
import Input from '../../common/input';
import { Auth } from '../../redux/login/authSlice';
import styles from './style.module.css';

function LoginComponent() {
  const { t } = useTranslation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = JSON.parse(window.localStorage.getItem('AuthDataUser'));

  const result = useSelector(state => state.Login);
  const HandleSubmit = e => {
    e.preventDefault();
    dispatch(Auth({ email, password }));
  };

  switch (result.UserDataVerfiy.role) {
    case 'Admin':
      navigate('/admin');
      window.location.reload();
      break;

    case 'manager':
      navigate('/manager');
      window.location.reload();
      break;

    case 'director':
      navigate('/director');
      window.location.reload();
      break;
    default:
      switch (data?.role) {
        case 'Admin':
          navigate('/admin');
          break;
        case 'manager':
          navigate('/manager');
          break;
        case 'director':
          navigate('/director');
      }
  }

  return (
    <form
      className={styles.login_box}
      onSubmit={HandleSubmit}
    >
      <h3>{t('Login.0')}</h3>
      <div className={styles.form_box}>
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          text={t('Login.1')}
        />
        <Input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          text={t('Login.2')}
        />
        {result.Error.message === 'Request failed with status code 401' ? (
          <p style={{ color: 'red', fontFamily: 'Rubik', fontSize: '14px' }}>{t('Login.4')}</p>
        ) : null}
      </div>
      <div className={styles.button}>
        <Button
          style={{ padding: '15px 47px' }}
          type={'submit'}
        >
          {t('Login.3')}
        </Button>
      </div>
    </form>
  );
}

export default LoginComponent;
