import { useEffect, useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { removeReview } from "../../../store/reviews";

function DeleteReviewModal({review}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

const handleClick = (e) => {
    e.preventDefault();
    return dispatch(removeReview(review))
    .then(closeModal)
}


    return (
        <>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        <button onClick={handleClick}>Yes(Delete Review)</button>
        <button onClick={closeModal}>No(Keep Review)</button>
        </>
    )



}


export default DeleteReviewModal;
