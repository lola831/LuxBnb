import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsUser } from "../../../store/spots";
import { NavLink, Link } from "react-router-dom";
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalButton from "../../OpenModalButton";
import UpdateSpot from "../UpdateSpot";

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


    if(userSpots) {
        return (
            <>
            <h2>Manage Your Spots</h2>

            <NavLink to='/spots/new'>
                <button>Create A New Spot</button>
            </NavLink>

            {userSpots.length && (
                <div>
                {
                    userSpots.map(spot => (
                        <>
                        <div key={`${spot.id}`} >
                            <NavLink to={`/spots/${spot.id}`} >
                            <img style={{width:'200px', height:'200px'}} alt="" src={`${spot.previewImage}`} />
                            </NavLink>
                            <div>{`${spot.city}, ${spot.state}`}</div>
                            <div>{`${spot.avgRating}`}</div>
                            <div>{`$${spot.price}/night`}</div>
                            <NavLink exact to={`/spots/${spot.id}/edit`}>
                                <button >Update</button>
                            </NavLink>
                            <OpenModalButton
                                buttonText="Delete"
                                // onItemClick={closeMenu}
                                modalComponent={<DeleteSpotModal spotId={spot.id} />}
                            />
                            </div>
                        </>
                    ))
                }
                </div>
            )}

        </>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }

}

export default ManageSpots;
