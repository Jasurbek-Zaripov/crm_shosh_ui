import styles from "./styles.module.css"
import Table from "./table"
import Top from "./top"

function EmployeesComponent() {
    return(
        <div className={styles.box}>
        <Top/>
        <Table/>
        </div>
    )
}
export default EmployeesComponent