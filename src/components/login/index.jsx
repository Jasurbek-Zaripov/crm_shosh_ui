import {useTranslation} from "react-i18next";
import Button from "../../common/button";
import Input from "../../common/input";
import styles from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {Auth} from "../../redux/login/authSlice";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginComponent() {
    const {t} = useTranslation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))
    const result = useSelector(state => state.Login)
    const HandleSubmit = (e) => {
        e.preventDefault();
        dispatch(Auth({email, password}))
    }

    switch (result.UserDataVerfiy.role) {
        case 'Admin':
            navigate("/admin/application")
            window.location.reload();
            break

        case 'manager':
            navigate("/manager/application")
            window.location.reload();
            break

        case 'director':
            navigate("/director/application")
            window.location.reload();
            break
        default:
            switch (data?.role) {
                case 'Admin':
                    navigate("/admin/application")
                    break
                case 'manager':
                    navigate("/manager/application")
                    break
                case 'director':
                    navigate("/director/application")
            }
    }

    return (
        <form className={styles.login_box} onSubmit={HandleSubmit}>
            <h3>{t("Login.0")}</h3>
            <div className={styles.form_box}>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    text={t("Login.1")}
                />
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    text={t("Login.2")}
                />
                {result.Error.message === 'Request failed with status code 401' ?
                    <p style={{color: "red", fontFamily: "Rubik", fontSize: "14px"}}>{t("Login.4")}</p> : null}
            </div>
            <div className={styles.button}>
                <Button style={{padding: "15px 47px"}} type={"submit"}>{t("Login.3")}</Button>
            </div>
        </form>
    );
}

export default LoginComponent;
