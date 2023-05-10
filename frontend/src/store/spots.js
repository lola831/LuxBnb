import { csrfFetch } from './csrf';

//action types
const GET_SPOTS = 'spots/GET_SPOTS';

const GET_USERSPOTS = 'spots/GET_USERSPOTS';

const GET_DETAILS = 'spots/GET_DETAILS';

const ADD_SPOT = 'spots/ADD_SPOT';

const EDIT_SPOT = 'spots/EDIT_SPOT';

const DELETE_SPOT = 'spots/DELETE_SPOT';

const ADD_IMAGE = 'spots/ADD_IMAGE';





// action creators
const getSpots = spots => {
  return {
    type: GET_SPOTS,
    spots
  };
};

const getUserSpots = user => {
  return {
    type: GET_USERSPOTS,
    user
  };
};

const getDetails = spot => {
  return {
    type: GET_DETAILS,
    spot
  };
};

const addSpot = spot => {
  return {
    type: ADD_SPOT,
    spot
  }
}

const editSpot = spot => {
  return {
    type: EDIT_SPOT,
    spot
  }
}

const deleteSpot = spot => {
  return {
    type: DELETE_SPOT,
    spot
  }
}

const addImage = payload => {
  return {
    type: ADD_IMAGE,
    payload
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

export const getSpotsUser = () => async dispatch => {
  console.log("IN GETSPOTSUSER THUNKKKKKKKK")
  const response = await csrfFetch('/api/spots/current');
  console.log("AFTER FETCH IN SPUTS USER THUNK")
  if(response.ok) {
      const spots = await response.json();
      console.log("spots", spots)

      dispatch(getUserSpots(spots));
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


export const createSpot = data => async dispatch => {
 console.log("HERE============", data)
      const response = await csrfFetch(`/api/spots`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });


      if (response.ok){
        const spot = await response.json();
        console.log("spot''''''''''''''''",spot)
        dispatch(addSpot(spot));
        return spot;
      }
  };

  export const modifySpot = (spot) => async dispatch => {
    // console.log("HERE")
         const response = await csrfFetch(`/api/spots/${spot.id}`, {
           method: 'put',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(spot)
         });

         if (response.ok){
           const spot = await response.json();
           dispatch(editSpot(spot));
           return spot;
         }
     };

     export const removeSpot = (spot) => async dispatch => {
      // console.log("HERE")
           const response = await csrfFetch(`/api/spots/${spot.id}`, {
             method: 'delete',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(spot)
           });

           if (response.ok){
             const spot = await response.json();
             dispatch(deleteSpot(spot));
             return spot;
           }
       };

       export const createImage = (spot) => async dispatch => {
        console.log("HERE", spot)
             const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
               method: 'post',
               headers: {
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify(spot)
             });
             if (response.ok){
               dispatch(addImage(spot));
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
    case GET_USERSPOTS:
      console.log("ACTION.USER-------------", action.user)
      newState.userSpots = action.user.Spots;
      return newState;
     case GET_DETAILS:
      console.log("ACTION.SPOTS", action)
          newState.spotDetails = action.spot;
          return newState;
      case ADD_SPOT:
        console.log("ADD SPPPPPOOOTTTT, ACTION.SPOT===>", action.spot)
        newState.allSpots.push(action.spot);
        return newState;

      case ADD_IMAGE:
        

      // return null
      case EDIT_SPOT:
        console.log("in EDIT SPOT REDUCER", action.spot)
      case DELETE_SPOT:
        //finish
        return newState;



    default:
      return state;
  }
};

export default spotsReducer;
