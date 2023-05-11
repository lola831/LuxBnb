import { csrfFetch } from './csrf';
import { getSpotDetails } from './spots';

const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'

const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS'

const ADD_REVIEW = 'reviews/ADD_REVIEW'

const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const getReviewsSpot = reviews => {
    return {
      type: GET_SPOT_REVIEWS,
      reviews
    };
};

const getReviewsUser = reviews => {
  return {
    type: GET_USER_REVIEWS,
    reviews
  }
}

const addReview = review => {
  return {
    type: ADD_REVIEW,
    review
  };
};

const deleteReview = review => {
  return {
    type: DELETE_REVIEW,
    review
  };
};

export const getUserReviews = () => async dispatch => {
    console.log("IN get user reviews THUNKKKKKKKK")
    const response = await csrfFetch('/api/reviews/current');
    console.log("AFTER FETCH IN get USER reviews THUNK")
    if(response.ok) {
        const reviews = await response.json();
       // console.log("reviews", reviews)
        dispatch(getReviewsUser(reviews));
        return reviews;
    }else {
        return response; /// what should we return???
    }
  };

  export const getSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if(response.ok) {
        const spotReviews = await response.json();
        dispatch(getReviewsSpot(spotReviews));
        return spotReviews;
    }else {
        return response; /// what should we return???
    }
  }

  export const createReview = payload => async dispatch => {
     console.log("HERE IN CREATE REV THUNK")
         const response = await csrfFetch(`/api/spots/${payload.id}/reviews`, {
           method: 'post',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(payload)
         });
         if (response.ok){
          dispatch(getSpotDetails(payload.id));
          dispatch(getSpotReviews(payload.id))
         }else {
          return response;
         }
     };
     export const removeReview = (review) => async dispatch => {
      // console.log("HERE")
           const response = await csrfFetch(`/api/reviews/${review.id}`, {
             method: 'delete',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(review)
           });

           if (response.ok){
             //const review = await response.json();
             console.log("IN REMOVEREVIEW THUNK", review)
             //dispatch(deleteReview(review));
             dispatch(getSpotDetails(review.spotId))
             dispatch(getSpotReviews(review.spotId))
             return review;
           }else {
            return response;
           }
       };

const initialState = {
  spotReviews: [],
  userReviews: [],
};

  const reviewsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
      case GET_SPOT_REVIEWS:
        console.log("action.reviews =============", action.reviews)
       // newState = Object.assign({}, state);
        newState.spotReviews = action.reviews.Reviews;
          return newState;
      case GET_USER_REVIEWS:
       // newState = Object.assign({}, state);
        newState.userReviews = action.reviews.Reviews;
        return newState;
      case ADD_REVIEW:
       // newState = Object.assign({}, state);
        console.log("action add review=========>", action.review)
      newState.spotReviews.push(action.review)
      newState.userReviews.push(action.review)
      return newState;
      case DELETE_REVIEW:
        console.log("ACTION DELETE REVIEWWWWW====>", action.review)

        let index;
        for (let i = 0; i < newState.spotReviews.length; i++){
          if (newState.spotReviews[i].User.id === action.review.User.id) {
            index = i;
          }
        }

        let arr = newState.spotReviews.splice(index, 1)
        delete newState.spotReviews;
        newState.spotReviews = arr;
        return newState;



        //neeed to fix
      default:
        return state;
    }
  };

  export default reviewsReducer;
