import React, { useEffect, useState } from "react";

const Hero = () => {
  const [data, setData] = useState();

  return (
    <div className="h-full">
      {data}
      <section className="max-w-screen-xl mx-auto ">
        <h1 className=" text-4xl text-wrap mx-5 text-center font-bold text-orange-600 mb-20 mt-10">
          Welcome to D&D Electronics Office TechNotes!
        </h1>
        <h5 className="text-gray-600 text-center mx-10 text-xl font-semibold">
          Step into the world of efficient note-taking tailored for electronics
          enthusiasts like you. As an employee of D&D Electronics, you
          understand the importance of keeping track of daily tasks, project
          ideas, and essential information. That's why we've created a platform
          specifically designed to enhance your productivity and organization.
        </h5>
        <h4 className="text-slate-200 font-semibold bg-orange-600 rounded-full p-10 text-wrap  mt-20 mx-10 text-center  shadow-xl">
          With D&D Electronics Office Notes, you can effortlessly manage your
          daily notes right from your fingertips. Whether you're sketching out
          circuit designs, logging inventory updates, or jotting down customer
          inquiries, our user-friendly interface ensures that your notes are
          always within reach.
        </h4>
      </section>
      <h3
        className="w-full bg-slate-900 mt-10
         p-10 text-slate-100 text-center"
      >
        Empower yourself to stay on top of your game in the dynamic world of
        electronics. Start your journey with D&D Electronics Office Notes today
        and experience the convenience of streamlined note management tailored
        for your needs.
      </h3>
    </div>
  );
};

export default Hero;
