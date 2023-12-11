import React, { useEffect, useState } from 'react';
import CommentsDrawer from "../comments/CommentsDrawer"
import editChecks from '../API/EditChecks.json'
import { useParams } from "react-router-dom"
import studies from "../API/Studies.json"
import './EditCheckList.scss'

const EditCheckList = () => {
    let params = useParams();
    const [studyName, setStudyName] = useState("");
    useEffect(() => {
        const studyDetails = studies.find(study => study.StudyId === params.studyId);
        setStudyName(studyDetails.StudyName)
    })
    return (
        <>
            <div className='studyDetails'>
                {studyName}
            </div>
            <div className='studyLine'>
            </div>
            <div className='editcheckHeader'>
                <div className='editcheckHeaderText'>Edit Check </div>
                <div className='editcheckHeaderText'>Created By</div>
                <div className='editcheckHeaderText'>Created On</div>
                <div className='editcheckHeaderText'>Last Update</div>
                <div className='editcheckHeaderTextLast'></div>
            </div>
            {editChecks.map((ec,i)=> {
                return (<div className='editcheckRow' style={i === 0 ? {marginTop : '8px'} : {} }>
                    <div className='editcheckItem'>{ec.Name} </div>
                    <div className='editcheckItem'>{ec.createdBy}</div>
                    <div className='editcheckItem'>{ec.createdOn}</div>
                    <div className='editcheckItem'>{ec.lastUpdatedOn}</div>
                    <div className='editcheckItemLast'>
                        <CommentsDrawer editCheck={ec}></CommentsDrawer>
                    </div>
                </div>)
            })}
        </>
    );
};

export default EditCheckList;