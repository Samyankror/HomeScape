import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
     <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('https://res.cloudinary.com/dltiymhzd/image/upload/v1757431959/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP_1_hmnob5.jpg')` }}
    >
    <div className="p-3 max-w-lg ">
      <h1 className="text-center text-3xl text-slate-700 font-semibold my-10">
        Welcome Back to Homescape!
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Email"
          className=" p-3 bg-white  rounded-lg outline-black focus:outline-[3px]"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className=" p-3 bg-white  rounded-lg outline-black focus:outline-[3px]"
          id="password"
          onChange={handleChange}
          autoComplete="off"
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white rounded-lg font-semibold hover:opacity-85 cursor-pointer"
        >
          {loading ? "...loading" : "SIGN IN"}
        </button>
        <OAuth />
      </form>
      <div className=" flex gap-2 mt-5">
        <p className="font-semibold">Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700 font-semibold">Sign Up</span>
        </Link>
      </div>

      <div>{error && <p className="text-red-500 mt-5">{error}</p>}</div>
    </div>
    </div>
  );
}

export default SignIn;
