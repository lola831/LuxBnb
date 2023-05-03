import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetails, getSpotReviews } from "../../../store/spots";
import './SpotDetails.css';

const SpotDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.spotDetails);
    const reviews = useSelector(state => state.spots.spotReviews);

    //console.log("SPOOOOOOTTTTT: ", spot)
    console.log("reviews: ", reviews)

    useEffect(() => {
        dispatch(getSpotDetails(id));
        dispatch(getSpotReviews(id));
    }, [dispatch]);


    if(spot && reviews){
        return (
            <>
            <h2>{`${spot.name}`}</h2>
            <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
            <div className="images">
                {
                    spot.SpotImages.map(image => (
                        <img style={{width:'200px', height:'200px'}} src={`${image.url}`} />
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
            </div>
            <div className="reviews-container">
                <h2>{`${spot.avgStarRating} stars   ${spot.numReviews} reviews`}</h2>
                <div className="reviews">
                    {
                        reviews.map(review => (
                            <>
                            <h3>{`${review.User.firstName}`}</h3>
                            <h3>{`${review.createdAt}`}</h3>
                            <p>{`${review.review}`}</p>
                            </>
                        ))
                    }
                </div>
            </div>
            </>
        )
    }else {
        return null;
    }

}

export default SpotDetails;
