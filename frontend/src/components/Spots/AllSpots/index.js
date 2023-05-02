import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../../store/spots";

const AllSpots = () => {
    const dispatch = useDispatch();

    const allSpots = useSelector(state => state.spots.allSpots)

    console.log("IN SPOTS COMPONENT", allSpots)
   

    useEffect(() => {
        dispatch(getAllSpots());
      }, [dispatch]);

    return (
        <div className="allSpots">
            {

            }
        </div>
    )

}

export default AllSpots;
