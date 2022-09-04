import axiosAuth from './axios';
import store from '../store/index';





export default class userService {

	static refresh = async () => {
		try {
			const result = await axiosAuth.post('/user/refresh');
			await store.commit('setAccessToken', result.data.accessToken);
            await store.commit('setRefreshToken', result.data.refreshToken);
			return result;
		} catch (err) {
			return err;
		}
	};

    static logout = async (dto,done) => {
			await axiosAuth.post('/user/logout')
            .then(result=>{
                const {data}=result
    
                if (data.success){
                    store.commit("setAccessToken",null);
                    store.commit("setRefreshToken",null);
                    store.commit("logout");
                    done(null,data)
                }
                else{
                    done(new Error('로그아웃 실패'),data)
                }})
            .catch(err=>{done(err,null)})
	};

    static getUser = async (dto,done) => {
        await axiosAuth.get('/user')
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

        await axiosAuth.delete('/user',{data:{...dto}})
            .then(result=>{
                const {data}=result
    
                if (data.success){
                    store.commit("setAccessToken",null);
                    store.commit("setRefreshToken",null);
                    store.commit("logout");
                    done(null,data)
                }
                else{
                    done(new Error('탈퇴 실패'),data)
                }
            })
            .catch(err=>{done(err,null)})
    }


}
