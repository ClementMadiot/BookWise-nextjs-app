"use client";
import React from "react";
import BookCover from "../BookCover";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { IKVideo, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
import { Book } from "@/types";

const BookDetails = ({
  id,
  title,
  author,
  genre,
  coverColor,
  coverUrl,
  summary,
  createdAt,
  videoUrl,
}: Book) => {
  // Convert the coverColor to rgba with 30% opacity
  const backgroundColorWithOpacity = `${coverColor}33`;
  return (
    <section className="flex flex-col gap-12 w-full">
      <article className="flex gap-8">
        <div
          className="px-12 py-6 rounded-xl"
          style={{ backgroundColor: backgroundColorWithOpacity }}
        >
          <BookCover
            variant="medium"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
        </div>
        <div className="flex flex-1 max-w-[420px] flex-col justify-between">
          <div className="flex">
            <div className="text-lg text-light-900 flex items-center gap-2">
              Created at :
              <p className="flex items-center ml-2">
                <Image
                  src={"/icons/admin/calendar.svg"}
                  alt="calendar"
                  width={20}
                  height={20}
                  className="inline mr-1"
                />
                <span className="text-dark-200">
                  {createdAt
                    ? createdAt.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>
          <h1 className="font-semibold text-2xl text-dark-400">{title}</h1>
          <h2 className="font-semibold text-lg text-dark-400">By {author}</h2>
          <p className="text-lg text-light-900">{genre}</p>
          <Button className="bg-primary-admin" asChild>
            <Link
              href={`/admin/books/edit/${id}`}
              className="text-white hover:!bg-primary-admin/95"
            >
              <Image
                src={"/icons/admin/edit-2.svg"}
                alt="edit"
                width={16}
                height={16}
              />
              <span>Edit Book</span>
            </Link>
          </Button>
        </div>
      </article>

      <div className="flex justify-center gap-8">
        {/* summary */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-dark-400 mb-4">Summary</h3>
          {summary.split("\n").map((paragraph, index) => (
            <p key={index} className="text-slate-500">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {/* Video Section */}
          <h3 className="font-semibold text-dark-400 mb-4">Video</h3>
          {videoUrl ? (
            <ImageKitProvider
              publicKey={config.env.imagekit.publicKey}
              urlEndpoint={config.env.imagekit.urlEndpoint}
            >
              <div className="w-[438px] h-[254px] flex justify-center items-center">
                <IKVideo
                  urlEndpoint={config.env.imagekit.urlEndpoint}
                  path={videoUrl}
                  className="rounded-lg"
                  controls
                  loop={false}
                  muted={false}
                  onError={() => console.error("Failed to load video")}
                />
              </div>
            </ImageKitProvider>
          ) : (
            <p className="text-slate-500">No video available for this book.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
