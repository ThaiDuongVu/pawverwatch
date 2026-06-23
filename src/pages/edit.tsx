import { useState } from "react";
import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import Image from "next/image";

const Edit = () => {

  //#region Base image upload

  const [baseImageFile, setBaseImageFile] = useState<File | null>(null);
  const [baseImageURL, setBaseImageURL] = useState("https://placehold.co/200x300.png?text=Super+cool+cat");

  const uploadForm = () => {
    return (
      <form className="w-75 mx-auto" id="upload-form" onSubmit={uploadOnSubmit}>
        <h5 className="text-center">Upload a base pet image</h5>
        <input className="form-control" type="file" accept="image/*" id="imageInput" name="imageInput"></input>
        <label htmlFor="imageInput" className="form-label text-body-secondary">Choose an image</label>
        <br />
        <button type="submit" className="btn btn-primary">Upload <i className="bi bi-file-arrow-up-fill ms-1"></i></button>
      </form>
    )
  };

  const uploadOnSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const file: File = event.target.imageInput.files[0];
    if (!file) return;
    setBaseImageFile(file);
    setBaseImageURL(URL.createObjectURL(baseImageFile ?? file));
  };

  //#endregion

  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="edit" />
      <br />

      <div className="container">
        {uploadForm()}
        <hr />
        <div className="text-center">
          <Image className="img-fluid rounded" src={baseImageURL} alt="Preview" width={200} height={300} placeholder="blur" blurDataURL="automatic" />
          <br />
          <br />
          <button type="button" className="btn btn-primary">Start editing! <i className="bi bi-pencil-fill ms-2"></i></button>
        </div>
      </div>
    </div>
  )
};

export default Edit;