import * as api from '../services/api';

import { addError } from './notification';

const GETTING_COMICSES = 'GETTING_COMICSES';
const GETTING_COMICS_DETAILS = 'GETTING_COMICS_DETAILS';
const GETTING_COMICS_PAGES = 'GETTING_COMICS_PAGES';

export const getComicsesList = () => dispatch => 
    api.get('discovery', GETTING_COMICSES, dispatch)
    .catch(error => dispatch(addError('FailGettingComicses')));

export const getComicsDetails = id => dispatch => 
    api.get(`comics/${id}`, GETTING_COMICS_DETAILS, dispatch)
    .catch(error => dispatch(addError('FailGettingComicsDetails')));

export const getComicsPages = id => dispatch => 
    api.get(`comics/${id}/pages`, GETTING_COMICS_PAGES, dispatch)
    .catch(error => dispatch(addError('FailGettingComicsPages')));
