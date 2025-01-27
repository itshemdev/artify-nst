"use client";

import Image from "next/image";
import { useState } from "react";
import Input from "@mui/joy/Input";

const ImagePicker = ({ type, image, setImage }: any) => {
  return (
    <div key={type} className="w-full">
      {image ? (
        <img src={URL.createObjectURL(image)} className="rounded-xl" />
      ) : (
        <>
          <label
            htmlFor={type}
            className="border border-white w-full aspect-square rounded-xl flex items-center justify-center text-center"
          >
            {type}
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

export default function Home() {
  const [styleImage, setStyleImage] = useState<null | File>(null);
  const [contentImage, setContentImage] = useState<null | File>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [styledImage, setStyledImage] = useState("");

  console.log(contentImage, styleImage);

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
    <>
      <section className="max-w-5xl" style={{ margin: "80px auto" }}>
        <h1 className="text-6xl">Neural Style Transfer</h1>
        <form onSubmit={handleUpload} className="mt-10">
          <div className="flex gap-10">
            {["contentImage", "styleImage"].map((type) => (
              <ImagePicker
                key={type}
                image={type === "contentImage" ? contentImage : styleImage}
                type={type}
                setImage={
                  type === "contentImage" ? setContentImage : setStyleImage
                }
              />
            ))}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Upload
          </button>

          {styledImage.length != 0 && (
            <img
              src={"data:image/jpeg;base64," + styledImage}
              className="w-full"
            />
          )}
        </form>
      </section>
    </>
  );
}
