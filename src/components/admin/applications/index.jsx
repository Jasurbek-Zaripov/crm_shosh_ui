import Schedule from "./schedule"
import {Col , Row} from "react-grid-system"
import styles from "./style.module.css"
import LeaderBoard from "./leaderboard"
import CustomerCharts from "./customer_chart"
import ModalCommon from "./../../../common/modal/index"
import Hot from "./hot"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { LidsActiveGet, LidsGet, LidsNewGet } from "../../../redux/lids"
function Applications() {


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(LidsGet())
    }, [])
    useEffect(() => {
        dispatch(LidsNewGet())
    }, [])
    useEffect(() => {
        dispatch(LidsActiveGet())
    }, [])
    
    return(
        <>
              <div className={styles.top}>
            <div className={styles.box} >
        <Schedule/>
            </div>
            <div className={styles.box} >
        <LeaderBoard/>
            </div>
            <div className={styles.box} >
        <CustomerCharts/>
            </div>
        </div>
        <div className={styles.bottom}>
            <Hot />
        </div>
        </>
        )
}
export default Applications