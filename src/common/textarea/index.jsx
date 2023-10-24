import styles from "./style.module.css"

function TextArea({text , type , style , placeholder , onChange , cols , rows , styletextArea , name}) {
    return(
        <div className={styles.TextAreadiv} style={style}>
            <p>{text}</p>
            <textarea type={type} style={styletextArea} name={name} placeholder={placeholder} onChange={onChange} cols={cols} rows={rows} ></textarea>
        </div>
    )
}
export default TextArea