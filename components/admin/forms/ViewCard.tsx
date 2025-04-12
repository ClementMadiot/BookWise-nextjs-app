"use client";
import Image from "next/image";
import config from "@/lib/config";

const ViewCard = ({ universityCard }: { universityCard: string }) => {
  const handleViewCard = () => {
    const cardUrl = `${config.env.imagekit.urlEndpoint}/${universityCard}`;
    window.open(cardUrl, "_blank");
  };

  return (
    <button
      className="flex items-center gap-2 text-blue-500 cursor-pointer"
      onClick={handleViewCard}
    >
      <span>View ID Card</span>
      <Image
        src="/icons/admin/link.svg"
        alt="View ID Card"
        width={14}
        height={14}
      />
    </button>
  );
};

export default ViewCard;
