import axios from 'axios'

const httpHelper = {}

httpHelper.install = function fn(Vue) {
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    //axios拦截器
    //当不是登录的时候添加Authoriza
    axios.interceptors.request.use(function (config) {
        if (config.url !== 'login') {
            config.headers.Authorization = localStorage.getItem('token');
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    })

    Vue.prototype.$http = axios
}
export default httpHelper;