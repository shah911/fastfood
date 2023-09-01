"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, { useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

function page() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });
  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: [e.target.value] };
    });
  };

  const handleChangeImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const fileName = new Date().getTime() + file!.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file!);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //console.log(downloadURL);
          const handleSubmit = async () => {
            try {
              const res = await fetch("/api/products", {
                method: "POST",
                body: JSON.stringify({
                  img: downloadURL,
                  ...inputs,
                  options,
                }),
              });
              const data = await res.json();
              router.push(`/product/${data.id}`);

              //console.log(res);
            } catch (err) {
              console.log(err);
            }
          };
          handleSubmit();
          setIsLoading(false);
        });
      }
    );
  };

  if (status === "loading") {
    return <Loader />;
  } else if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  } else {
    return (
      <div className="my-8">
        {isLoading ? (
          <Loader />
        ) : (
          <form className="lg:w-[70%] shadow-lg flex flex-col flex-wrap gap-4 p-8 m-auto">
            <h1 className="font-bold text-4xl">Add new Product</h1>
            <div className="flex flex-col gap-2">
              <label
                className="text-lg cursor-pointer flex gap-4 items-center"
                htmlFor="file"
              >
                <Image src="/upload.png" alt="" width={30} height={20} />
                <span>Upload Image</span>
              </label>
              <input
                className="hidden"
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files![0])}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-lg">Title</label>
              <input
                className="border-b-2 border-black outline-none transition-colors duration-300 focus:border-blue-500"
                type="text"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-bold text-lg">Description</label>
              <textarea
                className="border-2 border-black outline-none transition-colors duration-300 focus:border-blue-500"
                name="desc"
                rows={8}
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-bold text-lg">Price</label>
              <input
                className="border-b-2 border-black outline-none transition-colors duration-300 focus:border-blue-500"
                type="number"
                name="price"
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-bold text-lg">Category</label>
              <input
                className="border-b-2 border-black outline-none transition-colors duration-300 focus:border-blue-500"
                type="text"
                name="catSlug"
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <label className="font-bold text-lg">Options</label>
              <div className="flex flex-col gap-8">
                <input
                  className="border-b-2 border-black outline-none transition-colors duration-300 focus:border-blue-500"
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleOption}
                />
                <input
                  className="border-b-2 border-black outline-none transition-colors duration-300 focus:border-blue-500"
                  type="text"
                  placeholder="Additional Price"
                  name="additionalPrice"
                  onChange={handleOption}
                />
              </div>
              <div
                onClick={() => setOptions((prev) => [...prev, option])}
                className="cursor-pointer mt-4 w-fit ring-1 text-black ring-black transition-colors rounded-md p-2 hover:bg-black hover:text-white"
              >
                Add Option
              </div>
            </div>
            {options.map((item) => (
              <div key={item.title} className="flex items-center gap-4 w-fit">
                <div className="flex gap-4">
                  <span className="ring-1 ring-black p-2 rounded-md">
                    {item.title}
                  </span>
                  <span className="ring-1 ring-black p-2 rounded-md">
                    ${item.additionalPrice}
                  </span>
                </div>
                <div
                  onClick={() =>
                    setOptions(
                      options.filter((option) => option.title !== item.title)
                    )
                  }
                  className="cursor-pointer"
                >
                  x
                </div>
              </div>
            ))}
            <button
              onClick={handleChangeImg}
              className="mt-4 ring-1 text-black ring-black transition-colors rounded-md p-2 hover:bg-black hover:text-white"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default page;
