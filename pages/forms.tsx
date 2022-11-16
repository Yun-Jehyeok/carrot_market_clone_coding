import React, { useState } from "react";

export default function Forms() {
  const [username, setUsername] = useState("");
  const [email, setUmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");

  const onUsernameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setUsername(value);
  };
  const onEmailChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setUmail(value);
  };
  const onPasswordChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setPassword(value);
  };

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "" || email === "" || password === "") {
      setFormErrors("All fields are required");
    }
    if (!email.includes("@")) {
      setFormErrors;
    }

    console.log(email, username, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={username}
        type="text"
        placeholder="Username"
        onChange={onUsernameChange}
        required
      />
      <input
        value={email}
        type="email"
        placeholder="Email"
        onChange={onEmailChange}
        required
      />
      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={onPasswordChange}
        required
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
