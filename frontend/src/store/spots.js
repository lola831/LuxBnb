import { csrfFetch } from './csrf';

//action types
const GET_SPOTS = 'spots/GET_SPOTS';

const GET_DETAILS = 'spots/GET_DETAILS';


// action creators
const getSpots = spots => {
  return {
    type: GET_SPOTS,
    spots
  };
};

const getDetails = spotId => {
  return {
    type: GET_DETAILS,
    spotId
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

export const getSpotDetails = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if(response.ok) {
      const spotDetails = await response.json();
      dispatch(getDetails(spotDetails));
      return spotDetails;
  }else {
      return response; /// what should we return???
  }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  //console.log("IN SPOT REDUCER")
    let newState = { ...state };
  switch (action.type) {
    case GET_SPOTS:
      newState.allSpots = action.spots["Spots"]
        return newState;
     case GET_DETAILS:
      //console.log("ACTION.SPOTS", action)
          newState.spotDetails = action.spotId;
          return newState;
    default:
      return state;
  }
};

export default spotsReducer;
