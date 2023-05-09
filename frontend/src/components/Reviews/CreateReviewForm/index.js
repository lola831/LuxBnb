import { useEffect, useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { createReview } from "../../../store/reviews";
import "./CreateReviewForm.css";

function CreateReviewForm({spotId}) {
    const dispatch = useDispatch();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0)
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();

    useEffect(() => {
        if(review.length > 9 && stars > 0) setDisabled(false)
    }, [review, stars])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(
            createReview({
                id: spotId,
                review,
                stars
            })
        )
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors);
            }
        });
        // return setErrors({}).....?

    };


    return (
        <>
        <h1>How was your stay?</h1>
        <form onSubmit={handleSubmit}>
        <textarea
                rows={3} cols={30}
                minLength="30"
                value={review}
                placeholder="Leave your review here"
                onChange={(e) => setReview(e.target.value)}
                required
        />

     <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || stars) ? "on" : "off"}
            onClick={() => setStars(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(stars)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
    <button disabled={disabled} type="submit">Submit Your Review</button>
    </form>
        </>

    )
}

export default CreateReviewForm;
