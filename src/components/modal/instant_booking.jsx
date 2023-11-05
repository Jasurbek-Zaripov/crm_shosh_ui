import React from 'react';
import {Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../redux/instant_booking_modal";
import {useTranslation} from "react-i18next";

export default function InstantBookingModal({children}) {
    const {t} = useTranslation();
    const open = useSelector((state) => state.InstantBookingModal.open)
    const dispatch = useDispatch()

    const handleCancel = () => {
        dispatch(closeModal());
    };
    return (
        <>
            <Modal
                title={t('chess.23')}
                open={open}
                onCancel={handleCancel}
                footer={null}
                centered
                width={'70%'}
            >
                {children}
            </Modal>
        </>
    );
};