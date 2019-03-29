import axios from 'axios'
import {Modal} from 'antd'
import {appID,appKey} from "../mainUti";
// import {CasServerUrl, JavaServerHost} from "../common/const/config";

//携带cookie
axios.defaults.withCredentials = false;

const className = 'charles-not-login-modal';
// const head_app = {
//   'X-Kii-AppID' : '3xr2fxuy9lpn',
//   'X-Kii-AppKey': '0212b3b2780a44dabf99b8e72ea8dd6c'
// }
const head_app = {
  'X-Kii-AppID' : appID,
  'X-Kii-AppKey': appKey
}
axios.interceptors.response.use(config => {
  return config;
}, err => {
  Modal.error({
    title: '提示',
    content: (
     <div>{err.response.data.message}</div>
    ),
    onOk() {
      if (err.response.data.errorCode ==='WRONG_TOKEN') {
        window.location.href = "/user/login"
      }
    },
  })
  return Promise.reject('请求异常');
});
// axios.interceptors.response.use(data => {
//   if (data.data.code === 202) {
//     return Promise.reject();
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
export const sendPut = (url, params, headers) => {
  return axios.put(url, params,
    {
      headers
    }
  )
}

export const sendPatch = (url, params, headers) => {
  return axios.patch(url, params,
    {
      headers
    }
  )
}
