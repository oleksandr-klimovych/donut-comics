
import moment from 'moment';
import 'moment/locale/uk';

export default dateFormat = date => moment(date.replace('.000Z','')).locale('uk').format('DD MMMM YYYY');
