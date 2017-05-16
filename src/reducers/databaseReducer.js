
/**
* The database reducer is essentially big switch statement, which assigns the
* action payload to the state object depending on the action type.
* @return updated state
*/

export default function reducer(state={
        database: [],
        activeEntry: {_id: null, user: null, url:null, password: null,},
        securityScore: { score: 0, count: 0, entries: [], },
        loaded: false,
    }, action) {
    switch(action.type){
        case 'DATABASE_LOADED' : {
            return {
                ...state, // never mutate state itself!
                loaded: action.payload,
            }
        }
        case 'UPDATE_DATABASE' : {
            return {
                ...state,
                database: action.payload,
            }
        }
        case 'ERROR' : {
            console.log(action.payload);
            return state;
        }
        case 'UPDATE_ACTIVE_ENTRY' : {
            return {
                ...state,
                activeEntry: action.payload,
            }
        }
        case 'UPDATE_SCORE' : {
            return {
                ...state,
                securityScore: action.payload,
            }
        }
    }
    return state;
}
