import { csrfFetch } from './csrf';

//action types
const GET_SPOTS = 'spots/GET_SPOTS';

const GET_DETAILS = 'spots/GET_DETAILS';

const GET_REVIEWS = 'spots/GET_REVIEWS';

const ADD_SPOT = 'spots/ADD_SPOT';


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

const getReviews = spotId => {
  return {
    type: GET_REVIEWS,
    spotId
  };
};

const addSpot = spot => {
  return {
    type: ADD_SPOT,
    spot
  }
}


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

export const getSpotReviews = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if(response.ok) {
      const spotReviews = await response.json();
      dispatch(getReviews(spotReviews));
      return spotReviews;
  }else {
      return response; /// what should we return???
  }
}

export const createSpot = data => async dispatch => {
 // console.log("HERE")
      const response = await csrfFetch(`/api/spots`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok){
        const spot = await response.json();
        dispatch(addSpot(spot));
        return spot;
      }
  };


const initialState = {
  allSpots: [],
  spotDetails: {}
};

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
      case GET_REVIEWS:
          console.log("ACTION.SPOTS=================", action)
          newState.spotReviews = action.spotId.Reviews;
          return newState;
      case ADD_SPOT:
        console.log("ADD SPPPPPOOOTTTT, ACTION.SPOT===>", action.spot)

       return null
    default:
      return state;
  }
};

export default spotsReducer;
