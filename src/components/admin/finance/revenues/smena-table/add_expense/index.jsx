import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../../../../common/input';
import SelectCommon from '../../../../../../common/select';
import TextArea from '../../../../../../common/textarea';
import ModalCommon from "./../../../../../../common/modal/index"
import styles from "./style.module.css"
import {ConsumptionCategoryGet} from "./../../../../../../redux/consumption_category/index"
import Button from '../../../../../../common/button';
import {ChangePost} from '../../../../../../redux/change';

const AddExpenes = ({open, onCancel, HandleClose}) => {
    const {t} = useTranslation();
    const [category, setCategory] = useState(null);
    const [PaymentType, setPaymentType] = useState(null);
    const dispatch = useDispatch();
    const [sum, setSum] = useState(null);
    const [Comment, setComment] = useState(null);
    const dataCategory = useSelector(state => state.ConsumptionCategori.ConsumptionCategoryGet.data)
    const ConsumptionPosts = useSelector(state => state.Change.ChangePost)
    useEffect(() => {
        dispatch(ConsumptionCategoryGet())
    }, [])
    const dataUser = JSON.parse(window.localStorage.getItem("AuthDataUser"))
    const option = []
    dataCategory.map(elem =>
        elem.filial?.filial_name === dataUser.filial.filial_name ?
            option.push({
                value: elem.consumption_name,
                label: (
                    <>
                        <span style={{marginRight: "3px"}}>{elem.consumption_name}</span>
                    </>
                )
            }) : null
    )
    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (PaymentType === 'Наличные') {
            await dispatch(ChangePost({
                cash_flow: sum,
                comentary: Comment,
                consumption_category: category,
                staff: dataUser?.id
            }))
        } else {
            dispatch(ChangePost({
                transfer_exp: sum,
                comentary: Comment,
                consumption_category: category,
                staff: dataUser?.id
            }))
        }
    }
    if (ConsumptionPosts.Success === true) {
        window.location.reload();
    }
    return (
        <ModalCommon titleText={t("add_expenes.0")} open={open} onCancel={onCancel} HandleClose={HandleClose}>
            <form className={styles.form} onSubmit={HandleSubmit}>
                <SelectCommon
                    options={option}
                    defaultValue={t("add_expenes.0")}
                    onChange={(e) => setCategory(e)}
                    className={styles.application_select}
                    text={t("add_expenes.0")}
                />
                <SelectCommon
                    options={[
                        {value: "Наличные", label: t("application_add.34")},
                        {value: "Перечисление", label: t("application_add.35")},
                    ]}
                    defaultValue={t("add_expenes.2")}
                    onChange={(e) => setPaymentType(e)}
                    className={styles.application_select}
                    text={t("add_expenes.2")}
                />
                <Input
                    required
                    style={{marginLeft: "12px", width: '45%'}}
                    value={sum}
                    type="number"
                    onChange={(e) => setSum(e.target.value)}
                    text={t("add_expenes.2")}
                    placeholder={0}
                />
                <TextArea
                    value={Comment}
                    onChange={(e) => setComment(e.target.value)}
                    styletextArea={{width: "199px", height: "100px"}}
                    text={t("application_add.14")}
                />
                <Button
                    style={{
                        width: "180px",
                        height: "40px",
                        marginTop: "20px",
                    }}
                    type="submit"
                >
                    {t("application_add.21")}
                </Button>
            </form>
        </ModalCommon>
    )
}

export default AddExpenes