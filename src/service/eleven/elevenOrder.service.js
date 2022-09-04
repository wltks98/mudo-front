import axiosAuth from '../axios';


export default class elevenProductService {

    static getOrders = async (dto,done) => {
        const {mallId, createdAtFrom, createdAtTo,status,searchType,mall}=dto

        await axiosAuth.get(`/order/${mall}/${mallId}/ordersheets?createdAtFrom=${createdAtFrom}&createdAtTo=${createdAtTo}&searchType=${searchType}&status=${status}`)
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

    static readyOrder = async (dto,done) => {

        const {mallId}=dto

        await axiosAuth.put(`/order/${mallId}/ordersheets/acknowledgement`,dto)
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

    static cancelOrder = async (dto,done) => {

        const {mallId}=dto

        await axiosAuth.post(`/order/${mallId}/cancel`,dto)
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
