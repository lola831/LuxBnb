import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../../store/spots";
import { NavLink } from "react-router-dom";

const AllSpots = () => {
    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots.allSpots)

    //console.log("IN SPOTS COMPONENT", allSpots)

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);


    if(allSpots) {
        return (
            <div className="spots-container">
                <div className="spot-images">
                {
                    allSpots.map(spot => (
                        <>
    
                      <NavLink key={`${spot.id}`} className="spot-links" to={`/spots/${spot.id}`} >
                        {/* { let url = spot.previewImage } */}
                         <img src={`${spot.previewImage}`} />

                      </NavLink>
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
