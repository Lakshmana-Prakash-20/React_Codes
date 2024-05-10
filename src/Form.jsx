import React, { useState, useEffect } from "react";
import "./App.css";

function UserForm(props) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Error, setError] = useState("");

  useEffect(() => {
    if (props.userData) {
      setName(props.userData.Name);
      setEmail(props.userData.Email);
      setPhone(props.userData.Phone);
    }
  }, [props.userData]);

  const changeName = (event) => {
    const name = event.target.value;
    const regex = /^[a-zA-Z\s]*$/;

    if (regex.test(name)) {
      setName(name);
    } else {
      setError("*name should not contain special characters or numbers*");
    }
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePhone = (event) => {
    const phone = event.target.value;
    const regex = /^[0-9/-]*$/;
    if (regex.test(phone)) {
      setPhone(phone);
    }
  };

  const transferValue = (event) => {
    event.preventDefault();
    const val = {
      Name,
      Email,
      Phone,
    };

    const existingUser = props.allUsers.find((user) => {
      if (props.editTrigger) {
        return false;
      } else {
        return (
          user.Name.toLowerCase() === val.Name.toLowerCase() ||
          user.Email === val.Email ||
          user.Phone === val.Phone
        );
      }
    });

    if (existingUser) {
      setError("*User already exists*");
    } else {
      props.func(val);
      clearState();
    }
  };

  const clearState = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
      <h2>Add User</h2>
      <form className="Form" onSubmit={transferValue}>
        <p>{Error}</p>
        <input
          placeholder="User Name"
          type="text"
          className="Content"
          value={Name}
          onChange={changeName}
          id="name"
          name="name"
          required
        />
        <br />
        <input
          placeholder="Email ID"
          type="email"
          className="Content"
          value={Email}
          onChange={changeEmail}
          id="email"
          name="email"
          required
        />
        <br />
        <input
          title="phone number should not contain special characters"
          placeholder="Phone No"
          type="tel"
          className="Content"
          value={Phone}
          onChange={changePhone}
          id="phone"
          name="phone"
          required
        />
        <br />
        <button
          type="submit"
          className="btn"
          id="btn"
          onClick={() => setError("")}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default UserForm;
