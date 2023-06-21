import { React, useEffect, useState } from "react";
import { getRecipeDetail } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styles from './Detail.module.css'
const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
console.log('id detail',id);
    useEffect(() => {
        dispatch(getRecipeDetail(id));
    }, [id]);

    const data = useSelector((state) => state.details);
    console.log('data Detail:',data);
    return (
        <div className={styles.enc}>
            <h2>{data?.name}</h2>
            <img className={styles.imgdetail} src={data?.image} alt="" />
            <h2 >health score: {data?.healthScore}</h2>
            <h3 className={styles.summary}>Summary</h3>
            <h3> {data?.summary.replace(/(<([^>]+)>)/gi, "")}</h3>
            <h3>Step by Step</h3>
            <div  className={styles.steps}>
                {
                    data?.steps 
                    // (data?.steps).split(',').map((ste,index)=> <h2 key={index}>{index}: { ste.step} </h2>)
                    // data?.steps.map((ste,index)=> <h2 key={index}>{index}: { ste.step} </h2>)
                }
            </div>
           <h3>Types of diets: </h3>
            <h3>{data?.diets}</h3>
            
        </div>
    )
}
export default Detail