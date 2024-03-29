import React from "react";

const NoteCard = ({ note }) => {
  return (
    <section className="mr-3  border rounded-xl  min-h-56 bg-gradient-to-tl from-slate-50 to-slate-100 p-2 h-full">
      <div className="flex  items-center gap-2">
        <div className="size-10 bg-red-500 rounded-full"></div>
        <div className="">
          <div>Rahul sharma</div>
          <h3 className="text-sm text-nowrap font-semibold text-slate-500 ">
            {new Date().toISOString()}
          </h3>
        </div>
      </div>
      <div className="min-h-44 p-1 mt-2">
        Note 1: Additional Information: Description or Context Note Content
      </div>
    </section>
  );
};

export default NoteCard;
