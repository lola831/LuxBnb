import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { removeSpot } from "../../../store/spots";

const DeleteSpotModal = ({spotId}) => {

const dispatch = useDispatch();
const { closeModal } = useModal();

const handleClick = (e) => {
    e.preventDefault();

    return dispatch(removeSpot(spotId))
    .then(closeModal)
}

return (
    <>
    <h1>Confirm Delete</h1>
    <p>Are you sure you want to remove this spot?</p>
    <button onClick={handleClick}>Yes(Delete Spot)</button>
    <button onClick={closeModal}>No(Keep Spot)</button>
    </>
)

}

export default DeleteSpotModal;
