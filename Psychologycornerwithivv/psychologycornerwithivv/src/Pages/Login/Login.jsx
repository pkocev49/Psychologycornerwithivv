import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/slices/authSlice";
import { loginWithEmailAndPassword } from "../../utils/services/authService";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async () => {
    try {
      const user = await loginWithEmailAndPassword(email, password);
      dispatch(setUser(user.uid));
      setEmail("");
      setPassword("");
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      setErrorMessage("Incorrect email or password.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="p-[20px] flex justify-center flex-col items-center mt-[100px]">
      <h1 className="text-[#7B3F00] text-[50px] font-bold mb-[40px]">
        Please Login
      </h1>
      <input
        className="w-full md:w-[700px]  bg-transparent placeholder-white text-[15px] border-[2px] border-[#7B3F00] p-[10px] rounded-[10px] mb-[20px]"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        value={email}
      />
      <input
        className="w-full  md:w-[700px] resize-none bg-transparent placeholder-white text-[15px] border-[2px] border-[#7B3F00] p-[10px] rounded-[10px] mb-[20px]"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        value={password}
      />
      {errorMessage && (
        <p className="text-[#FF0000] mb-4 text-[20px] font-bold">
          {errorMessage}
        </p>
      )}{" "}
      <button
        onClick={handleSubmit}
        className="w-[340px] text-white text-[20px] border-[2px] border-[#7B3F00] p-[10px] rounded-md mt-[20px]"
      >
        Log in
      </button>
    </div>
  );
};

export default Login;
