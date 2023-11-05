import styles from "./style.module.css"


function Button({children, onClick, type, style, value, disable}) {
    return (
        <button className={disable ? styles.btn_disabled : styles.btn} disabled={disable} style={style}
                onClick={onClick} value={value} type={type}>
            {children}
        </button>
    )
}

export default Button