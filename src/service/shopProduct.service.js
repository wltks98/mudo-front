import axiosAuth from './axios';






export default class userService {

    static getShopProducts = async (dto,done) => {
        await axiosAuth.get('/shopProduct')
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

    static getOneShopProduct = async (dto,done) => {

        const {mallId,sellerProductId,mall}=dto

        await axiosAuth.get(`/shopProduct/${mall}/${mallId}/${sellerProductId}`)
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

    static deleteProduct = async (dto,done) => {

        const {sellerProductId,mallId}=dto

        await axiosAuth.delete(`/shopProduct`,{data:{sellerProductId,mallId}})
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

    static stopProduct = async (dto,done) => {

        await axiosAuth.put(`/shopProduct/stop`,dto)
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

    static resumeProduct = async (dto,done) => {

        await axiosAuth.put(`/shopProduct/resume`,dto)
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

    static getStock = async (dto,done) => {
        const {mallId,sellerProductId,mall}=dto

        await axiosAuth.get(`/shopProduct/stock/${mall}/${mallId}/${sellerProductId}`)
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
