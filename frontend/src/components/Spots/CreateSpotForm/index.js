import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../../store/spots';
import "./CreateSpotForm.css";

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
    const [images, setImages] = useState([]);

    const urlImages = [];
    for (let i = 0; i < 5; i++) {
         urlImages.push(
                <input
                type="text"
                value={images[i+1]}
                key= {i +1}
                placeholder="Image URL"
                onChange={(e) => setImages([...images, e.target.value])}
                />
            )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("HERE IN HANDLESUBMIT1")
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
            images
        }

        let createdSpot;
        createdSpot = await dispatch(createSpot(payload));
        console.log("HERE IN HANDLESUBMIT2")

        if(createdSpot) {
            console.log("HERE IN HANDLESUBMIT3")
            history.push(`/spots/${createdSpot.id}`);   // ????????
            // clear form ?????
        }

    }


    return (
        <>
            <h1>Create a new Spot</h1>
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
                    required
                    />
                </label>
                <label>
                    Street Address
                    <input
                    type="text"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    />
                </label>
                <label>
                    City
                    <input
                    type="text"
                    value={city}
                    placeholder="City"
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
                    placeholder="STATE"
                    onChange={(e) => setState(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Latitude
                    <input
                    type="text"
                    value={lat}
                    placeholder="Latitude"
                    onChange={(e) => setLat(e.target.value)}
                    />
                </label>
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
                required
                />
            </div>
            <div>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                    type="text"
                    value={name}
                    placeholder="Name of your spot"
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
            </div>
            <div>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <input
                    type="number"
                    placeholder="Price per night (USD)"
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
                    placeholder="Preview Image URL"
                    onChange={(e) => setImages([...images, e.target.value])}
                    required
                />
                {urlImages}
            </div>
            <button type="submit">Create Spot</button>
            </form>
        </>
    )

};

export default CreateSpotForm;
