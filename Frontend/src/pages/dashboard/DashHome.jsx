import React from "react";

import NoteCard from "./NoteCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  useGetFeaturedNotesQuery,
  useGetRecentNotesQuery,
  useGetUserNotesQuery,
} from "../../features/notes/featuredNotesApi";

const DashHome = () => {
  const { data: recentNotes, isLoading: recentLoading } =
    useGetRecentNotesQuery(undefined, {
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
    });
  const { data: featuredNotes, isLoading: featuredLoading } =
    useGetFeaturedNotesQuery();
  const { data: userNotes, isLoading: userLoading } = useGetUserNotesQuery(
    "66099feffd301034d24eb7cf"
  );

  // console.log(recentNotes, featuredNotes, userNotes);
  var settings = {
    dots: false,
    infinite: false,
    // fade: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    // cssEase: "ease",
    // pauseOnHover: true,
    // easing: "ease",
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        },
      },
      //   {
      //     breakpoint: 480,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 1,
      //     },
      //   },
    ],
  };
  if (userLoading || featuredLoading || recentLoading) {
    return (
      <>
        <div>Loading..</div>
      </>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen ">
      <div className="text-2xl text-center my-5 px-4 font-semibold text-slate-800">
        Welcome to Your D&D Electronics Office Notes Dashboard
      </div>
      <div className="pl-4 py-4 w-full  ">
        <div className="flex justify-between items-center ">
          <h1 className="text-xl font-semibold  text-slate-700">
            Recent Notes:
          </h1>
          <h1 className="text-blue-500 font-semibold pr-4 underline underline-offset-2">
            View all
          </h1>
        </div>
        <div className="rounded-xl overflow-hidden my-2">
          <Slider {...settings}>
            {recentNotes &&
              recentNotes.map((note) => (
                <div key={note._id}>
                  <NoteCard note={note} />
                </div>
              ))}
          </Slider>
        </div>
      </div>
      <hr />
      <div className="pl-4 py-4 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold  text-slate-700">
            Important Notes:
          </h1>
          <h1 className="text-blue-500 font-semibold pr-4 underline underline-offset-2">
            View all
          </h1>
        </div>
        <div className="rounded-xl overflow-hidden my-2">
          <Slider {...settings}>
            {featuredNotes &&
              featuredNotes.map((note) => (
                <div key={note._id}>
                  <NoteCard note={note} />
                </div>
              ))}
          </Slider>
        </div>
      </div>
      <hr />
      <div className="pl-4 py-4 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold  text-slate-700">My Notes:</h1>
          <h1 className="text-blue-500 font-semibold pr-4 underline underline-offset-2">
            View all
          </h1>
        </div>
        <div className="rounded-xl overflow-hidden my-2">
          <Slider {...settings}>
            {userNotes &&
              userNotes.map((note, index) => (
                <div key={note._id}>
                  <NoteCard note={note} />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
