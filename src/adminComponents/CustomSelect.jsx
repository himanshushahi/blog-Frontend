import React, {  useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const CustomSelect = ({initialState,width, options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const dropdownRef = useRef(null);

  const closeDropdown = (e)=>{
     if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setIsOpen(false)
     }
  }

  useEffect(()=>{
    window.addEventListener('click',closeDropdown);

    return (
      window.addEventListener('click',closeDropdown)
    )
  },[])

  const Captilize = (text)=>{
    return text.charAt(0).toUpperCase()+text.slice(1,text.length)
  }
  return (
    <div className={`relative cursor-pointer w-[${width}] max-md:w-full`} >
      <div ref={dropdownRef}>
        <span className={`rounded-md shadow-sm `} onClick={toggleSelect}>
          <span className={`rounded min-w-[150px]  border-solid border-[1px] border-gray-400 flex justify-between bg-white px-2 py-2 text-base leading-5 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out`}>
            {Captilize(selectedOption) || Captilize(initialState)}
            <FaCaretDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "-rotate-180" : "rotate-0"}`}/>
          </span>
          
        </span>
      </div>
      {/* {isOpen && ( */}
        <div  className={`max-md:w-full transition-all duration-300 z-10 ${isOpen?'translate-y-0 opacity-100 pointer-events-auto':'translate-y-[50%] opacity-0 pointer-events-none'} w-[${width}]  absolute mt-2 w-56 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
          <div className="py-1">
          <div
                onClick={() => handleOptionSelect(initialState)}
                className={`block pl-3 pr-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ${
                  selectedOption === 'all' ? "bg-gray-100" : ""
                }`}
              >
                {Captilize(initialState)}
              </div>
            {options.map((option) => (
              <div
                key={option._id}
                onClick={() => handleOptionSelect(option.name)}
                className={`block pl-3 pr-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ${
                  selectedOption === option.name ? "bg-gray-100" : ""
                }`}
              >
                {Captilize(option.name)}
              </div>
            ))}
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default CustomSelect;
