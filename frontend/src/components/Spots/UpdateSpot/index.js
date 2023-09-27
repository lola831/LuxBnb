import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getSpotDetails, modifySpot } from "../../../store/spots";
import "./UpdateSpot.css"


const UpdateSpot = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots.spotDetails);

    console.log("SPOOOOOOTTTTT: ", spot)

    useEffect(() => {
        dispatch(getSpotDetails(id));
        setCountry(spot.country)
        console.log("here???")
        setAddress(spot.address)
        setCity(spot.city)
        setState(spot.state)
        setLat(spot.lat)
        setLng(spot.lng)
        setDescription(spot.description)
        setName(spot.name)
        setPrice(spot.price)
       setImage1(spot.SpotImages[0].url)

        // setImage2()

    }, [dispatch]);


    const [country, setCountry] = useState(spot?spot.country : "");
    const [address, setAddress] = useState(spot? spot.address : "");
    const [city, setCity] = useState(spot? spot.city : "");
    const [state, setState] = useState(spot? spot.state : "");
    const [lat, setLat] = useState(spot? spot.lat : "");
    const [lng, setLng] = useState(spot? spot.lng : "");
    const [description, setDescription] = useState(spot? spot.description : "");
    const [name, setName] = useState(spot? spot.name : "");
    const [price, setPrice] = useState(spot? spot.price : "");

    const [image1, setImage1] = useState(spot? spot.SpotImages[0].url : "");
    //  const [image1, setImage1] = useState("");
        const [image2, setImage2] = useState("");
        const [image3, setImage3] = useState("");
        const [image4, setImage4] = useState("");
        const [image5, setImage5] = useState("");

        console.log(">>>>>>>>>>>>>>>>>>>")
    // const [image1, setImage1] = useState(spot? spot.SpotImages[0].url : "");
    //     const [image2, setImage2] = useState(spot.SpotImages[1].url ? spot.SpotImages[1].url : "");
    //     const [image3, setImage3] = useState(spot.SpotImages[2].url ? spot.SpotImages[2].url : "");
    //     const [image4, setImage4] = useState(spot.SpotImages[3].url ? spot.SpotImages[3].url : "");
    //     const [image5, setImage5] = useState(spot.SpotImages[4].url ? spot.SpotImages[4].url : "");
        const [errors, setErrors] = useState({})


        // let image2 =
        // for(let i = 1; i < 5; i++) {
        //     if ()
        // }



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
        }

        let updatedSpot;
        setErrors({});

        updatedSpot = await dispatch(modifySpot(payload))
        .catch(async (res) => {
            const data = await res.json();
            console.log("DATA IN RESPONSE:", data)
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });

        console.log("HERE IN HANDLESUBMIT2")

        // let imagesUpdated; //???????????? FIX FOR ALL IMAGES NOT JUST PREVIEW

        // if(updatedSpot) {
        //     let imagesArr = [image1];
        //     imagesArr.push(spot.id);
        // }

        if(updatedSpot) {
            console.log("HERE IN HANDLESUBMIT3")
            history.push(`/spots/${spot.id}`);   // ????????
        }

    }

    if (spot) {
        return (
            <div className="update-box">
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
                    // required
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
                    // required
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
                    value={image1}
                    placeholder="Preview image"
                    onChange={(e) => setImage1( e.target.value)}
                    required
                />
                 <input
                    type="text"
                    value={image2}
                    placeholder="Image URL"
                    onChange={(e) => setImage2(e.target.value)}
                />
                 <input
                    type="text"
                    value={image3}
                    placeholder="Image URL"
                    onChange={(e) => setImage3(e.target.value)}
                />
                <input
                    type="text"
                    value={image4}
                    placeholder="Image URL"
                    onChange={(e) => setImage4(e.target.value)}
                />
                <input
                    type="text"
                    value={image5}
                    placeholder="Image URL"
                    onChange={(e) => setImage5(e.target.value)}
                />

            </div>
            <button className="update-but" type="submit">Update</button>
            </form>
        </div>
        )
    }else{
        return (
            <div>Loading...</div>
        )
    }

}

export default UpdateSpot;
