import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if(credential.length > 3 && password.length > 5){
     setDisabled(true);
    }
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors();
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data.message);
        }
      });
  };

  const demoSignIn = () => {
    return dispatch(sessionActions.login({
      credential: "Demo-lition",
      password: "password"
    }))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors && (
          <p>{errors}</p>
        )}
         <button disabled={!disabled} type="submit">Log In</button>
      </form>
      <button onClick={demoSignIn}>Demo user</button>
    </>
  );
}

export default LoginFormModal;
