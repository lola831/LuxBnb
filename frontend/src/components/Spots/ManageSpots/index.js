import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsUser } from "../../../store/spots";
import { NavLink, Link, withRouter } from "react-router-dom";
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalButton from "../../OpenModalButton";
import UpdateSpot from "../UpdateSpot";
import "./ManageSpots.css"
const ManageSpots = () => {
    console.log("HEEEERE IN USER")
    const dispatch = useDispatch();

    const userSpots = useSelector(state => state.spots.userSpots)
    //hereee continue
    console.log("IN  user SPOTS COMPONENT", userSpots);

    useEffect(() => {
        console.log("IN USEEFFECT BEFORE DISPACTH MANAGESPOTS")
        dispatch(getSpotsUser());
    }, [dispatch]);


    if (userSpots) {
        return (
            <>
                <div className="manage-container">
                    <div className="manage-title">
                        <h2>Manage Your Spots</h2>
                    </div>
                    <div className="manage-create">
                        <NavLink to='/spots/new'>
                            <button>Create A New Spot</button>
                        </NavLink>
                    </div>

                    {userSpots.length && (
                        <div className="manage-wrapper">
                            {
                                userSpots.map(spot => (
                                    <>
                                        <div className="manage-spot-info" key={`${spot.id}`} >
                                            <div className="manage-photo">
                                                <NavLink to={`/spots/${spot.id}`} >
                                                    <img className="manage-image" style={{ width: '200px', height: '200px' }} alt="" src={`${spot.previewImage}`} />
                                                </NavLink>
                                            </div>

                                            <div className="manage-location">
                                                <div className="loc">{`${spot.city}, ${spot.state}`}</div>
                                            </div>
                                            <div className="manage-rating">
                                            <i className="fa-sharp fa-solid fa-star"></i>
                                            {
                                                spot.avgRating ? (
                                                    <div>{` ${spot.avgRating.toFixed(1)}`}</div>
                                                ) : (
                                                    <div>New</div>
                                                )
                                            }

                                            </div>
                                            <div className="manage-price">
                                                <div className="pric">{`$${spot.price}/night`}</div>
                                            </div>
                                            <div className="manage-update-delete">
                                                <div className="manage-update">
                                                <NavLink exact to={`/spots/${spot.id}/edit`}>
                                                    <button>Update</button>
                                                </NavLink>
                                                </div>
                                                <div className="manage-delete">
                                                <OpenModalButton
                                                className="manage-delete-button"
                                                    buttonText="Delete"
                                                    // onItemClick={closeMenu}
                                                    modalComponent={<DeleteSpotModal spotId={spot.id} />}
                                                />
                                                </div>
                                            </div>
                                        </div>


                                    </>
                                ))
                            }
                        </div>
                    )}
                </div>
            </>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }

}

export default ManageSpots;
