import NotFound404uz from "./../../assets/notFound/404-uz.svg"
import NotFound404ru from "./../../assets/notFound/404-ru.svg"
import NotFound404en from "./../../assets/notFound/404-en.svg"
import styles from "./style.module.css"
import Cookies from "universal-cookie";

function NotFound() {
    const cookies = new Cookies();

    function LanguageValue() {
        return cookies.get("i18next")
    }

    return (
        <div className={styles.Wrapper}>
            {LanguageValue() === "uz" ?
                <img src={NotFound404uz} alt="" className={styles.Image}/> : LanguageValue() === "ru" ?
                    <img src={NotFound404ru} className={styles.Image} alt=""/> : LanguageValue() === "en" ?
                        <img src={NotFound404en} className={styles.Image} alt=""/> : null}

        </div>
    )
}

export default NotFound