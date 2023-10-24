import styles from "./style.module.css";
import { useEffect } from "react";
import { ConsumptionCategoryGet } from "../../../../redux/consumption_category/index";
import { ConsumptionGet } from "../../../../redux/consumption/index";
import { useDispatch, useSelector } from "react-redux";
import { OrdersGet, OrdersBusyGet } from "../../../../redux/orders";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";

function TableChess() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const OrdersGets = useSelector((state) => state.Order.OrdersGet?.data);
  const OrdersBusyGets = useSelector(
    (state) => state.Order.OrdersBusyGet?.data
  );
  useEffect(() => {
    dispatch(OrdersGet());
  }, []);
  useEffect(() => {
    dispatch(OrdersBusyGet());
  }, []);

  let newArray = Array.from(
    { length: OrdersGets.map((elem) => Number(elem.number_night))[0] },
    (value, index) => index
  );

  const arr = [
    1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
  ];
  const newDay = new Date();
  const month = newDay.get;
  return (
    <>
      <div className={styles.chess_wrapper}>
        <div className={styles.left}>
          {arr.map((_, index) => (
            <>
              <div className={styles.left_item}>{index}</div>
            </>
          ))}
        </div>
        <div className={styles.right}>
          <div className={styles.right_top}>
            {OrdersBusyGets.map((order) => (
              <div className={styles.right_bottom}>
                <p>{order.rooms.rooms}</p>
                {order.map.length &&
                  order.map.map((_, index) => (
                    <>
                      <Tooltip
                        color={"#fff"}
                        placement="bottomLeft"
                        title={
                          <div className={styles.box_tooltip}>
                            <div className={styles.box_items}>
                              <p>
                                {order.users
                                  .slice(0, 1)
                                  .map((user) => user.name)}{" "}
                                {order.users
                                  .slice(0, 1)
                                  .map((user) => user.surname)}
                              </p>
                              <p>
                                {order.users
                                  .slice(0, 1)
                                  .map((user) => user.phone)}
                              </p>
                            </div>
                            <div className={styles.box_items}>
                              <p>{t("Room.2")}:</p>
                              <p>{order.arrival_date}</p>
                            </div>
                            <div className={styles.box_items}>
                              <p>{t("Room.3")}:</p>
                              <p>{order.departure_date}</p>
                            </div>
                            <div className={styles.box_items}>
                              <p>{t("Room.24")}:</p>
                              <p>{order.rooms.type}</p>
                            </div>
                            <div className={styles.box_items}>
                              <p>{t("Room.25")}:</p>
                              <p>{order.comentary}</p>
                            </div>
                          </div>
                        }
                      >
                        <div key={index} className={styles.rooms_box}>
                          <div className={styles.room_modal}>What a shame!</div>
                          <div className={styles.plus}>
                            <i class="bx bx-plus"></i>
                          </div>
                        </div>
                      </Tooltip>
                    </>
                  ))}
                {arr.map((_, index) => (
                  <>
                    <div key={index - 1} className={styles.rooms_boxs}></div>
                  </>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default TableChess;
