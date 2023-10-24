import styles from "./style.module.css";

function Input({
                   text,
                   type,
                   style,
                   placeholder,
                   onChange,
                   value,
                   name,
                   key,
                   styleInput,
                   required,
                   defaultValue
               }) {
    return required ? (
        <div key={key} className={styles.inputdiv} style={style}>
            <p>{text}</p>
            <input
                type={type}
                required
                style={styleInput}
                value={value}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                defaultValue={defaultValue}
            />
        </div>
    ) : (
        <div key={key} className={styles.inputdiv} style={style}>
            <p>{text}</p>
            <input
                type={type}
                style={styleInput}
                value={value}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;
