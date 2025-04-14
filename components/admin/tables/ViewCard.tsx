"use client";
import Image from "next/image";
import config from "@/lib/config";

interface ViewCardProps {
  universityCard: string;
  type: "link" | "eye";
}

const ViewCard = ({ universityCard, type = "link" }: ViewCardProps) => {
  const handleViewCard = () => {
    const cardUrl = `${config.env.imagekit.urlEndpoint}/${universityCard}`;
    window.open(cardUrl, "_blank");
  };

  return (
    <button
      className="flex items-center gap-2 text-blue-500 cursor-pointer"
      onClick={handleViewCard}
    >
      {type === "link" ? (
        <>
          <span>View ID Card</span>
          <Image
            src="/icons/admin/link.svg"
            alt="View ID Card"
            width={14}
            height={14}
          />
        </>
      ) : (
        <>
          <Image
            src="/icons/admin/eye.svg"
            alt="View ID Card"
            width={14}
            height={14}
          />
          <span>View ID Card</span>
        </>
      )}
    </button>
  );
};

export default ViewCard;
