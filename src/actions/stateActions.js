import { verifyPassword } from '../crypto';

/*
* The state reducer handles all application state changes.
*/

/**
* Sets theme
* @param theme theme to set
* @param bool if toggle in settings should be set to true or not
*
* @returns {action} of type 'THEME' with the theme and bool as a payload
*/

export function setTheme(theme, bool) {
    return {
        type: 'THEME',
        payload: {theme: theme, darkTheme: bool},
    }
}

/**
* Sets active page
* @param pageNumber page-index
* @param pageTitle sets page-title
*
* @returns {action} of type 'SET_ACTIVE_PAGE' with the page-index and title as a payload
*/

export function setActivePage(pageNumber, pageTitle) {
    return {
        type: 'SET_ACTIVE_PAGE',
        payload: {index: pageNumber, title: pageTitle},
    }
}

/**
* Sets application is in edit mode
* @param bool state to set
*
* @returns {action} of type 'EDITING' with boolean as a payload
*/

export function editing(bool) {
    return {
        type: 'EDITING',
        payload: bool,
    }
}

/**
* Registers the current state of capslock in the store
* @param bool capslock state
*
* @returns {action} of type 'CAPSLOCK' with boolean as a payload
*/

export function capslock(bool) {
    return {
        type: 'CAPSLOCK',
        payload: bool,
    }
}


/**
* Sets active page
* @param pageNumber page-index
* @param pageTitle sets page-title
*
* @returns {action} of type 'SET_ACTIVE_PAGE' with the page-index and title as a payload
*/

export function showDeleteDialog(bool) {
    return {
        type: 'DELETE_DIALOG',
        payload: bool,
    }
}

export function showSingleEntry(bool) {
    return {
        type: 'SHOW_SINGLE_ENTRY',
        payload: bool,
    }
}

export function showNewDialog(bool) {
    return {
        type: 'NEW_DIALOG',
        payload: bool,
    }
}

export function setSearchQuery(query) {
    return {
        type: 'SET_SEARCH_QUERY',
        payload: query,
    }
}

export function setSearchState(bool) {
    return {
        type: 'SET_SEARCH_STATE',
        payload: bool,
    }
}
export function setHashedMasterPassword(password){
    return {
        type: 'SET_HASHED_MASTERPASSWORD',
        payload: password,
    }
}
