import React from "react";
import AnnounceItem from "./AnnounceItem";
import Spinner from "../Spinner";
import { useAnnounceContext } from "../../contexts/AnnounceContext";

const AnnounceFeed = () => {
  const { announces, isLoading } = useAnnounceContext();
  console.log(announces);

  if (isLoading) {
    return <Spinner />;
  }
  if (announces?.length === 0) {
    return (
      <p className="text-center text-light fs-5">No Announcement</p>
    );
  }

  return (
    <div className="flex flex-col w-100">
      {announces?.map((announce) => {
        return <AnnounceItem key={announce._id} data={announce} />;
      })}
    </div>
  );
};

export default AnnounceFeed;
