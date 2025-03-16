import { useDropzone } from "react-dropzone";

const ImagePicker = ({ type, image, setImage, title }: any) => {
  const onDrop = (acceptedFiles: File[]) => {
    // console.log(acceptedFiles);
    setImage(acceptedFiles[0]);
    // const newImages = acceptedFiles.map((file) =>
    //   Object.assign(file, { preview: URL.createObjectURL(file) })
    // );
    // setImages((prev) => [...prev, ...newImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div key={type} className="">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          className="rounded-xl w-full aspect-square object-cover"
        />
      ) : (
        <>
          <div
            {...getRootProps()}
            className="w-full aspect-square border-2 border-dashed border-[#696A6C] rounded-lg cursor-pointer flex flex-col items-center justify-center transition"
          >
            <input {...getInputProps()} />
            {/* <UploadCloud className="h-10 w-10 text-gray-500" /> */}
            <p className="mt-2 text-gray-600 max-w-[200px] text-center">
              {isDragActive
                ? "Drop the images here..."
                : "Drag & drop images, or click to select"}
            </p>
          </div>
        </>
      )}

      <div className="flex justify-between items-center">
        <h4 className="text-md mt-1 opacity-40">{title}</h4>
        <a
          onClick={() => {
            setImage(null);
          }}
          className="opacity-40 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ImagePicker;
