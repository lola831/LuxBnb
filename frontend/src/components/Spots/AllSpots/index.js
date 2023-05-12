import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../../store/spots";
import { NavLink } from "react-router-dom";
import "./AllSpots.css"
import { ToolTip } from "../../ToolTip";

const AllSpots = () => {
    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots.allSpots)

    console.log("IN SPOTS COMPONENT", allSpots);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    if (allSpots) {
        return (
            <div className="spots-container">
                <div className="spots-wrapper">
                {
                    allSpots.map(spot => (
                        <>
                            <div className="individual-spot">
                                <NavLink className="spots-links-main" key={`${spot.id}`} to={`/spots/${spot.id}`} >
                                    <ToolTip text={`${spot.name}`}>
                                        <img className="spot-images-main" src={`${spot.previewImage}`} />
                                    </ToolTip>
                                    <div className="location-star">
                                        <div>{`${spot.city}, ${spot.state}`}</div>
                                        {spot.avgRating ? (
                                            <div>
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                {` ${spot.avgRating.toFixed(1)}`}
                                            </div>
                                        ) : (
                                            <div>
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                New
                                            </div>
                                        )}

                                    </div>

                                    <div>{`$${spot.price} night`}</div>
                                </NavLink>
                            </div>
                        </>
                    ))
                }
                </div>
            </div>
        )
    } else {
        return null;
    }

}

export default AllSpots;
