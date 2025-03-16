"use client";

import { useState } from "react";
import ImagePicker from "./imagePicker";

const Sidebar = ({ setStyledImage }: any) => {
  const [styleImage, setStyleImage] = useState<null | File>(null);
  const [contentImage, setContentImage] = useState<null | File>(null);
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
    <div className="w-[30vw] bg-[#0F1216] h-screen">
      <form
        onSubmit={handleUpload}
        className="max-w-[300px] p-6 ml-[auto] flex flex-col justify-between h-screen"
      >
        <h1 className="text-2xl">Artify</h1>
        <div className="flex flex-col gap-4">
          <ImagePicker
            type="contentImage"
            image={contentImage}
            setImage={setContentImage}
            title={"Content Image"}
          />
          <ImagePicker
            type="styleImage"
            image={styleImage}
            setImage={setStyleImage}
            title={"Style Image"}
          />
        </div>

        <div className="flex justify-end items-center  gap-2">
          <button
            className="bg-red-500 rounded-lg py-2 px-2 h-full"
            onClick={() => {
              setContentImage(null);
              setStyleImage(null);
            }}
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded-lg inline-block"
            disabled={
              contentImage === null || styleImage === null ? true : false
            }
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
