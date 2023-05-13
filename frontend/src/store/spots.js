import { csrfFetch } from './csrf';

//action types
const GET_SPOTS = 'spots/GET_SPOTS';

const GET_USERSPOTS = 'spots/GET_USERSPOTS';

const GET_DETAILS = 'spots/GET_DETAILS';

const ADD_SPOT = 'spots/ADD_SPOT';

// const EDIT_SPOT = 'spots/EDIT_SPOT';

const DELETE_SPOT = 'spots/DELETE_SPOT';







// action creators
const getSpots = spots => {
  return {
    type: GET_SPOTS,
    spots
  };
};

const getUserSpots = spots => {
  return {
    type: GET_USERSPOTS,
    spots
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

// const editSpot = spot => {
//   return {
//     type: EDIT_SPOT,
//     spot
//   }
// }

const deleteSpot = spot => {
  return {
    type: DELETE_SPOT,
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

export const getSpotsUser = () => async dispatch => {
  console.log("IN GETSPOTSUSER THUNKKKKKKKK")
  const response = await csrfFetch('/api/spots/current');
  console.log("AFTER FETCH IN SPUTS USER THUNK", response)
  if(response.ok) {
      const spots = await response.json();
      dispatch(getUserSpots(spots.Spots));
      return spots;
  }else {
      return response;
  }
};

export const getSpotDetails = (spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  console.log("GET SPOT DETAILS RESPONSE", response)
  if(response.ok) {
      const spotDetails = await response.json();
      dispatch(getDetails(spotDetails));
      return spotDetails;
  }else {
      return response;
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
      console.log("CREATE SPOT RESONSE", response)
      if (response.ok){
        console.log("RESPONSE..............", response)
        const spot = await response.json();
        console.log("spot''''''''''''''''",spot)
        dispatch(addSpot(spot));
        return spot;
      } else {
        return response
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
         console.log("MODIFY SPOT RESPONSE", response)
         if (response.ok){
           dispatch(getSpotDetails(spot.id));
           dispatch(getAllSpots());
           dispatch(getSpotsUser());
           return response;
         } else {
          return response;
         }
     };

     export const removeSpot = (spotId) => async dispatch => {
      // console.log("HERE")
           const response = await csrfFetch(`/api/spots/${spotId}`,{
            method: 'delete',
            headers: {
              'Content-Type': 'application/json'
            }
           });
           console.log("DELETE RESPONSE", response.json())
           if (response.ok){
            console.log("here after  delete spot fetch")
             dispatch(getAllSpots());
             dispatch(getSpotsUser());
             return response;
           }else {
            return response;
           }
      };

       export const createImage = images => async dispatch => {
        console.log("HERE", images)
        let spotId = images.pop();
         for (let i = 0; i < images.length; i++) {
                let url = images[i];
                let preview = false;
                if (i === 0) {
                    preview = true;
                }
                let imagePayload = {
                    spotId,
                    url,
                    preview,
                }

                const response = await csrfFetch(`/api/spots/${spotId}/images`, {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(imagePayload)
                });

                if(!response.ok) return response;
            }
            dispatch(getAllSpots());
            dispatch(getSpotDetails(spotId));
            return images;

         };




const initialState = {
  allSpots: [],
  spotDetails: {},
  userSpots: [],
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      return Object.assign({}, state, {
        allSpots: action.spots["Spots"]
      });
    case GET_USERSPOTS:
      console.log("ACTION.USER-------------", action.user)
      return Object.assign({}, state, {
        userSpots: action.spots
      });
     case GET_DETAILS:
      return Object.assign({}, state, {
        spotDetails: action.spot
      })
      case ADD_SPOT:
        return Object.assign({}, state, {
          allSpots: [...state.allSpots, action.spot]    // add spot to allSpots array
        });
      // case EDIT_SPOT:
      //   console.log("in EDIT SPOT REDUCER", action.spot)
      case DELETE_SPOT:
        //finish
        return state;



    default:
      return state;
  }
};

export default spotsReducer;
