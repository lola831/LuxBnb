import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetails } from "../../../store/spots";
import { getUserReviews, getSpotReviews } from "../../../store/reviews";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import OpenModalButton from "../../OpenModalButton";
import CreateReviewForm from "../../Reviews/CreateReviewForm";
import DeleteReviewModal from "../../Reviews/DeleteReviewModal";
import './SpotDetails.css';

const SpotDetails = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.spotDetails);
    const spotReviews = useSelector(state => state.reviews.spotReviews);
    //const userReviews = useSelector(state => state.reviews.userReviews);

    console.log("SPOOOOOOTTTTT: ", spot)
    console.log("spot reviews: ", spotReviews)
    console.log("SESSSION USER", sessionUser);
    useEffect(() => {
        console.log("IN SUBMIT2222=========")
        dispatch(getSpotDetails(id));
        dispatch(getSpotReviews(id));
       // dispatch(getUserReviews())
    }, [dispatch, id]);

    const checkReviews = () => {
        if (sessionUser.id !== spot.Owner.id) {
            if (spotReviews.some(r => r.User.id === sessionUser.id) === false) return true;
        }
        return false
    }


    if (Object.keys(spot).length) {
        console.log("AFTERRRRRRRRRR")
        return (
            <>
                <h2>{`${spot.name}`}</h2>
                <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
                <div className="images">
                    {
                        spot.SpotImages.map(image => (
                            <img style={{ width: '200px', height: '200px' }} src={`${image.url}`} alt=""/>
                        ))
                    }
                </div>
                <div className="description">
                    <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                    <p>{`${spot.description} `}</p>
                </div>
                <div className="reserve-box">
                    <div>{`$${spot.price}night `}</div>
                    <div>{`${spot.avgStarRating}`}</div>
                    <div>{`${spot.numReviews} reviews`}</div>
                    <button onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
                </div>
                <div className="reviews-container">
                    <h2>{`${spot.avgStarRating} stars   ${spot.numReviews} reviews`}</h2>

                    {spotReviews.length && (
                        <>
                            {checkReviews() && (
                                <OpenModalButton
                                buttonText="Post Your Review"
                                modalComponent={<CreateReviewForm spotId={spot.id} />}
                                />
                            )}

                         {/* <button>Post Your Review</button> */}

                    <div className="reviews">
                        {
                            spotReviews.map(review => (
                                <>
                                    <h3>{`${review.User.firstName}`}</h3>
                                    <h3>{`${review.createdAt}`}</h3>
                                    <p>{`${review.review}`}</p>
                                    {
                                        review.User.id === sessionUser.id && (
                                            <OpenModalButton
                                                buttonText="Delete"
                                                // onItemClick={closeMenu}
                                                modalComponent={<DeleteReviewModal review={review} />}
                                            />
                                        )}
                                </>
                            ))
                        }
                    </div>
                    </>
                      )}
                </div>
            </>
        )
    } else {
        console.log("IN ELSEEEEEEEEEEEEE")
        return (
            <div>Loading....</div>
        )
    }

}

export default SpotDetails;
