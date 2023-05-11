
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../../store/spots';
import "./CreateSpotForm.css";
import { createImage } from '../../../store/spots';

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    // const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("HERE IN HANDLESUBMIT1")
       // console.log("IMAGESSSSSSSSS", images) //array of urls
        const payload = {
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

        let createdSpot;
        setErrors({});

        createdSpot = await dispatch(createSpot(payload))
            .catch(async (res) => {
                const data = await res.json();
                console.log("DATA IN RESPONSE:", data)
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });

        let imagesDone;

        if (createdSpot) {
            console.log("CREATED SPOT", createdSpot)
            let imagesArr = [image1, image2, image3, image4, image5];
            let images = imagesArr.filter(image => image !== "")
            console.log("IMAGESSSSSSSSSSSSSSSSSSSS", images);
            images.push(createdSpot.id);

            imagesDone = await(dispatch(createImage(images)))
            .catch(async (res) => {
                const data = await res.json();
                console.log("DATA IN RESPONSE:", data)
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
        }

        if (createdSpot && imagesDone) {
            console.log("HERE IN HANDLESUBMIT3")
            history.push(`/spots/${createdSpot.id}`);   // ????????
        }

    } // end handle submit

return (
    <>
        <h2>Create a new Spot</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>

                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                        // required
                    />
                </label>
                {errors.country && <p>{errors.country}</p>}
                <label>
                    Street Address
                    <input
                        type="text"
                        value={address}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        // required
                    />
                </label>
                {errors.address && <p>{errors.address}</p>}
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                        // required
                    />
                </label>
                {errors.city && <p>{errors.city}</p>}
                <p>,</p>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        placeholder="STATE"
                        onChange={(e) => setState(e.target.value)}
                        // required
                    />
                </label>
                {errors.state && <p>{errors.state}</p>}
                <label>
                    Latitude
                    <input
                        type="text"
                        value={lat}
                        placeholder="Latitude"
                        onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                {errors.lat && <p>{errors.lat}</p>}
                <p>,</p>
                <label>
                    Longitude
                    <input
                        type="text"
                        value={lng}
                        placeholder="Longitude"
                        onChange={(e) => setLng(e.target.value)}
                    />
                </label>
                {errors.lng && <p>{errors.lng}</p>}
            </div>
            <div>
                <h3>Describe your place to your guests</h3>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    rows={4} cols={40}
                    minLength="30"
                    value={description}
                    placeholder="Please write at least 30 characters"
                    onChange={(e) => setDescription(e.target.value)}
                    // required
                />
                {errors.description && <p>{errors.description}</p>}
            </div>
            <div>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input
                    type="text"
                    value={name}
                    placeholder="Name of your spot"
                    onChange={(e) => setName(e.target.value)}
                    // required
                />
                {errors.name && <p>{errors.name}</p>}
            </div>
            <div>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <input
                    type="number"
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    // required
                />
                {errors.price && <p>{errors.price}</p>}
            </div>
            <div>
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type="text"
                    value={image1}
                    placeholder="Preview Image URL"
                    onChange={(e) => setImage1( e.target.value)}
                    // required
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
            <button type="submit">Create Spot</button>
        </form>
    </>
)

};

export default CreateSpotForm;
