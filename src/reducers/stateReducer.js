import lightTheme from '../themes/lightTheme';

/**
* The state reducer is essentially big switch statement, which assigns the action
* payload to the state object depending on the action type.
* @return updated state
*/

export default function reducer(state={
    darkTheme: false,
    theme: lightTheme,
    activePage: {index: 0, title: 'Dashboard'},
    showSingleEntry: false,
    showDeleteDialog: false,
    showNewDialog: false,
    editing: false,
    capslock: false,
    searchQuery: '',
    searchState: false,
    hashedMasterPassword: null,
    }, action) {
    switch(action.type){
        case 'THEME' : {
            return {
                ...state, // never mutate state itself!
                darkTheme: action.payload.darkTheme,
                theme: action.payload.theme,
            }
        }
        case 'SET_ACTIVE_PAGE' : {
            return {
                ...state,
                activePage: {
                    index: action.payload.index,
                    title: action.payload.title,
                }
            }
        }
        case 'DELETE_DIALOG' : {
            return {
                ...state,
                showDeleteDialog: action.payload,
            }
        }
        case 'NEW_DIALOG' : {
            return {
                ...state,
                showNewDialog: action.payload,
            }
        }
        case 'SHOW_SINGLE_ENTRY' : {
            return {
                ...state,
                showSingleEntry: action.payload,
            }
        }
        case 'SET_SEARCH_QUERY' : {
            return {
                ...state,
                searchQuery: action.payload,
            }
        }
        case 'SET_SEARCH_STATE' : {
            return {
                ...state,
                searchState: action.payload,
            }
        }
        case 'EDITING' : {
            return {
                ...state,
                editing: action.payload,
            }
        }
        case 'ERROR' : {
            console.log(action.payload);
            return state;
        }
        case 'CAPSLOCK' : {
            return {
                ...state,
                capslock: action.payload,
            }
        }
        case 'SET_HASHED_MASTERPASSWORD' : {
            return {
                ...state,
                hashedMasterPassword: action.payload,
            }
        }

    }
    return state;
}
