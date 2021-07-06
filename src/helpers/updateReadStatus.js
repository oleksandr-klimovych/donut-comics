
import { store } from './../store';

export const updateReadStatus = (arr, force) => {
    const { messages: { viewedList } } = store.getState();
    return arr.map(item => ({
        ...item,
        viewed: force ? force : viewedList.includes(item.id)
    }));;
};
