export default (state, action) => {
    switch(action.type){
        case 'UPDATE_WORKINGHOURS':
            console.log(state)
            return {...state, workingHours: state.workingHours + 1}
        case 'GET_WORKINGHOURS':
            return { ...state, loading: false, workingHours: action.payload.hoursInSec, running: action.payload.startPressed, dbId: action.payload.id};
        case 'WORKINGHOURS_ERROR':
            return {...state, error: action.payload}
        default:
            return state;
    }
}