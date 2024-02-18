import React from 'react';
import ContactForm from '../components/ContactForm';

const Contact = () => {

  return (
    <div className="container mx-auto py-[40px] px-4 md:px-20">
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700">
          Have questions, feedback, or inquiries? We&apos;d love to hear from you! Fill out the form below to get in touch with our team.
        </p>
      </section>
   
      <section>
        <h3 className="text-2xl font-semibold mb-4">Send us a message</h3>
        <ContactForm/>
      </section>
    </div>
  );
};

export default Contact;