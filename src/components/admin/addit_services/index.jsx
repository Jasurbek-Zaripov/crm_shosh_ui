import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../common/button";
import Input from "../../../common/input";
import SelectCommon from "../../../common/select";
import TextArea from "../../../common/textarea";
import { ChangePost } from "../../../redux/change";
import { OrdersBusyGet, OrdersGet } from "../../../redux/orders";
import { ProductsGet } from "../../../redux/products";
import { ServicesOrdersPost } from "../../../redux/servies_orders";
import { API_URL } from "../../../utils/api";
import styles from "./style.module.css";

const AdditServiesComponent = ({ order }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const OrderGet = useSelector((state) => state.Order.OrdersBusyGet.data);
  const ProductGet = useSelector((state) => state.Products.ProductsGet.data);
  useEffect(() => {
    dispatch(OrdersBusyGet());
    dispatch(ProductsGet());
    dispatch(OrdersGet());
  }, []);

  const [orders, setOrders] = useState(order || null);
  const [products, setProducts] = useState(null);
  const [prices, setPrices] = useState(null);
  const [counts, setCounts] = useState(1);
  const [statusPayment, setStatusPayment] = useState(null);
  const [typePayment, setTypePayment] = useState(null);
  const [comentarys, setComentarys] = useState(null);
  const [ids, setIds] = useState(null);
  const pricesMinibar = useRef();
  const OrderId = useSelector((state) => state.Order.OrdersGet.data);
  const OrderFind = OrderId.filter((elem) => elem.id === orders);
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));
  const handleId = (e) => {
    setIds(e.currentTarget.value);
  };
  const HandleSubmitMiniBar = async (e) => {
    e.preventDefault();
    const bodys = {
      count: Number(
        ProductGet.filter((elem) => elem.id === products)[0].count - counts
      ),
    };
    if (statusPayment === "Оплачено") {
      await dispatch(
        ChangePost({
          full_name: OrderFind.map(
            (elem) => elem.users.map((e) => e.name)[0]
          )[0],
          staff: data.id,
          rooms: OrderFind.map((elem) => elem.rooms.id)[0],
          cash_coming:
            typePayment === "Наличные" ? pricesMinibar.current.value : 0,
          enum_coming:
            typePayment === "Перечисление" ? pricesMinibar.current.value : 0,
        })
      );
    }
    await axios
      .put(`${API_URL}/products/${products}`, bodys)
      .then((res) => res);
    let bodyPrices = {
      paid:
        Number(pricesMinibar.current.value) +
        Number(OrderGet.filter((e) => e.id === orders)[0].paid),
      total_payable:
        Number(pricesMinibar.current.value) +
        Number(OrderGet.filter((e) => e.id === orders)[0].total_payable),
    };
    const bodyPrices2 = {
      debt:
        Number(pricesMinibar.current.value) +
        Number(OrderGet.filter((e) => e.id === orders)[0].debt),
      total_payable:
        Number(pricesMinibar.current.value) +
        Number(OrderGet.filter((e) => e.id === orders)[0].total_payable),
    };
    if (statusPayment === "Оплачено") {
      await axios
        .put(`${API_URL}/orders/${orders}`, bodyPrices)
        .then((res) => res);
    } else {
      await axios
        .put(`${API_URL}/orders/${orders}`, bodyPrices2)
        .then((res) => res);
    }

    await dispatch(
      ServicesOrdersPost({
        price: pricesMinibar.current.value,
        count: counts,
        type_payment: typePayment,
        status_payment: statusPayment,
        comentary: comentarys,
        orders: orders,
        products: products,
        services: 1,
      })
    );
    window.location.reload();
  };
  const HandleSubmitLaundry = async (e) => {
    e.preventDefault();
    if (statusPayment === "Оплачено") {
      await dispatch(
        ChangePost({
          full_name: OrderFind.map(
            (elem) => elem.users.map((e) => e.name)[0]
          )[0],
          staff: data.id,
          rooms: OrderFind.map((elem) => elem.rooms.id)[0],
          cash_coming: typePayment === "Наличные" ? prices : 0,
          enum_coming: typePayment === "Перечисление" ? prices : 0,
          departure_date: OrderFind.map((elem) => elem.departure_date)[0],
        })
      );
    }
    let bodyPrices = {
      paid:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].paid),
      total_payable:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].total_payable),
    };
    const bodyPrices2 = {
      debt:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].debt),
      total_payable:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].total_payable),
    };
    if (statusPayment === "Оплачено") {
      await axios
        .put(`${API_URL}/orders/${orders}`, bodyPrices)
        .then((res) => res);
    } else {
      await axios
        .put(`${API_URL}/orders/${orders}`, bodyPrices2)
        .then((res) => res);
    }
    await dispatch(
      ServicesOrdersPost({
        price: prices,
        count: counts,
        type_payment: typePayment,
        status_payment: statusPayment,
        comentary: comentarys,
        orders: orders,
        products: products,
        services: 2,
      })
    );
    window.location.reload();
  };
  const HandleSubmitPenalties = async (e) => {
    e.preventDefault();
    if (statusPayment === "Оплачено") {
      await dispatch(
        ChangePost({
          full_name: OrderFind.map(
            (elem) => elem.users.map((e) => e.name)[0]
          )[0],
          staff: data.id,
          rooms: OrderFind.map((elem) => elem.rooms.id)[0],
          cash_coming: typePayment === "Наличные" ? prices : 0,
          enum_coming: typePayment === "Перечисление" ? prices : 0,
          departure_date: OrderFind.map((elem) => elem.departure_date)[0],
        })
      );
    }
    let bodyPrices = {
      paid:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].paid),
      total_payable:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].total_payable),
    };
    const bodyPrices2 = {
      debt:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].debt),
      total_payable:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].total_payable),
    };
    if (statusPayment === "Оплачено") {
      await axios
        .put(`${API_URL}/orders/${orders}`, bodyPrices)
        .then((res) => res);
    } else {
      await axios
        .put(`${API_URL}/orders/${orders}`, bodyPrices2)
        .then((res) => res);
    }
    await dispatch(
      ServicesOrdersPost({
        price: prices,
        count: counts,
        type_payment: typePayment,
        status_payment: statusPayment,
        comentary: comentarys,
        orders: orders,
        products: products,
        services: 3,
      })
    );
    window.location.reload();
  };
  const HandleSubmitOtherExpenses = async (e) => {
    e.preventDefault();

    let bodyPrices = {
      paid:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].paid),
      total_payable:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].total_payable),
    };
    const bodyPrices2 = {
      debt:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].debt),
      total_payable:
        Number(prices) +
        Number(OrderGet.filter((e) => e.id === orders)[0].total_payable),
    };
    if (statusPayment === "Оплачено") {
      await axios
        .put(`${API_URL}/orders/${orders}`, bodyPrices)
        .then((res) => res);
    } else {
      await axios
        .put(`${API_URL}/orders/${orders}`, bodyPrices2)
        .then((res) => res);
    }
    await dispatch(
      ServicesOrdersPost({
        price: prices,
        count: counts,
        type_payment: typePayment,
        status_payment: statusPayment,
        comentary: comentarys,
        orders: orders,
        products: products,
        services: 4,
      })
    );
    if (statusPayment === "Оплачено") {
      await dispatch(
        ChangePost({
          full_name: OrderFind.map(
            (elem) => elem.users.map((e) => e.name)[0]
          )[0],
          staff: data.id,
          rooms: OrderFind.map((elem) => elem.rooms.id)[0],
          cash_coming: typePayment === "Наличные" ? prices : 0,
          enum_coming: typePayment === "Перечисление" ? prices : 0,
          departure_date: OrderFind.map((elem) => elem.departure_date)[0],
        })
      );
    }
    window.location.reload();
  };
  const options = [];
  const option = [];
  const optionTypePayment = [
    {
      value: "Наличные",
      label: t("AdditServies.25"),
    },
    {
      value: "Перечисление",
      label: t("AdditServies.26"),
    },
  ];

  const optionStatusPayment = [
    {
      value: "Долговое",
      label: t("AdditServies.23"),
    },
    {
      value: "Оплачено",
      label: t("AdditServies.24"),
    },
  ];
  const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"));
  const OrderGetFilter = OrderGet.filter((e) => e.status_client === "active");
  OrderGetFilter.map((order) =>
    order.filial?.filial_name === dataUser.filial.filial_name
      ? options.push({
          value: order.id,
          label: order.rooms.rooms,
        })
      : null
  );

  ProductGet.map((product) =>
    product.filial?.filial_name === dataUser.filial.filial_name &&
    product.count > 0
      ? option.push({
          value: product.id,
          label: (
            <>
              <span style={{ margin: "0 3px" }}>{product.product_name}</span> |
              <span style={{ margin: "0 3px" }}>{product.price}</span> |
              <span style={{ margin: "0 3px" }}>{product.count}</span>
            </>
          ),
        })
      : null
  );

  return (
    <>
      <div className={styles.form_wrapper}>
        <div className={styles.wrapper}>
          <div className={styles.item_box}>
            <h2 className={styles.miniBar_title}>{t("AdditServies.1")}</h2>
            <form className={styles.form} onSubmit={HandleSubmitMiniBar}>
              <div className={styles.item_boxs}>
                <div className={styles.right_box}>
                  <SelectCommon
                    defaultValue={t("AdditServies.21")}
                    options={options}
                    onChange={(e) => setOrders(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.0")}
                  />
                  <SelectCommon
                    defaultValue={t("AdditServies.21")}
                    options={option}
                    onChange={(e) => setProducts(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.1")}
                  />

                  <div className={styles.inputdiv}>
                    <p>{t("AdditServies.2")}</p>
                    <input
                      type="text"
                      style={{ marginLeft: "12px", width: "150px" }}
                      required
                      ref={pricesMinibar}
                      value={
                        ProductGet.filter((elem) => elem.id === products)[0]
                          ?.price === undefined
                          ? 0
                          : ProductGet.filter((elem) => elem.id === products)[0]
                              ?.price * counts
                      }
                      placeholder="0"
                    />
                  </div>
                  {/* <input
                    style={{ marginLeft: "12px", width: "150px" }}
                    value={
                      ProductGet.filter((elem) => elem.id === products)[0]
                        ?.price === undefined
                        ? 0
                        : ProductGet.filter((elem) => elem.id === products)[0]
                            ?.price * counts
                    }
                    text={t("AdditServies.2")}
                    placeholder="0"
                  /> */}
                  <Input
                    style={{ marginLeft: "12px", width: "150px" }}
                    onChange={(e) => setCounts(e.target.value)}
                    text={t("AdditServies.3")}
                    value={counts}
                    placeholder="0"
                  />
                  <SelectCommon
                    options={optionTypePayment}
                    defaultValue={t("AdditServies.21")}
                    onChange={(e) => setTypePayment(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.4")}
                  />
                  <SelectCommon
                    options={optionStatusPayment}
                    defaultValue={t("AdditServies.21")}
                    onChange={(e) => setStatusPayment(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.16")}
                  />
                </div>
                <div className={styles.left_box}>
                  <Button
                    value={1}
                    onClick={handleId}
                    style={{ padding: "11px 54px", marginTop: "52px" }}
                    type={"submit"}
                  >
                    {t("application_add.21")}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.item_box}>
            <h2 className={styles.miniBar_title}>{t("AdditServies.17")}</h2>
            <form className={styles.form} onSubmit={HandleSubmitLaundry}>
              <div className={styles.item_boxs}>
                <div className={styles.right_box}>
                  <SelectCommon
                    defaultValue={t("AdditServies.21")}
                    options={options}
                    onChange={(e) => setOrders(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.0")}
                  />
                  <Input
                    style={{ marginLeft: "12px", width: "150px" }}
                    onChange={(e) => setPrices(e.target.value)}
                    text={t("AdditServies.2")}
                    placeholder="0"
                  />

                  <SelectCommon
                    options={optionTypePayment}
                    defaultValue={t("AdditServies.21")}
                    onChange={(e) => setTypePayment(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.4")}
                  />
                  <SelectCommon
                    options={optionStatusPayment}
                    defaultValue={t("AdditServies.21")}
                    onChange={(e) => setStatusPayment(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.16")}
                  />
                  <TextArea
                    text={t("AdditServies.18")}
                    onChange={(e) => setComentarys(e.target.value)}
                    styletextArea={{
                      resize: "none",
                      width: "312px",
                      height: "82px",
                      marginLeft: "12px",
                    }}
                  />
                </div>
                <div className={styles.left_box}>
                  <Button
                    value={2}
                    onClick={handleId}
                    style={{ padding: "11px 54px", marginTop: "52px" }}
                    type={"submit"}
                  >
                    {t("application_add.21")}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.item_box}>
            <h2 className={styles.miniBar_title}>{t("AdditServies.19")}</h2>
            <form className={styles.form} onSubmit={HandleSubmitPenalties}>
              <div className={styles.item_boxs}>
                <div className={styles.right_box}>
                  <SelectCommon
                    defaultValue={t("AdditServies.21")}
                    options={options}
                    onChange={(e) => setOrders(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.0")}
                  />
                  <Input
                    style={{ marginLeft: "12px", width: "150px" }}
                    onChange={(e) => setPrices(e.target.value)}
                    text={t("AdditServies.2")}
                    placeholder="0"
                  />

                  <SelectCommon
                    options={optionTypePayment}
                    defaultValue={t("AdditServies.21")}
                    onChange={(e) => setTypePayment(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.4")}
                  />
                  <SelectCommon
                    options={optionStatusPayment}
                    defaultValue={t("AdditServies.21")}
                    onChange={(e) => setStatusPayment(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.16")}
                  />
                  <TextArea
                    text={t("AdditServies.18")}
                    onChange={(e) => setComentarys(e.target.value)}
                    styletextArea={{
                      resize: "none",
                      width: "312px",
                      height: "82px",
                      marginLeft: "12px",
                    }}
                  />
                </div>
                <div className={styles.left_box}>
                  <Button
                    value={3}
                    onClick={handleId}
                    style={{ padding: "11px 54px", marginTop: "52px" }}
                    type={"submit"}
                  >
                    {t("application_add.21")}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.item_box}>
            <h2 className={styles.miniBar_title}>{t("AdditServies.20")}</h2>
            <form className={styles.form} onSubmit={HandleSubmitOtherExpenses}>
              <div className={styles.item_boxs}>
                <div className={styles.right_box}>
                  <SelectCommon
                    defaultValue={t("AdditServies.21")}
                    options={options}
                    onChange={(e) => setOrders(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.0")}
                  />
                  <Input
                    style={{ marginLeft: "12px", width: "150px" }}
                    onChange={(e) => setPrices(e.target.value)}
                    text={t("AdditServies.2")}
                    placeholder="0"
                  />

                  <SelectCommon
                    options={optionTypePayment}
                    defaultValue={t("AdditServies.21")}
                    onChange={(e) => setTypePayment(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.4")}
                  />
                  <SelectCommon
                    options={optionStatusPayment}
                    defaultValue={t("AdditServies.21")}
                    onChange={(e) => setStatusPayment(e)}
                    className={styles.addit_select}
                    text={t("AdditServies.16")}
                  />
                  <TextArea
                    text={t("AdditServies.18")}
                    onChange={(e) => setComentarys(e.target.value)}
                    styletextArea={{
                      resize: "none",
                      width: "312px",
                      height: "82px",
                      marginLeft: "12px",
                    }}
                  />
                </div>
                <div className={styles.left_box}>
                  <Button
                    value={4}
                    onClick={handleId}
                    style={{ padding: "11px 54px", marginTop: "52px" }}
                    type={"submit"}
                  >
                    {t("application_add.21")}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditServiesComponent;
