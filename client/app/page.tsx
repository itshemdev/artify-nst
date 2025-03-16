"use client";

import { useState } from "react";
import ImagePicker from "./components/imagePicker";
import Sidebar from "./components/sidebar";

export default function Home() {
  const [styledImage, setStyledImage] = useState("");

  return (
    <>
      <main className="flex bg-[#16181C]">
        <Sidebar setStyledImage={setStyledImage} />
        <section className="w-[70vw] overflow-hidden flex items-center justify-center">
          <div className="flex flex-col">
            {styledImage && (
              <>
                <img
                  src={"data:image/jpeg;base64," + styledImage}
                  className="w-full object-contain max-h-[75vh]"
                />
                <a
                  href={"data:image/jpeg;base64," + styledImage}
                  download={`${Math.floor(Math.random() * 100000)}.jpg`}
                  className="mt-1 ml-[auto] inline-block pl-4 py-2 text-white opacity-40"
                >
                  Download
                </a>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
