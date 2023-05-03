import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetails } from "../../../store/spots";
import './SpotDetails.css';

const SpotDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.spotDetails);

    console.log("SPOOOOOOTTTTT: ", spot)
    
    useEffect(() => {
        dispatch(getSpotDetails(id));
    }, [dispatch]);

}

export default SpotDetails;
