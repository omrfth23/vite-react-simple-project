import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = "Geçerli bir email giriniz";
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = "Şifre güçlü değil";
    }

    setErrors(newErrors);
  }, [email, password]);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    email !== "" &&
    password !== "" &&
    accepted;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/success");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          data-cy="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          data-cy="password"
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>
          <input
            data-cy="terms"
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          Şartları kabul ediyorum
        </label>

        {errors.email && <p data-cy="error">{errors.email}</p>}
        {errors.password && <p data-cy="error">{errors.password}</p>}

        <button data-cy="submit" disabled={!isFormValid}>
          Login
        </button>
      </form>
    </div>
  );
}
