import axiosAuth from './axios';
import store from '../store/index';





export default class userService {

    static getProducts = async (dto,done) => {
        await axiosAuth.get('/product')
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

    static getOneProduct = async (dto,done) => {

        const {productId}= dto

        await axiosAuth.get(`/product/${productId}`)
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

    static getOption = async (dto,done) => {
        await axiosAuth.get(`/product/option/${dto}`)
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

    static registerProduct = async (dto,done) => {
        await axiosAuth.post('/product',dto)
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

    static deleteProduct = async (dto,done) => {
        await axiosAuth.delete('/product',{data:{...dto}})
        .then(result=>{
            const {data}=result

            if (data.success){
                done(null,data)
            }
            else{
                done(new Error('삭제 실패'),data)
            }})
        .catch(err=>{done(err,null)})
    };

    static updateProduct = async (dto,done) => {
        await axiosAuth.put('/product',dto)
        .then(result=>{
            const {data}=result

            if (data.success){
                done(null,data)
            }
            else{
                done(new Error('수정 실패'),data)
            }})
        .catch(err=>{done(err,null)})
    };

    //상품 수정에서 미리보기 이미지
    static downloadImg = async (dto,done) => {
        await axiosAuth(
        {
            url: '/product/download',
            method: 'POST',
            responseType: 'blob',
            data:dto
        })
        .then(result=>{
            console.log(result.data)
            const fileURL = URL.createObjectURL(new Blob([result.data]));
            const file = new File([result.data], "file.jpg" );
            done(null,{file,fileURL})
        })
        .catch(err=>{done(err,null)})
    };




}
