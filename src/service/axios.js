import axios from 'axios';
import userService  from './user.service';
import router from '../router';
import store from '../store/index';



const axiosAuth = axios.create({
	baseURL: process.env.VUE_APP_BACK_URL,
	// withCredentials: true,
});



axiosAuth.interceptors.request.use(
	async function(config) {
		try {
			config.headers.common = {
				Authorization: 'Bearer ' + store.getters.accessToken,
				refresh: store.getters.refreshToken
			};
		} catch (err) {}
		return await config;
	},
	function(error) {
		return Promise.reject(error);
	},
);


axiosAuth.interceptors.response.use(
	function(response) {
		// 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    	// 응답 데이터가 있는 작업 수행
		return response;
	},
	async function(error) {
		const result = error.config;
		if (error.response.status === 401 && result.retry != true) {
			result.retry = true;
			const res = await userService.refresh();
			error.response.config.headers = {
				Authorization: 'Bearer ' + res.data.accessToken,
				refresh: 'Bearer ' + res.data.refreshToken
			};
			return await axiosAuth(result);
		} 
		else if(error.response.status === 404){
			alert('페이지를 불러올 수 없습니다.');
			router.push('/').catch(() => {});
		}
		else {
			alert('응답 오류.');
			// router.push('/').catch(() => {});
		}
		return Promise.reject(error);
	},
);

export default axiosAuth;
