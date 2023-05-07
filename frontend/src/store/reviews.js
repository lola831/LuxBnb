import { csrfFetch } from './csrf';

const GET_REVIEWS = 'reviews/GET_REVIEWS'

const ADD_REVIEW = 'reviews/ADD_REVIEW'

const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const getReviews = reviews => {
    return {
      type: GET_REVIEWS,
      reviews
    };
};

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
        dispatch(getReviews(reviews));
        return reviews;
    }else {
        return response; /// what should we return???
    }
  };

  export const createReview = payload => async dispatch => {
    // console.log("HERE")
         const response = await csrfFetch(`/api/spots/${payload.id}/reviews`, {
           method: 'post',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(payload)
         });
         if (response.ok){
           const review = await response.json();
           dispatch(addReview(review));
           return review;
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
             const review = await response.json();
             dispatch(deleteReview(review));
             return review;
           }
       };

const initialState = {
   userReviews: [],

  };

  const reviewsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
      case GET_REVIEWS:
        // newState.allReviews = {...state, userReviews: action.reviews}
        //nnneeeed to finish???
          return newState;
      case ADD_REVIEW:
      newState.userReviews.push(action.review)
      case DELETE_REVIEW:
        //neeed to fix
      default:
        return state;
    }
  };

  export default reviewsReducer;
