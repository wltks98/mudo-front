import axiosAuth from './axios';
import store from '../store/index';





export default class userService {

    static getMalls = async (dto,done) => {
        await axiosAuth.get('/mall')
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

    static getOneMall = async (dto,done) => {

        const {type,mallId}=dto

        await axiosAuth.get(`/mall/${type}/${mallId}`)
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

    static registerMall = async (dto,done) => {
        await axiosAuth.post('/mall',{...dto})
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


    static update = async (dto,done) => {

        await axiosAuth.put('/user',{...dto})
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

    static delete = async (dto,done)=>{

        await axiosAuth.delete('/mall',{data:{...dto}})
            .then(result=>{
                const {data}=result
    
                if (data.success){
                    done(null,data)
                }
                else{
                    done(new Error('삭제 실패'),data)
                }
            })
            .catch(err=>{done(err,null)})
    }


}
