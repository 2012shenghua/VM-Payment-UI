import axios from 'axios'
import {Modal} from 'antd'
// import {CasServerUrl, JavaServerHost} from "../common/const/config";

//携带cookie
axios.defaults.withCredentials = false;

const className = 'charles-not-login-modal';
const head_app = {
  'X-Kii-AppID' : '3xr2fxuy9lpn',
  'X-Kii-AppKey': '0212b3b2780a44dabf99b8e72ea8dd6c'
}
axios.interceptors.request.use(config => {
  return config;
}, err => {
  const length = document.getElementsByClassName(className).length
  if (!length) {
    Modal.error({ content: '请求超时!', className: className });
  }
  return Promise.resolve(err);
});
// axios.interceptors.response.use(data => {
//   if (data.data.code === 202) {
//     const content = '警告：' + (data.data.msg);
//     Modal.warning({ content, title: '请求注意' });
//     return Promise.reject(content);
//   } else if ((data.data.code >= 200 && data.data.code < 201) || (data.data.code > 202 && data.data.code < 210)) {
//     return data.data;
//   } else {
//     const content = '请求错误' + (data.data.msg && '，错误信息：' + data.data.msg);
//     Modal.error({ content, title: '请求失败' });
//     return Promise.reject(content);
//   }
// }, err => {
//   const length = document.getElementsByClassName(className).length
//   if (err && err.response && !length) {

//     switch (err.response.status) {
//       case 400:
//         if (err.response.data) {
//           Modal.error({ content: `参数有误，${err.response.data.msg}`, className: className })
//         } else {
//           Modal.error({ content: `API请求 ${err.response.config.method} ${err.response.config.url} 参数有误，请联系系统管理员`, className: className })
//         }
//         break
//       case 404:
//         Modal.error({ content: `API请求 ${err.response.config.method} ${err.response.config.url} 不存在，请联系系统管理员`, className: className })
//         break
//       case 408:
//         Modal.error({ content: `API请求 ${err.response.config.method} ${err.response.config.url} 超时，请再次尝试`, className: className })
//         break
//       default:
//         Modal.error({ content: `请求内部异常，请联系管理员`, className: className })
//         break
//     }
//   }
//   if ((err instanceof Error) && !length) {
//     Modal.error({ content:  err.message, className});
//   }

//   if (err && err.response) {
//     return Promise.reject(err.response.data);
//   } else if (err) {
//     return Promise.reject(err);
//   } else {
//     return Promise.reject("请求异常");
//   }
// })

export const ContentType = {
  JSON: 'application/json',
  FORM: 'application/x-www-form-urlencoded'
};

export const postRequest = (url, params, header) => {
  return axios({
    method: "post",
    url: url,
    headers: header,
    params: params,
  })
}


export const getRequest = (url, params, header_params) => {
  const header = {
    ...head_app,
    ...header_params
  }
  return axios({
    method: "get",
    url,
    headers: header,
    params,
  })
}

export const sendGetRequest  = (url, params = {}) => {
  return axios.get(`${url}`, { params })
}

export const postRequestPre = (url, params, header) => {
  return axios.post(`${url}`, params, header )
}

export const patchRequestPre = (url, params, contentType = ContentType.FORM) => {
  return axios({
    method: "patch",
    url: url,
    headers: {
      'Content-type': contentType
    },
    params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  })
}

export const sendPost = (url, params, headers) => {
  return axios.post(url, params,
    {
        headers
    }
  )
}

