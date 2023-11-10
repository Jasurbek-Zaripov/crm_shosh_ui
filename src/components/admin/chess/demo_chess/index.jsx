import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../utils/api";
import { DatePicker, Table } from "antd";
import "./chess.css";
import "./app.css";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

function DemoChess() {
  const [rooms, setRooms] = useState([]);
  const [orders, setOrders] = useState([]);
  const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"));
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [columns, setColumns] = useState(null);
  const [_date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  useEffect(() => {
    fetch(`${API_URL}/rooms`)
      .then((response) => response.json())
      .then((data) => setRooms(data));
    fetch(`${API_URL}/orders`)
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  useEffect(() => {
    const ordersObj = {};
    orders
      .filter(
        (order) =>
          order.status !== "deleted" &&
          order.filial?.filial_name === dataUser.filial.filial_name,
      )
      .forEach((order) => {
        const key = [
          new Date(order.arrival_date).getFullYear(),
          new Date(order.arrival_date).getMonth(),
          new Date(order.arrival_date).getDate(),
          order.rooms.id,
        ].join("-");
        ordersObj[key] = {
          id: order.id,
          text: `${order?.users[0]?.name} \n${order.users[0]?.phone}`,
          start: new Date(order.arrival_date).toISOString(),
          end: new Date(order.departure_date).toISOString(),
          backColor: getRandomColor(),
          status: order.status,
          title: `имя админ : ${order.staff.staff_name} ${
            order.staff.staff_surname
          } \nВремя бронирования: ${order.createdAt.slice(
            0,
            10,
          )}  \nкомпания : ${order.company}  \nИмя: ${order.users[0]?.name} ${
            order.users[0]?.surname
          } \nколичество гостей : ${order.count_users} \nТип номера: ${
            order.rooms.type
          }   \nНомер телефона: ${order.users[0]?.phone} \nБронировоние: ${
            order.booking
          } \nКоментарий: ${
            order.comentary
          }  \nДата заезда : ${order.arrival_date.slice(
            0,
            10,
          )} \nВремя заезда: ${order.arrival_date.slice(
            12,
            16,
          )} \nДата выезда: ${order.departure_date.slice(
            0,
            10,
          )} \nВремя выезда: ${order.arrival_date.slice(12, 16)} `,
        };
      });

    setColumns(
      _date && setMonthFn(_date.year, _date.month, t("Settings.0"), ordersObj),
    );
  }, [_date, orders]);

  const resource = rooms
    .filter((room) => room.filial?.filial_name === dataUser.filial.filial_name)
    .map((room) => ({
      id: room.id,
      key: "" + room.id + room.rooms,
      room: <span id={room.id}>{room.rooms}</span>,
    }));

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <DatePicker
          format={"YYYY-MMMM"}
          defaultValue={dayjs(
            _date ? new Date(_date.year, _date.month, 1) : new Date(),
          )}
          placement={"bottomLeft"}
          onChange={(val) => setDate(val && { year: val.$y, month: val.$M })}
          picker="month"
        />
      </div>

      {columns && (
        <Table
          columns={columns}
          dataSource={resource}
          bordered
          pagination={false}
          size="middle"
          scroll={{
            x: "100vw",
            y: "100vh",
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

  return colors[Math.floor(Math.random() * (colors.length + 1))];
}

function setMonthFn(years, month, roomName, events) {
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
        },
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
      console.log(_);

      columns[1].children.push({
        title: i + 1,
        dataIndex: i + 1,
        key: `${years}-${month}-${i + 1}`,
        render: (
          _,
          {
            room: {
              props: { id, children },
            },
          },
        ) => {
          const key = [years, month, i + 1, id].join("-");
          const event = events[key];
          return event ? (
            <div
              key={key}
              style={{
                background: event.backColor,
                color: "white",
                cursor: "pointer",
              }}
              title={event.title}
            >
              <span style={{ whiteSpace: "nowrap" }}>{event.text}</span>
            </div>
          ) : null;
        },
      });
    },
  );

  return columns;
}
