import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Alice Smith',
      role: 'Blogger',
      testimonial: `This platform is amazing! It's easy to use, and I've received great feedback on my blog posts.`,
    },
    {
      id: 2,
      name: 'John Doe',
      role: 'Reader',
      testimonial: "I've discovered insightful content here that I couldn't find anywhere else. Truly a valuable resource.",
    },
     {
      id: 3,
      name: 'Sohan Kumar',
      role: 'Blogger',
      testimonial: "I've discovered insightful content here that I couldn't find anywhere else. Truly a valuable resource.",
    },
    // Add more testimonials as needed
  ];

  return (
    <section className="bg-gray-200 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-indigo-600 mb-4">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded shadow-md">
              <p className="text-gray-600 mb-4">{testimonial.testimonial}</p>
              <div className="text-indigo-600 font-semibold">{testimonial.name}</div>
              <div className="text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
