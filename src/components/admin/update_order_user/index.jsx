import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import { Button } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  UserCreate,
  UserDelete,
  UserUpdate,
} from "../../../axios_service/axios.service.ts";
import ModalUserEdit from "../modal_user_edit";
import "./style.css";

const mustKeys = ["name", "surname", "father_name", "seriya", "number"];
const dateFormat = "YYYY-MM-DD";

export default function UpdateOrderUser({ users, setRefreshOrder }) {
  const { id: paramOrderId } = useParams();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  const onDelete = (userId) => {
    UserDelete(userId).then(() => setRefreshOrder(true));
  };
  const onUpdate = ({ id, ...data }) => {
    data.dateof = dayjs(data.dateof).format(dateFormat);
    data.birthday = dayjs(data.birthday).format(dateFormat);
    if (id !== -1) {
      UserUpdate(id, data).then(() => setRefreshOrder(true));
    } else {
      data.orders = paramOrderId;
      UserCreate(data).then(() => setRefreshOrder(true));
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{t("application_add.26")}</th>
            <th>{t("application_add.25")}</th>
            <th>{t("application_add.27")}</th>
            <th>{t("application_add.28")}</th>
            <th>{t("application_add.22")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {[{ id: -1 }].concat(users).map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              {mustKeys.map((userKey) => (
                <td key={user.id + userKey + i}>{user[userKey]}</td>
              ))}
              <td>
                <Button
                  onClick={() => {
                    setUser(null);
                    setUser(user);
                  }}
                >
                  <WysiwygIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalUserEdit
        parentAction={{
          user,
          setUser,
          onDelete,
          onUpdate,
        }}
      />
    </div>
  );
}
