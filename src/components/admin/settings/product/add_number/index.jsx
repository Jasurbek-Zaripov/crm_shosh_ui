import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../../common/button";
import Input from "../../../../../common/input";
import ModalCommon from "../../../../../common/modal"
import SelectCommon from "../../../../../common/select";
import { ProductsGet, ProductsPost } from "../../../../../redux/products";
import { RoomsGet, RoomsPost } from "../../../../../redux/rooms";
import styles from "./style.module.css"

function NumberAdd({open , HandleClose}) {
    const {t} = useTranslation();
    const [Products, setProducts] = useState(null);
    const [price, setprice] = useState(null);
    const [count, setcount] = useState(null);
    const [Service, setService] = useState(null);
    const dispatch = useDispatch();
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));
    const handleSubmit = async (e) => {
      e.preventDefault();
      await dispatch(
        ProductsPost({
          product_name:Products,
            price:price,
            count:count,
            services:Service,
            filial:data.filial.id,
        })
      );
        HandleClose();
          dispatch(ProductsGet())
    };
  
    return(
        <ModalCommon open={open} titleText={t("Settings.4")} onCancel={HandleClose} >
                  <form onSubmit={handleSubmit}>
        <div className={styles.client_form}>
          <Input
          required
            text={t("Settings.products.0")}
            onChange={(e) => setProducts(e.target.value)}
            style={{ width: "100%" , marginBottom:"30px" , marginTop:"30px"}}
          />

          <Input
          type={"number"}
          required
            text={t("Settings.products.1")}
            onChange={(e) => setprice(e.target.value)}
            style={{ width: "100%" , marginBottom:"30px"}}
          />

          <Input
          required
            type="text"
            text={t("Settings.products.2")}
            onChange={(e) => setcount(e.target.value)}
            style={{ width: "100%" , marginBottom:"30px"}}
          />
          <SelectCommon
          defaultValue={t("Settings.products.3")}
            options={[
                        { value: 1, label: t("Settings.products.4") },
                      ]}
            text={t("Settings.products.3")}
            onChange={(e) => setService(e)}
            style={{ width: "470px" , marginBottom:"20px" , marginTop:"5px" ,  height:"50px"}}
          /> 
        </div>

        <div className={styles.button}>
          <Button style={{ width: "180px", height: "40px" }} type="submit">
            {t("employees.12")}
          </Button>
        </div>
      </form>
        </ModalCommon>
    )
}
export default NumberAdd