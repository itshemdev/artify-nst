"use client";

import Image from "next/image";
import { useState } from "react";

const ImagePicker = ({ type, image, setImage, title }: any) => {
  return (
    <div key={type} className="w-full">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          className="rounded-xl aspect-square overflow-hidden object-cover w-full"
        />
      ) : (
        <>
          {/* <h3 className="text-2xl mb-4">{title}</h3> */}
          <label
            htmlFor={type}
            className="border border-white w-full inline-block p-2 rounded-xl border-[#A1A1A1] text-[#A1A1A1] bg-[#1D1D1D] cursor-pointer flex gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Choose {title}...
          </label>
          <input
            id={type}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e: any) => {
              setImage(e.target.files[0]);
            }}
          />
        </>
      )}
    </div>
  );
};

const ImagePickerBar = ({ type, image, setImage, title }: any) => {
  return (
    <div key={type} className="w-full">
      <label htmlFor={type} className="flex gap-2 p-3 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        Choose {title}...
      </label>
      <input
        id={type}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e: any) => {
          setImage(e.target.files[0]);
        }}
      />
    </div>
  );
};

const Bar = ({
  contentImage,
  setContentImage,
  styleImage,
  setStyleImage,
  styledImage,
  setStyledImage,
}: any) => {
  const [responseMessage, setResponseMessage] = useState("");

  const handleUpload = async (event: any) => {
    event.preventDefault();

    if (!styleImage || !contentImage) {
      setResponseMessage("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("contentImage", contentImage);
    formData.append("styleImage", styleImage);

    try {
      const response = await fetch("http://127.0.0.1:5000/stylize", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage(`Success: ${result.message}`);
        setStyledImage(result.stylized_image_base64);
      } else {
        setResponseMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred while uploading.");
    }
  };

  return (
    <form onSubmit={handleUpload} className="mt-10">
      <div className="bg-[#1D1D1D] border border-[#A1A1A1] overflow-hidden rounded-xl fixed w-[70vw] bottom-[10px] left-[15%] grid grid-flow-col">
        <ImagePickerBar
          image={contentImage}
          type={"contentImage"}
          setImage={setContentImage}
          title={"Content image"}
        />
        {/* <div className="w-[1px] bg-[#A1A1A1]"></div> */}
        <ImagePickerBar
          image={styleImage}
          type={"styleImage"}
          setImage={setStyleImage}
          title={"Style image"}
        />
        <button className="bg-red-500 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        <label
          htmlFor="submit"
          className="bg-[#2463EB] flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </label>
        <input type="submit" id="submit" style={{ display: "none" }} />
      </div>
    </form>
  );
};

export default function Home() {
  const [styleImage, setStyleImage] = useState<null | File>(null);
  const [contentImage, setContentImage] = useState<null | File>(null);
  const [styledImage, setStyledImage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  return (
    <>
      <section
        className="max-w-[70vw] m-[auto]"
        style={{ margin: "80px auto" }}
      >
        <Bar
          contentImage={contentImage}
          setContentImage={setContentImage}
          styleImage={styleImage}
          setStyleImage={setStyleImage}
          styledImage={styledImage}
          setStyledImage={setStyledImage}
        />
        <h1 className="text-5xl">Neural Style Transfer</h1>

        <div className="flex gap-10 mt-10">
          {contentImage && (
            <img
              src={URL.createObjectURL(contentImage)}
              className="w-[50%] rounded-2xl aspect-square"
            />
          )}
          {styleImage && (
            <img
              src={URL.createObjectURL(styleImage)}
              className="w-[50%] rounded-2xl aspect-square"
            />
          )}
        </div>

        {styledImage.length != 0 && (
          <img
            src={"data:image/jpeg;base64," + styledImage}
            className="w-[80% object-contain] m-[auto] mt-10"
          />
        )}
      </section>
    </>
  );
}
