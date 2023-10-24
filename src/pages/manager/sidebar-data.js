import {
    ApartmentOutlined,
    BarChartOutlined,
    CopyOutlined,
    EllipsisOutlined,
    SettingOutlined,
    TableOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import {NavLink} from "react-router-dom";

function GetValueLang() {
    return window.localStorage.getItem("i18nextLng");
}

export const dataSidebarManager = [
    {
        key: "/manager/application",
        icon: <CopyOutlined/>,
        label: (
            <NavLink to="/manager/application" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Ilovalar"
                : GetValueLang() === "ru" ? "Заявки"
                    : GetValueLang() === "en" ? "Applications" : null}</NavLink>
        ),
    },
    {
        key: "/manager/finance",
        icon: <BarChartOutlined/>,
        label: (
            <NavLink to="/manager/finance" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Moliya"
                : GetValueLang() === "ru" ? "Финансы"
                    : GetValueLang() === "en" ? "Finance" : null}</NavLink>
        ),
    },
    {
        key: "/manager/employees",
        icon: <TeamOutlined/>,
        label: (
            <NavLink to="/manager/employees" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Xodimlar"
                : GetValueLang() === "ru" ? "Сотрудники"
                    : GetValueLang() === "en" ? "Employees" : null}</NavLink>
        ),
    },
    {
        key: "/manager/chess",
        icon: <TableOutlined/>,
        label: (
            <NavLink to="/manager/chess" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Shaxmat"
                : GetValueLang() === "ru" ? "Шахматка"
                    : GetValueLang() === "en" ? "Chess" : null}</NavLink>
        ),
    },
    {
        key: "/manager/additservies",
        icon: <EllipsisOutlined/>,
        label: (
            <NavLink to="/manager/additservies"
                     style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Qo'shimcha xizmatlar"
                : GetValueLang() === "ru" ? "Доп услуги"
                    : GetValueLang() === "en" ? "Additional services" : null}</NavLink>
        ),
    },
    {
        key: "/manager/setting",
        icon: <SettingOutlined/>,
        label: (
            <NavLink to="/manager/setting" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Sozlash"
                : GetValueLang() === "ru" ? "Настройка"
                    : GetValueLang() === "en" ? "Setting" : null}</NavLink>
        ),
    },
    {
        key: "/manager/smena-admin",
        icon: <ApartmentOutlined/>,
        label: (
            <NavLink to="/manager/smena-admin" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Admin o'zgarishi"
                : GetValueLang() === "ru" ? "Смена админ"
                    : GetValueLang() === "en" ? "Admin change" : null}</NavLink>
        )
    }
]
