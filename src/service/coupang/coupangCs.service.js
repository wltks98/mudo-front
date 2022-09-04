import axiosAuth from '../axios';


export default class coupangCsService {

    static getCs = async (dto,done) => {
        const {mall,mallId,answeredType,inquiryStartAt,inquiryEndAt}=dto

        await axiosAuth.get(`/cs/${mall}/${mallId}?answeredType=${answeredType}&inquiryStartAt=${inquiryStartAt}&inquiryEndAt=${inquiryEndAt}`,dto)
        .then(result=>{
            const {data}=result

            if (data.success){
                done(null,data)
            }
            else{
                done(new Error('조회 실패'),data)
            }})
        .catch(err=>{done(err,null)})
    };

    static answerCs = async (dto,done) => {
        const {mallId,mall}=dto
        await axiosAuth.post(`/cs/${mall}/${mallId}`,dto)
        .then(result=>{
            const {data}=result

            if (data.success){
                done(null,data)
            }
            else{
                done(new Error('조회 실패'),data)
            }})
        .catch(err=>{done(err,null)})
    };



}
