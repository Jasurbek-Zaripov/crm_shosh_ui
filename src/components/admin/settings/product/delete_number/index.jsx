import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../../common/button";
import ModalCommon from "../../../../../common/modal"
import { ProductsDelete, ProductsGet } from "../../../../../redux/products";
import styles from "./style.module.css"

function NumberDelete({open , HandleClose , dataId}) {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
      e.preventDefault();
      await dispatch(
        ProductsDelete(dataId)
      );
        HandleClose();
          dispatch(ProductsGet())
    };
  
    return(
        <ModalCommon open={open} titleText={t("Settings.5")} onCancel={HandleClose} >
        <div className={styles.buttons}>
          <Button style={{backgroundColor:"red" , fontSize:"26px",padding:"5px"}} onClick={handleSubmit}>
          {t("Settings.7")}
          </Button>
          <Button onClick={HandleClose} style={{ fontSize:"26px",padding:"5px"}}>
          {t("Settings.8")}
          </Button>
        </div>
        </ModalCommon>
    )
}
export default NumberDelete