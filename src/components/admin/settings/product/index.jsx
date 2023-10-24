import React, {useEffect, useState} from "react";
import TableCommon from "../../../../common/table/index";
import {useTranslation} from "react-i18next";
import Button from "../../../../common/button";
import "../tabs.css";
import {useDispatch, useSelector} from "react-redux";
import {ProductsGet} from "../../../../redux/products";
import NumberAdd from "./add_number";
import NumberEdit from "./edit_number";
import NumberDelete from "./delete_number";

const Product = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ProductsGet())
    }, [])

    const dataProduct = useSelector(state => state.Products.ProductsGet.data)
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    const columns = [
        {
            title: t("Settings.products.0"),
            dataIndex: "number",
            key: "number",
            fixed: "left",
        },
        {
            title: t("Settings.products.1"),
            dataIndex: "type",
            key: "type",
        },
        {
            title: t("Settings.products.2"),
            dataIndex: "rate",
            key: "rate",
        },
        {
            title: t("Settings.products.3"),
            dataIndex: "count",
            key: "count",
        },
        {
            title: ``,
            dataIndex: 'delete',
            key: 'delete',
            width: 250
        },
    ];
    const data = []
    const [open, setOpen] = useState(false);
    const HandleOpen = () => (
        setOpen(true)
    )
    const HandleClose = () => (
        setOpen(false)
    )
    const [openEdit, setOpenEdit] = useState(false);
    const [dataId, setDataId] = useState();
    const HandleopenEdit = (e) => {
        setDataId(e.target.id)
        setOpenEdit(true)
    }
    const HandleCloseEdit = () => (
        setOpenEdit(false)
    )
    const [openDelete, setOpenDelete] = useState(false);
    const HandleopenDelete = (e) => {
        setDataId(e.target.id)
        setOpenDelete(true)
    }
    const HandleCloseDelete = () => (
        setOpenDelete(false)
    )
    dataProduct.map((elem, index) =>
        elem.filial?.filial_name === dataUser.filial.filial_name ?
            data.push(
                {
                    number: elem.product_name,
                    type: elem.price,
                    rate: elem.count,
                    count: elem.services.services_name,
                    delete: (
                        <div className="btn-box">
                            <Button
                                onClick={HandleopenEdit}
                                id={elem.id}
                                style={{
                                    background: "none",
                                    border: "none",
                                    outline: "none",
                                    cursor: "pointer",
                                    color: "#5778ee",
                                    fontSize: "30px",
                                }}
                            >
                                <i class="bx bx-edit-alt" id={elem.id}></i>
                            </Button>
                            <Button
                                id={elem.id}
                                onClick={HandleopenDelete}
                                style={{
                                    background: "none",
                                    border: "none",
                                    outline: "none",
                                    cursor: "pointer",
                                    color: "#da454e",
                                    fontSize: "30px",
                                }}
                            >
                                <i class="bx bx-trash" id={elem.id}></i>
                            </Button>
                        </div>
                    )
                }
            ) : null)
    return (
        <>
            <div className="header_table">
                <h2 className="table-header">{t("Settings.1")}</h2>
                <Button style={{fontSize: "16px"}} onClick={HandleOpen}>{t("Settings.number_table.5")}</Button>
            </div>
            <TableCommon
                bordered
                columns={columns}
                data={data}
                scroll={{
                    x: 1000,
                }}
            />
            <NumberAdd open={open} HandleClose={HandleClose}/>
            <NumberEdit open={openEdit} HandleClose={HandleCloseEdit} dataId={dataId}/>
            <NumberDelete open={openDelete} HandleClose={HandleCloseDelete} dataId={dataId}/>
        </>
    );
};

export default Product;
