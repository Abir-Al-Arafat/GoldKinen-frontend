import React from "react";

interface TotalPostsBadgeProps {
  text: string;
  number: number;
}

const TotalPostsBadge = ({ text, number }: TotalPostsBadgeProps) => {
  return (
    <button
      type="button"
      className="btn btn-primary position-relative mb-2 w-25"
    >
      {text}
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {number > 99 ? "99+" : number}
        <span className="visually-hidden">unread messages</span>
      </span>
    </button>
  );
};

export default TotalPostsBadge;
