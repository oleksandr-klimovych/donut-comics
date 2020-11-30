const ON_ERROR_ADD = 'ON_ERROR_ADD';
const ON_SUCCESS_ADD = 'ON_SUCCESS_ADD';
const ON_NOTIFICATION_CLOSE = 'ON_NOTIFICATION_CLOSE';

export const addError = text => ({
    type: ON_ERROR_ADD,
    payload: text
});

export const addSuccess = text => ({
    type: ON_SUCCESS_ADD,
    payload: text
});

export const clearNotification = () => ({
    type: ON_NOTIFICATION_CLOSE
});
