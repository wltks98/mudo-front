import axiosAuth from '../axios';


export default class coupangRevenueService {

    static getRevenue = async (dto,done) => {
        const {mallId,token,recognitionDateFrom,recognitionDateTo}=dto

        await axiosAuth.get(`/revenue/${mallId}?&recognitionDateFrom=${recognitionDateFrom}&recognitionDateTo=${recognitionDateTo}&token=${token}`,dto)
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
