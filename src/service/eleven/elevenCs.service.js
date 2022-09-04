import axiosAuth from '../axios';


export default class elevenCsService {

    static getCs = async (dto,done) => {
        const {mall,mallId,answerStatus,startTime,endTime}=dto

        await axiosAuth.get(`/cs/${mall}/${mallId}?answerStatus=${answerStatus}&startTime=${startTime}&endTime=${endTime}`,dto)
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
