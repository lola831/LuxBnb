import { csrfFetch } from './csrf';

//action types
const GET_SPOTS = 'spots/GET_SPOTS';


// action creators
const getSpots = spots => {
  return {
    type: GET_SPOTS,
    spots
  };
};


// thunks

//get all spots
export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if(response.ok) {
        const spots = await response.json();
        dispatch(getSpots(spots));
        return spots;

    }else {
        return response; /// what should we return???
    }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState = { ...state };
  switch (action.type) {
    case GET_SPOTS:
      newState.allSpots = action.spots["Spots"]
        return newState;
    default:
      return state;
  }
};

export default spotsReducer;
