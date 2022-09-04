import axiosAuth from '../axios';






export default class elevenProductService {


    static getCategory = async (dto,done) => {
        const {mallId,dispCtgrNo}=dto

        await axiosAuth.get(`/shopProduct/category/2/${mallId}?dispCtgrNo=${dispCtgrNo}`)
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

    static getShipment = async (dto,done) => {
        const {mallId,mall}=dto

        await axiosAuth.get(`/shopProduct/shipment/${mall}/${mallId}`)
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

    static getReturns = async (dto,done) => {
        const {mall,mallId}=dto

        await axiosAuth.get(`/shopProduct/return/${mall}/${mallId}`)
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

    static register = async (dto,done) => {

        const {mall,mallId}=dto

        await axiosAuth.post(`/shopProduct/${mall}/${mallId}`,dto)
        .then(result=>{
            const {data}=result

            if (data.success){
                done(null,data)
            }
            else{
                done(new Error('등록 실패'),data)
            }})
        .catch(err=>{done(err,null)})
    };

}
