import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../../common/button";
import Input from "../../../../../common/input";
import ModalCommon from "../../../../../common/modal";
import SelectCommon from "../../../../../common/select";
import UploadIcon from "./../../../../../assets/employees/upload-icon.svg";
import styles from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  StaffPost,
  UploadImage,
  UploadImagePassport,
  StaffGet,
} from "../../../../../redux/employess";

function AddNewEmployees({ open, onCancel }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));
  const [upload, setUpload] = useState(null);
  const [upload2, setUpload2] = useState(null);
  const [staffName, setStaffName] = useState(null);
  const [staffSureName, setStaffSureName] = useState(null);
  const [birthdays, setBirthdays] = useState(null);
  const [phoned, setPhoned] = useState(null);
  const [emails, setEmails] = useState(null);
  const [salarie, setSalarie] = useState(null);
  const [roles, setRoles] = useState(null);
  const [password, setPassword] = useState(null);

  const StaffPosts = useSelector((state) => state.Staff.StaffPost.data);

  const UploadImages = useSelector((state) => state.Staff.UploadImages.data);

  const UploadImagePassports = useSelector(
    (state) => state.Staff.UploadImagesPassports.data
  );

  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };

  const HandleChangePassport = async (e) => {
    await dispatch(UploadImagePassport(e));
  };

  useEffect(() => {
    dispatch(StaffGet());
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
   await dispatch(
      StaffPost({
        filial: data.filial.id,
        staff_name: staffName,
        staff_surname: staffSureName,
        birthday: birthdays,
        phone: phoned,
        image: UploadImages,
        passport: UploadImagePassports,
        email: emails,
        salary: salarie,
        role: roles,
        password: password,
      })
    );
    window.location.reload()
  };

  return (
    <ModalCommon
      open={open}
      onCancel={onCancel}
      titleText={t("employees.add_employees.0")}
      width="900px"
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.client_form}>
          <Input
            text={t("employees.add_employees.1")}
            onChange={(e) => setStaffName(e.target.value)}
            style={{ width: "390px" }}
          />
          <Input
            text={t("employees.add_employees.2")}
            onChange={(e) => setSalarie(e.target.value)}
            style={{ width: "390px" }}
          />
          <Input
            text={t("employees.add_employees.3")}
            onChange={(e) => setStaffSureName(e.target.value)}
            style={{ width: "390px" }}
          />
          <SelectCommon
            text={t("employees.add_employees.4")}
            style={{ width: "390px", height: "40px" }}
            defaultValue={t("employees.add_employees.4")}
            onChange={(e) => setRoles(e)}
            options={[
              {
                value: "Admin",
                label: "Admin",
              },
              {
                value: "manager",
                label: "Menejer",
              },
            ]}
          />

          <Input
            type="date"
            text={t("employees.add_employees.5")}
            onChange={(e) => setBirthdays(e.target.value)}
            style={{ width: "390px" }}
          />

          <Input
            text={t("employees.add_employees.6")}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "390px" }}
          />
        </div>
        <div className={styles.bottom}>
          <div className={styles.big_inputs}>
            <Input
              text={t("employees.add_employees.7")}
              onChange={(e) => setEmails(e.target.value)}
              style={{ width: "390px" }}
            />
            <Input
              text={t("employees.add_employees.8")}
              onChange={(e) => setPhoned(e.target.value)}
              style={{ width: "390px" }}
            />
          </div>
          <div className={styles.files_input}>
            <label for="file-upload" class={styles.label}>
              <span>{t("employees.add_employees.9")}</span>
              <img src={UploadIcon} width={50} height={50} alt="" />
            </label>
            <input
              name="Download_the_photo"
              id="file-upload"
              onChange={HandleChange}
              type="file"
            />
            <label for="file-upload-2" class={styles.label}>
              <span>{t("employees.add_employees.10")}</span>
              <img src={UploadIcon} width={50} height={50} alt="" />
            </label>
            <input
              name="Download_passport"
              type="file"
              id="file-upload-2"
              onChange={HandleChangePassport}
            />
          </div>
        </div>
        <div className={styles.button}>
          <Button style={{ width: "180px", height: "40px" }} type="submit">
            {t("employees.12")}
          </Button>
        </div>
      </form>
    </ModalCommon>
  );
}
export default AddNewEmployees;
