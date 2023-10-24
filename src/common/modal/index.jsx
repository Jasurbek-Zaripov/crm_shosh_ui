import {Modal} from 'antd';
import styles from "./style.module.css"
function ModalCommon({open , onOk , onCancel , title , children , width , titleText}) {
    return(
        <div className={styles.Modal}>
              <Modal className={styles.content} width={width} title={title} closable={null} footer={null} open={open}  onOk={onOk} onCancel={onCancel}>
                <div className={styles.modalclose}>
                <i class='bx bx-x-circle' onClick={onCancel} ></i>
                </div>

                <h3>{titleText}</h3>

                {children}
            </Modal>
        </div>
    )
}
export default ModalCommon