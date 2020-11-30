import uk_UA from './uk-UA.json';
import moment from 'moment';

moment.locale('uk');

const translations = {
    'uk-UA': uk_UA
};

export default translations[navigator.language] || translations['uk-UA'];