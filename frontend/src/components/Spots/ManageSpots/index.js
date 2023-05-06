import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsUser } from "../../../store/spots";
import { NavLink, Link } from "react-router-dom";
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

    const noSpots = () => {
        if (!userSpots.length) {
            console.log("in NOOOOOOOOOOOOOOO spots")
            return (
                <>
                <Link to='/spots/new'>
                    <button>Create A New Spot</button>
                </Link>
                </>
            )
        }
    }

    if(userSpots) {
        return (
            <>
            <h2>Manage Your Spots</h2>
            <Link to='/spots/new'>
                    <button>Create A New Spot</button>
                </Link>
            {noSpots()}
            <div>
            {
                    userSpots.map(spot => (

                        <>
                        <div className="individual-spot">
                      <NavLink key={`${spot.id}`} className="spot-links" to={`/spots/${spot.id}`} >
                         <img style={{width:'200px', height:'200px'}} alt="" src={`${spot.previewImage}`} />
                      </NavLink>
                      <div>{`${spot.city}, ${spot.state}`}</div>
                      <NavLink to={`/spots/${spot.id}/edit`}>
                      <button>Update</button>
                      </NavLink>
                      <button>Delete</button>
                      <div>{`${spot.avgRating}`}</div>
                      <div>{`$${spot.price}/night`}</div>
                      </div>
                      </>
                    ))
                }
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
