import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('https://res.cloudinary.com/dltiymhzd/image/upload/v1757431959/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP_1_hmnob5.jpg')` }}
    >
    <div className="p-3 max-w-lg ">
      <h1 className="text-center text-3xl text-slate-700 font-semibold my-10">
        ✨ Welcome to Homescape — Rent & Buy Your Dream Home
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          className=" p-3 bg-white  rounded-lg outline-black focus:outline-[3px]"
          id="username"
          onChange={handleChange}
        />
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
          {loading ? "...loading" : "SIGN UP"}
        </button>
        <OAuth />
      </form>
      <div className=" flex gap-2 mt-5">
        <p className="font-semibold">Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 font-semibold">Sign in</span>
        </Link>
      </div>

      <div>{error && <p className="text-red-500 mt-5">{error}</p>}</div>
    </div>
    </div>
  );
}

export default SignUp;
