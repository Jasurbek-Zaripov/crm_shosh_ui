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

export const dataSidebarDirector = [
    {
        key: "/director/application",
        icon: <CopyOutlined/>,
        label: (
            <NavLink to="/director/application" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Ilovalar"
                : GetValueLang() === "ru" ? "Заявки"
                    : GetValueLang() === "en" ? "Applications" : null}</NavLink>
        ),
    },
    {
        key: "/director/finance",
        icon: <BarChartOutlined/>,
        label: (
            <NavLink to="/director/finance" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Moliya"
                : GetValueLang() === "ru" ? "Финансы"
                    : GetValueLang() === "en" ? "Finance" : null}</NavLink>
        ),
    },
    {
        key: "/director/employees",
        icon: <TeamOutlined/>,
        label: (
            <NavLink to="/director/employees" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Xodimlar"
                : GetValueLang() === "ru" ? "Сотрудники"
                    : GetValueLang() === "en" ? "Employees" : null}</NavLink>
        ),
    },
    {
        key: "/director/chess",
        icon: <TableOutlined/>,
        label: (
            <NavLink to="/director/chess" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Shaxmat"
                : GetValueLang() === "ru" ? "Шахматка"
                    : GetValueLang() === "en" ? "Chess" : null}</NavLink>
        ),
    },
    {
        key: "/director/additservies",
        icon: <EllipsisOutlined/>,
        label: (
            <NavLink to="/director/additservies"
                     style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Qo'shimcha xizmatlar"
                : GetValueLang() === "ru" ? "Доп услуги"
                    : GetValueLang() === "en" ? "Additional services" : null}</NavLink>
        ),
    },
    {
        key: "/director/setting",
        icon: <SettingOutlined/>,
        label: (
            <NavLink to="/director/setting" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Sozlash"
                : GetValueLang() === "ru" ? "Настройка"
                    : GetValueLang() === "en" ? "Setting" : null}</NavLink>
        ),
    },
    {
        key: "/director/smena-admin",
        icon: <ApartmentOutlined/>,
        label: (
            <NavLink to="/director/smena-admin" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "Admin o'zgarishi"
                : GetValueLang() === "ru" ? "Смена админ"
                    : GetValueLang() === "en" ? "Admin change" : null}</NavLink>
        )
    },
    {
        key: "/director/filal-add",
        icon: <ApartmentOutlined/>,
        label: (
            <NavLink to="/director/filal-add" style={{fontSize: "17px"}}>{GetValueLang() === "uz" ? "filal qo'shish"
                : GetValueLang() === "ru" ? "Добавить филиал"
                    : GetValueLang() === "en" ? "Add a branch" : null}</NavLink>
        )
    }
]
