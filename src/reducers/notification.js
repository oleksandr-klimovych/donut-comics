const ON_ERROR_ADD = 'ON_ERROR_ADD';
const ON_SUCCESS_ADD = 'ON_SUCCESS_ADD';
const ON_NOTIFICATION_CLOSE = 'ON_NOTIFICATION_CLOSE';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case ON_ERROR_ADD:            
            return {
                type: 'error',
                text: action.payload
            };
        case ON_SUCCESS_ADD:
            return {
                type: 'success',
                text: action.payload
            };
        case ON_NOTIFICATION_CLOSE:
            return initialState;
        default:
            return state;
    }
};
