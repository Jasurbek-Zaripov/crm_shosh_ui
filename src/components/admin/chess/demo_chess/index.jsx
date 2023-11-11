import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../utils/api";
import { DatePicker, Table } from "antd";
import "./chess.css";
import "./app.css";
import dayjs from "dayjs";

function DemoChess() {
  const [rooms, setRooms] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [columns, setColumns] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [_date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const handleOrderClick = (id) => navigate("/admin/update/order/" + id);

  useEffect(() => {
    fetch(`${API_URL}/rooms`)
      .then((response) => response.json())
      .then((data) => setRooms(data));
    fetch(`${API_URL}/orders`)
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const ordersObj = {};
    initOrders(orders, ordersObj, handleOrderClick);
    setDataSource(initDataSource(rooms));

    setColumns(
      _date && setMonthFn(_date.year, _date.month, t("Settings.0"), ordersObj)
    );
    setLoading(false);
  }, [_date, orders, rooms]);

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <DatePicker
          format={"YYYY-MMMM"}
          defaultValue={dayjs(
            _date ? new Date(_date.year, _date.month, 1) : new Date()
          )}
          placement={"bottomLeft"}
          onChange={(val) => setDate(val && { year: val.$y, month: val.$M })}
          picker="month"
        />
      </div>

      {columns && (
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={false}
          loading={loading}
          scroll={{
            x: true,
          }}
        />
      )}
    </div>
  );
}

export default DemoChess;

function getRandomColor() {
  const colors = [
    "#93c47d",
    "#6fa8dc",
    "#f6b26b",
    "#ffa500",
    "#ff7373",
    "#bada55",
    "#f08080",
    "#ff7f50",
  ];

  return colors[String(Math.random()).replace(".", "") % colors.length];
}

function setMonthFn(years, month, roomName, ordersObj) {
  const columns = [
    {
      title: <span style={{ whiteSpace: "nowrap" }}> {roomName}</span>,
      dataIndex: "room",
      width: "6rem",
      key: "room",
      fixed: "left",
      rowScope: "row",
    },
    {
      title: new Date(years, month, 1).toLocaleString(
        localStorage.getItem("i18nextLng") || "en",
        {
          month: "long",
        }
      ),
      key: "rootTitle",
      children: [],
    },
  ];

  Array.from(
    {
      length: new Date(years, month + 1, 0).getDate(),
    },
    (_, i) => {
      i++;
      columns[1].children.push({
        title: <span style={{ whiteSpace: "nowrap" }}>{i}</span>,
        dataIndex: i,
        key: `${years}-${month}-${i}`,
        render: (_, { id }) => {
          const dateCol = new Date(years, month, i).getTime();
          const found = ordersObj[id]?.filter(
            (item) =>
              new Date(item.props.startdate).setHours(0, 0, 0, 0) <= dateCol &&
              new Date(item.props.enddate).getTime() >= dateCol
          );
          return found?.length ? found : null;
        },
      });
    }
  );

  return columns;
}

function initDataSource(rooms) {
  const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"));

  return rooms
    .filter((room) => room.filial?.filial_name === dataUser.filial.filial_name)
    .map((room) => ({
      id: room.id,
      key: "" + room.id + room.rooms,
      room: <span id={room.id}>{room.rooms}</span>,
    }));
}

function initOrders(orders, object, handleClick) {
  const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"));

  orders
    .filter(
      (order) =>
        order.status !== "deleted" &&
        order.filial?.filial_name === dataUser.filial.filial_name
    )
    .forEach((order) => {
      object[order.rooms.id] ||= [];

      object[order.rooms.id].push(
        <div
          onClick={() => handleClick(order.id)}
          className={"table-order"}
          id={order.id}
          key={"" + order.rooms.id + order.id}
          title={`имя админ : ${order.staff.staff_name} ${
            order.staff.staff_surname
          } 
          \nВремя бронирования: ${dayjs(order.createdAt).format(
            "DD.MM.YYYY HH:mm"
          )}  
          \nкомпания : ${order.company}  
          \nИмя: ${order.users[0]?.name} ${order.users[0]?.surname} 
          \nколичество гостей : ${order.count_users} 
          \nТип номера: ${order.rooms.type}   
          \nНомер телефона: ${order.users[0]?.phone} 
          \nБронировоние: ${order.booking} 
          \nКоментарий: ${order.comentary}  
          \nДата заезда : ${dayjs(order.arrival_date).format("DD.MM.YYYY")} 
          \nВремя заезда: ${dayjs(order.arrival_date).format("HH:mm")} 
          \nДата выезда: ${dayjs(order.departure_date).format("DD.MM.YYYY")} 
          \nВремя выезда: ${dayjs(order.departure_date).format("HH:mm")} `}
          startdate={new Date(order.arrival_date).toISOString()}
          enddate={new Date(order.departure_date).toISOString()}
          style={{ backgroundColor: getRandomColor(), color: "white" }}
          orderstatus={order.status}
        >
          <span style={{ whiteSpace: "nowrap" }}>
            {`ID: ${order.id} - ` + (order?.users[0]?.name || "unknown")}
          </span>
          <span style={{ whiteSpace: "nowrap" }}>
            {order.users[0]?.phone || "unknown"}
          </span>
        </div>
      );
    });
}
