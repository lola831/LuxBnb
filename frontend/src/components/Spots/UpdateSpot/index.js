import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getSpotDetails, modifySpot } from "../../../store/spots";


const UpdateSpot = () => {
    const { id } = useParams();
     console.log("IDDDDDDDD", id)
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots.spotDetails);

    console.log("SPOOOOOOTTTTT: ", spot)

    useEffect(() => {
        dispatch(getSpotDetails(id));
        setCountry(spot.country)
        setAddress(spot.address)
        setCity(spot.city)
        setState(spot.state)
        setLat(spot.lat)
        setLng(spot.lng)
        setDescription(spot.description)
        setName(spot.name)
        setPrice(spot.price)
        setImages(spot.SpotImages)

    }, [dispatch, spot.country]);


        const [country, setCountry] = useState(spot?spot.country : "");
        const [address, setAddress] = useState(spot.address);
        const [city, setCity] = useState(spot.city);
        const [state, setState] = useState(spot.state);
        const [lat, setLat] = useState(spot.lat);
        const [lng, setLng] = useState(spot.lng);

        const [description, setDescription] = useState(spot.description);
        const [name, setName] = useState(spot.name);
        const [price, setPrice] = useState(spot.price);
        const [images, setImages] = useState([spot.SpotImages]);


    const urlImages = [];
    console.log("IMAGES: ", images)
    if(spot.SpotImages){
        console.log("in ifffff")

        for (let i = 0; i < spot?.SpotImages.length; i++) {
             urlImages.push(
                    <input
                    type="text"
                    value={spot?.SpotImages[i].url}
                    key= {i}
                    alt=""
                    placeholder="Image URL"
                    onChange={(e) => setImages([...images, e.target.value])}
                    />
                )
        }
    }
    console.log("COUNTRY======", country)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("HERE IN HANDLESUBMIT1")
        const payload = {
            ...spot,
            country,
            address,
            city,
            state,
            lat,
            lng,
            description,
            name,
            price,
            images
        }



        let updatedSpot;
        updatedSpot = await dispatch(modifySpot(payload));
        console.log("HERE IN HANDLESUBMIT2")

        if(updatedSpot) {
            console.log("HERE IN HANDLESUBMIT3")
            history.push(`/spots/${updatedSpot.id}`);   // ????????
            // clear form ?????
        }

    }

    if (spot) {
        return (
            <>
            <h2>Update your Spot</h2>
            <form onSubmit={handleSubmit}>
            <div>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>

                <label>
                    Country
                    <input
                    type="text"
                    value={country}
                    placeholder={`${spot.country}`}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Street Address
                    <input
                    type="text"
                    value={address}
                    placeholder={`${spot.address}`}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    />
                </label>
                <label>
                    City
                    <input
                    type="text"
                    value={city}
                    placeholder={`${spot.city}`}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    />
                </label>
                <p>,</p>
                <label>
                    State
                    <input
                    type="text"
                    value={state}
                    placeholder={`${spot.state}`}
                    onChange={(e) => setState(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Latitude
                    <input
                    type="text"
                    value={lat}
                    placeholder={`${spot.lat}`}
                    onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                <p>,</p>
                <label>
                    Longitude
                    <input
                    type="text"
                    value={lng}
                    placeholder={`${spot.lng}`}
                    onChange={(e) => setLng(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <h3>Describe your place to your guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                rows={4} cols={40}
                minLength="30"
                value={description}
                placeholder={`${spot.description}`}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </div>
            <div>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                    type="text"
                    value={name}
                    placeholder={`${spot.name}`}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
            </div>
            <div>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <input
                    type="number"
                    placeholder={`${spot.price}`}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type="text"
                    value={images}
                    placeholder={`${spot.images}`}
                    onChange={(e) => setImages([...images, e.target.value])}
                    required
                />
                {urlImages}
            </div>
            <button type="submit">Update</button>
            </form>
        </>
        )
    }else{
        return (
            <div>Loading...</div>
        )
    }

}

export default UpdateSpot;
