import promiseChain from '../../helpers/promiseChain';
import ApiException from './ApiException';
import config from './../../configs';
import { addError } from './../../actions/notification';
import NetInfo from '@react-native-community/netinfo';

const { backendUrl, test } = config;

export const API_URL = backendUrl + (backendUrl.charAt(backendUrl.length - 1) !== '/' ? '/' : '');

const eventTrigger = (name, info) => {
    console.log('\n', JSON.stringify({ type: name, ...info }));
};

const addMeta = (body) => {
    if (body.data) {
        body.data.meta = body.meta || body.pagination;
        return body.data;
    }
    return body;
};

const getResponceBody = dispatch => response => {

    const { status } = response;

    if (status === 401) throw new Error('401 unauthorized');

    if (status === 404) throw new Error('404 File not found');

    if (status === 502) throw new Error('502 Bad Gateway');

    if (response.headers.get('content-type').includes('application/json')) {
        return response.json();
    }

    if (response.headers.get('content-type').includes('text/html')) {
        return response.text();
    }

    return response.blob();
};

const updateBodyMeta = dispatch => (body) => {
    if (body.error) {
        throw new ApiException(body.error);
    }

    return body.meta || body.pagination ? addMeta(body) : body.data || body;
};

const checkResponse = (action, dispatch, request) => (response) => {
    const { url, body, method } = request;

    if (response && response.error) throw new Error('Api error');

    dispatch({ type: `${action}_SUCCESS`, payload: response, url, method, body });
   
    eventTrigger(`${action}_SUCCESS`, { response, url, method });

    return response;
};

const responseFail = (action, dispatch, request) => (error) => {
    const { url, body, method } = request;
    
    dispatch({ type: `${action}_FAIL`, payload: error, url, method, body });

    eventTrigger(`${action}_FAIL`, { error, url, method });

    return Promise.reject(error);
};

function createRequest(request, action, dispatch, payload) {
    const { url, ...config } = request;
    const { method } = request;

    dispatch({ type: action, payload, body: request.body, url, method });

    eventTrigger(`${action}`, { url, method, payload, body: request.body });

    const fetchData = {
        ...config,
        cache: 'reload',
        headers: {
            ...config.headers
        }
    };

    return promiseChain([
        () => fetch(url, fetchData),
        getResponceBody(dispatch),
        updateBodyMeta(dispatch),
        checkResponse(action, dispatch, request)
    ]).catch(responseFail(action, dispatch, request));
}

export function get(url, action, dispatch, payload) {
    const request = {
        url: API_URL + url,
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    };

    return createRequest(request, action, dispatch, payload);
}

export function post(url, body, action, dispatch) {

    const request = {
        url: API_URL + url,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return createRequest(request, action, dispatch, body);
}

export function upload(url, file, params, action, dispatch) {
    const request = {
        url: API_URL + url + '?' + Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&'),
        method: 'post',
        headers: { 'Content-Type': file.type },
        body: file
    };

    return createRequest(request, action, dispatch, file);
}

export async function uploadBase64({
    url, data, fileType, extension, onProgress, onFinish, dispatch, type
}) {

    const connection = await NetInfo.fetch();
    connection.type === 'none' && dispatch(addError('LostConnection'));

    eventTrigger(type, { size: data.length, fileExtention: extension, url: API_URL + url, method: 'post' });

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', API_URL + url);
    xhttp.setRequestHeader('Content-Type', extension);
    xhttp.setRequestHeader('Content-Disposition', `inline; filename=${fileType}; name=${fileType}`);
    xhttp.upload.addEventListener('progress', event => onProgress && onProgress(event), false);
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState !== 4) return;
        onFinish && onFinish(xhttp);
        xhttp.response && dispatch({ type: `${type}_SUCCESS`, payload: JSON.parse(xhttp.response) });
        
        eventTrigger(`${type}_SUCCESS`, { url: API_URL + url, body: xhttp.response, method: 'post' });
    };
    xhttp.send(data);
}

export function put(url, body, action, dispatch) {
    const request = {
        url: API_URL + url,
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return createRequest(request, action, dispatch, body);
}

export function del(url, action, dispatch) {
    const request = {
        url: API_URL + url,
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    };

    return createRequest(request, action, dispatch, {});
}
