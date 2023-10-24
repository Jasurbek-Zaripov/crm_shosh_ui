import React from "react";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import Input from "../../../../common/input";
import styles from "./style.module.css";
import Button from "../../../../common/button";
import ImageUpload from "./image_uploud";

const PersonalTabpanel = () => {
    const {t} = useTranslation();
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    const InputData = [
        {
            id: 1,
            name: "name",
            type: "text",
            text: t("Settings.personal_data.1"),
            placeholder: dataUser.staff_name,
        },
        {
            id: 3,
            name: "password",
            type: "password",
            text: t("Settings.personal_data.3"),
        },
    ];
    const formik = useFormik({
        initialValues: {
            task: "",
            dispatch_time: "",
            importance: "",
            deadline: "",
            task: "",
            deadline: "",
        },
        onSubmit: (values) => {
            return values
        },
    });
    return (
        <>
            <div className="header_table">
                <h2 className="table-header">{t("Settings.personal_data.0")}</h2>
            </div>

            <form className={styles.personal_form} onSubmit={formik.handleSubmit}>
                <div className={styles.img_aploud}>
                    <ImageUpload/>
                </div>
                <div className={styles.inputs}>
                    {InputData.map((elem, index) => (
                        <Input
                            key={index}
                            onBlur={formik.onBlur}
                            onChange={formik.handleChange}
                            name={elem.name}
                            text={elem.text}
                            type={elem.type}
                            placeholder={elem.placeholder}
                            style={{
                                fontFamily: "Rubik",
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: "17px",
                                letterSpacing: "0.01em",
                                color: "#777777",
                            }}
                        />
                    ))}
                    <Button style={{padding: "11px 53px", marginTop: "40px"}}>
                        {t("Settings.personal_data.4")}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default PersonalTabpanel;
