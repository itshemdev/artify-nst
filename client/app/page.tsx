"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [styleImage, setStyleImage] = useState<any>(null);
  const [contentImage, setContentImage] = useState<any>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [styledImage, setStyledImage] = useState("");

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

      console.log(result);

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
          <div>
            {["contentImage", "styleImage"].map((type) => (
              <input
                key={type}
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  if (type == "contentImage") {
                    setContentImage(e.target.files[0]);
                  } else {
                    setStyleImage(e.target.files[0]);
                  }
                }}
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
              style={{ width: "400px", height: "400px" }}
            />
          )}
        </form>
      </section>
    </>
  );
}
