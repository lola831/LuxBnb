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

    if(allSpots) {
        return (
            <div className="spots-container">
                <div className="spots-wrapper">
                {
                    allSpots.map(spot => (

                        <>
                        <div className="individual-spot">



                      <NavLink key={`${spot.id}`} className="spot-links" to={`/spots/${spot.id}`} >
                      <ToolTip text={`${spot.name}`}>
                         <img style={{width:'250px', height:'250px'}} src={`${spot.previewImage}`} />
                         </ToolTip>
                      </NavLink>
                      <div>{`${spot.city}, ${spot.state}`}</div>
                      <div>{`${spot.avgRating}`}</div>
                      <div>{`$${spot.price}/night`}</div>




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
