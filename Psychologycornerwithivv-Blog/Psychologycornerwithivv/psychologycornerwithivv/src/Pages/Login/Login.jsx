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

  const handleSubmit = async () => {
    try {
      const user = await loginWithEmailAndPassword(email, password);
      dispatch(setUser(user.uid));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div className="p-[20px] flex justify-center flex-col items-center mt-[100px]">
      <h1 className="text-white text-[50px] font-bold">Please Login</h1>
      <input
        className="w-full md:w-[700px]  bg-transparent placeholder-white text-[15px] border-[2px] border-white p-[10px] rounded-[10px] mb-[20px]"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        value={email}
      />
      <input
        className="w-full  md:w-[700px] resize-none bg-transparent placeholder-white text-[15px] border-[2px] border-white p-[10px] rounded-[10px] mb-[20px]"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        value={password}
      />
      <button
        onClick={handleSubmit}
        className="w-[340px] text-white text-[20px] border-[2px] border-white p-[10px] rounded-md mt-[20px]"
      >
        Log in
      </button>
    </div>
  );
};

export default Login;
