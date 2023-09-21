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
        let check = true;
        spotReviews.forEach(review => {
            if (review.userId === sessionUser.id) {
                check = false;
            }
        })
        return check;
    }
    const monthYear = (dateStr) => {
        let date = new Date(dateStr);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[date.getMonth()] + " " + date.getFullYear();
    }


    if (Object.keys(spot).length) {
        let previewImage = spot.SpotImages[0].url
        console.log("IMAGEEEEEE ", spot)
        let imageArr = []
        if (spot.SpotImages.length > 1) {
          imageArr = spot.SpotImages.slice(1);
        }

        return (
            <div className="details-container">

                <div className="details-name">{`${spot.name}`}</div>
                <div className="details-location">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
                <div className="details-image-container">
                    <div className="preview-details">
                        <img className="main-img" src={`${previewImage}`} alt="" />
                    </div>
                    <div className="small-details">
                        {
                            imageArr.length && (
                                imageArr.map((image, i) => (

                                        <img className={i === 2 ? "small-img-2": i=== 3 ? "small-img-3" : "small-img"} src={`${image.url}`} alt="" />

                                ))
                            )
                        }
                    </div>
                </div>
                <div className="description-reserve">
                    <div className="description-wrapper">
                        <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                        <p>{`${spot.description} `}</p>
                    </div>
                    <div className="reserve-box">
                        <div className="first-row">
                            <div className="details-price">{`$${spot.price} night `}</div>
                            <div className="details-star-review">
                                {spot.numReviews > 0 ? (
                                    <>
                                        <div className="details-small-star">
                                            <i className="fa-sharp fa-solid fa-star"></i>
                                            {spot.avgStarRating.toFixed(1)}  ·
                                        </div>
                                        {spot.numReviews === 1 ? (
                                            <div className="details-small-review">{`${spot.numReviews} review`}</div>
                                        ) : (
                                            <div className="details-small-review">{`${spot.numReviews} reviews`}</div>
                                        )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <div className="details-small-star">
                                            <i className="fa-sharp fa-solid fa-star"></i>
                                            <span> New</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="reserve-button">
                            <button style={{color: "white"}}  className="reserve" onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
                        </div>
                    </div>
                </div>

                <div className="reviews-details">

                    {spot.numReviews === 0 ? (
                        <>
                            <div className="first-line-details">
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <span> New</span>
                                <div>
                                    {sessionUser && sessionUser.id !== spot.Owner.id && (
                                        <>
                                            <OpenModalButton
                                                buttonText="Post Your Review"
                                                modalComponent={<CreateReviewForm spotId={spot.id} />}
                                            />
                                            <p>Be the first to post a review!</p>
                                        </>
                                    )}
                                </div>
                            </div>

                        </>
                    ) : (
                        <>
                            <div className="first-line-details">
                                <p><span>

                                    <i className="fa-sharp fa-solid fa-star"></i>
                                    {spot.avgStarRating.toFixed(1)}  ·
                                </span>

                                    {spot.numReviews === 1 ? (
                                        <span>{` ${spot.numReviews} review`}</span>
                                    ) : (
                                        <span>{` ${spot.numReviews} reviews`}</span>
                                    )
                                    }
                                </p>
                            </div>


                            {spotReviews.length && (
                                <>
                                <div className="post-your-review">
                                    {sessionUser && sessionUser.id !== spot.Owner.id && checkReviews() && (
                                        <OpenModalButton
                                            buttonText="Post Your Review"
                                            modalComponent={<CreateReviewForm spotId={spot.id} />}
                                        />
                                    )}
                                </div>
                                <div className="details-review-section">
                                        {
                                            spotReviews.slice(0).reverse().map(review => (
                                                <>
                                                    <h3 className="name-details">{`${review.User.firstName}`}</h3>
                                                    {/* {monthYear(review.createdAt)} */}
                                                    <h3 className="details-date"> {monthYear(review.createdAt)}</h3>
                                                    <p>{`${review.review}`}</p>
                                                    {sessionUser &&
                                                        review.User.id === sessionUser.id && (
                                                            <div className="details-delete-button">
                                                            <OpenModalButton
                                                                buttonText="Delete"

                                                                modalComponent={<DeleteReviewModal review={review} />}
                                                            />
                                                            </div>
                                                        )}
                                                </>
                                            ))
                                        }
                                </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        )
    } else {
        console.log("IN ELSEEEEEEEEEEEEE")
        return (
            <div>Loading....</div>
        )
    }

}

export default SpotDetails;
