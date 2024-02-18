"use client";
import React, { useState } from "react";

const FaqSection = () => {
  const faqData = [
    {
      question: "What is the purpose of this platform?",
      answer:
        "Our platform is a place for bloggers to share their insights and readers to discover engaging content on various topics.",
    },
    {
      question: "How do I create a blog post?",
      answer:
        'To create a blog post, simply log in to your account, go to your profile, and click on the "Create New Post" button. Follow the prompts to add your content.',
    },
    // Add more FAQ items here...
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4 md:p-10">
      <section>
        <h2 className="md:text-3xl text-indigo-600 text-xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>
        {faqData.map((item, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer border-b border-gray-300"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="md:text-lg text-sm font-semibold">{item.question}</h3>
              <span className="text-gray-600">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                activeIndex === index ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              <div className="mt-2 text-gray-700">{item.answer}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FaqSection;
