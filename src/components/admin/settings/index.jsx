import { Tabs } from "antd";
import styles from "./style.module.css";
import "./tabs.css";
import { useTranslation } from "react-i18next";
import NumberTabpanel from './number/index'
import ArchiveTabpanel from "./archive";
import PersonalTabpanel from "./personal";
import Product from "./product";
import CategoryTabpanel from "./category";

const onChange = (key) => {
  return key
};

const SettingComponents = () => {
  const { t } = useTranslation();
  const items = [
    {
      key: "1",
      label: t("Settings.3"),
      children: <ArchiveTabpanel/>,
    },
    {
      key: "2",
      label: t("Settings.0"),
      children: <NumberTabpanel/>,
    },
    {
      key: "3",
      label: t("Settings.1"),
      children: <Product/>,
    },
    {
      key: "4",
      label: t("Settings.9"),
      children: <CategoryTabpanel/>,
    },
    // {
    //     key: "4",
    //     label: t("Settings.2"),
    //     children: <PersonalTabpanel/>,
    //   },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};
export default SettingComponents;
