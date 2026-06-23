import { SyntheticEvent, useState } from "react";
import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import Image from "next/image";

const Edit = () => {
  const [editState, setEditState] = useState("upload");
  // upload
  // remove-bg
  // configure

  //#region Base image upload

  const [baseImageFile, setBaseImageFile] = useState<File | null>(null);
  const [baseImageURL, setBaseImageURL] = useState("https://placehold.co/200x300.png?text=Super+cool+cat");

  const uploadForm = () => {
    return (
      <form className="w-75 mx-auto" id="upload-form">
        <h5 className="text-center">Upload a base pet photo</h5>
        <input className="form-control" type="file" accept="image/*" id="imageInput" name="imageInput" onChange={onBaseImageChange}></input>
        <label htmlFor="imageInput" className="form-label text-body-secondary">Choose the photo you want to edit</label>
        <br />
      </form>
    )
  };

  const onBaseImageChange = (event: SyntheticEvent) => {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    const file = files![0];
    setBaseImageFile(file);
    setBaseImageURL(URL.createObjectURL(file));
  }

  //#endregion

  const editDisplay = () => {
    switch (editState) {
      case "upload":
        return (
          <div className="container">
            {uploadForm()}
            <hr />
            <div className="text-center">
              <Image className="img-fluid rounded" src={baseImageURL} alt="Preview" width={200} height={300} placeholder="blur" blurDataURL="automatic" />
              <br />
              <button type="button" className="btn btn-primary m-2">Start editing! <i className="bi bi-pencil-fill ms-2"></i></button>
            </div>
          </div>
        );

      case "remove-bg":
        return (<div></div>);

      case "configure":
        return (<div></div>);

      default:
        return <></>;
    }
  };

  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="edit" />
      <br />

      {editDisplay()}
    </div>
  )
};

export default Edit;