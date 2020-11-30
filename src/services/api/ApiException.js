export default class ApiException extends Error{
    constructor({name, ...params}){
        super(name);
        Object.keys(params).forEach((paramKey) => {
            this[paramKey] = params[paramKey];
        });
    }
}
