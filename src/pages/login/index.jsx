import LanguageComponent from "../../components/header-language"
import LoginComponent from "../../components/login"
import styles from "./app.module.css"

function Login() {
    return (
        <div className={styles.login}>
            <div className={styles.top}>
                <LanguageComponent/>
            </div>
            <div className={styles.login_wrapper}>
                <LoginComponent/>
            </div>
        </div>
    )
}

export default Login