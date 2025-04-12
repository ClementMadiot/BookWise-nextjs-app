import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between items-center gap-2 py-2">
      <h2 className="text-xl font-semibold text-dark-400">{title}</h2>
      <div className="flex gap-2">
        <p className="text-dark-200">A-Z</p>
        <p className="text-dark-200">#</p>
      </div>
    </div>
  );
};

export default Title;
