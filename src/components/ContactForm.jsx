import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

function ContactForm() {
  const [isLoading,setIsLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({
    name: {
      message: null,
    },
    email: {
      message: null,
    },
    message: {
      message: null,
    },
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!data.name) {
      setError((prev) => ({
        ...prev,
        name: {
          message: "Please fill in the name field",
        },
      }));
      return;
    }

    if (!data.email) {
      setError((prev) => ({
        ...prev,
        email: {
          message: "Please fill in the Email field",
        },
      }));
      return;
    }

    if (!data.message) {
      setError((prev) => ({
        ...prev,
        message: {
          message: "Please fill in the Message field",
        },
      }));
      return;
    }

    try {
      setIsLoading(true)
      const response = await fetch('/api/send-message',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const {success,message} = await response.json();
      setIsLoading(false);
      if(success){
        setData({name:'',email:'',message:''})
        toast.success(message)
      }else{
        toast.error(message)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  };
  const onFocus = (e) => {
    e.target.classList.add("custom-shadow");
  };

  const onBlur = (e) => {
    e.target.classList.remove("custom-shadow");
  };

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setError((prev) => ({ ...prev, name: { message: null } }));
    }
    if (name === "email") {
      setError((prev) => ({ ...prev, email: { message: null } }));
    }
    if (name === "message") {
      setError((prev) => ({ ...prev, message: { message: null } }));
    }
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md bg-white p-5 py-8 rounded"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 font-semibold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border rounded transition-shadow  outline-none"
          value={data.name}
          onChange={onchangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {error.name.message && (
          <p className="text-red-500 mt-2">{error.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2 "
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border rounded transition-shadow outline-none"
          value={data.email}
          onChange={onchangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {error.email.message && (
          <p className="text-red-500 mt-2">{error.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-gray-700 font-semibold mb-2 "
        >
          Message
        </label>
        <textarea
          id="message"
          rows="5"
          name="message"
          className="w-full px-3 py-2 resize-none border rounded transition-shadow outline-none"
          value={data.message}
          onChange={onchangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {error.message.message && (
          <p className="text-red-500 mt-2">{error.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-indigo-600 flex justify-center items-center w-full text-white py-2 px-4 rounded hover:bg-indigo-700 transition-all duration-300"
      >
        {isLoading?<Loader size={'30px'}/>:'Send'}
      </button>
    </form>
  );
}

export default ContactForm;
