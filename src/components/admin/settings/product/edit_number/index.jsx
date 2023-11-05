import {useState} from "react"
import {useTranslation} from "react-i18next"
import {useDispatch, useSelector} from "react-redux";
import Button from "../../../../../common/button";
import Input from "../../../../../common/input";
import ModalCommon from "../../../../../common/modal"
import SelectCommon from "../../../../../common/select";
import {ProductsGet, ProductsPut} from "../../../../../redux/products";
import styles from "./style.module.css"

function NumberEdit({open, HandleClose, dataId}) {
    const {t} = useTranslation();
    const [Product, setProduct] = useState();
    const [price, setPrice] = useState();
    const [count, setcount] = useState();
    const [service, setService] = useState();
    const dispatch = useDispatch();
    const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));
    const dataProducts = useSelector(state => state.Products.ProductsGet.data)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = {
            product_name: Product,
            price: price,
            count: count,
            services: service,
            filial: data.filial.id,
        }
        await dispatch(
            ProductsPut({body, id: dataId})
        );
        HandleClose();
        dispatch(ProductsGet())
    };

    return (
        <ModalCommon open={open} titleText={t("Settings.5")} onCancel={HandleClose}>
            <form onSubmit={handleSubmit}>
                <div className={styles.client_form}>
                    {dataProducts.map(elem =>
                        elem.id === dataId ? <>

                            <Input
                                required
                                text={t("Settings.number_table.0")}
                                placeholder={elem.product_name}
                                onChange={(e) => setProduct(e.target.value)}
                                style={{width: "100%", marginBottom: "30px", marginTop: "30px"}}
                            />

                            <Input
                                text={t("Settings.number_table.1")}
                                placeholder={elem.price}
                                onChange={(e) => setPrice(e.target.value)}
                                style={{width: "100%", marginBottom: "30px"}}
                            />

                            <Input
                                type="text"
                                text={t("Settings.number_table.2")}
                                placeholder={elem.count}
                                onChange={(e) => setcount(e.target.value)}
                                style={{width: "100%", marginBottom: "30px"}}
                            />
                            <SelectCommon
                                defaultValue={t("Settings.products.3")}
                                options={[
                                    {value: 1, label: t("Settings.products.4")},
                                ]}
                                text={t("Settings.products.3")}
                                onChange={(e) => setService(e)}
                                style={{width: "470px", marginBottom: "20px", marginTop: "5px", height: "50px"}}
                            />
                        </> : null
                    )}

                </div>

                <div className={styles.button}>
                    <Button style={{width: "180px", height: "40px"}} type="submit">
                        {t("employees.12")}
                    </Button>
                </div>
            </form>
        </ModalCommon>
    )
}

export default NumberEdit