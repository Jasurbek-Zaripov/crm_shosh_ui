import styles from "./style.module.css"

function Button({children , onClick , type , style , value , disabled}) {
        return(
     disabled ?             <button className={styles.btn_disabled} disabled style={style} onClick={onClick} value={value} type={type}>
                {children}
            </button>:             <button className={styles.btn} style={style} onClick={onClick} value={value} type={type}>
            {children}
        </button>
        )
}
export default Button