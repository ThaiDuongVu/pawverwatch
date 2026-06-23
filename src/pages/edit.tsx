import { SyntheticEvent, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import CustomModal from "@/components/custom-modal";

const Edit = () => {
  const [editState, setEditState] = useState("upload");
  // upload
  // remove-bg
  // configure

  //#region Base image upload

  const [baseImageFile, setBaseImageFile] = useState<File | null>(null);
  const [baseImageURL, setBaseImageURL] = useState("/images/placeholder2.png");

  const uploadDisplay = () => {
    return (
      <div className="container">
        <h5 className="text-center"><strong>Upload a base pet photo</strong></h5>
        {/* Upload form */}
        <form className="w-75 mx-auto" id="upload-form">
          <input className="form-control" type="file" accept="image/*" id="imageInput" name="imageInput" onChange={onBaseImageChange}></input>
          <label htmlFor="imageInput" className="form-label text-body-secondary">Choose the photo you want to edit</label>
          <br />
        </form>
        <hr />
        {/* Preview */}
        <div className="text-center">
          <Image className="img-fluid rounded" src={baseImageURL} alt="Preview" width={200} height={300} placeholder="blur" blurDataURL="automatic" />
          <br />
          {
            baseImageFile
              ?
              <button
                type="button"
                className="btn btn-warning m-2"
                onClick={
                  () => {
                    if (!baseImageFile) return;
                    setEditState("remove-bg");
                  }
                }>
                Start editing! <i className="bi bi-pencil-fill ms-1"></i>
              </button>
              :
              <button type="button" className="btn btn-warning m-2" data-bs-toggle="modal" data-bs-target="#uploadErrorModal">Start editing! <i className="bi bi-pencil-fill ms-1"></i></button>
          }
          <CustomModal name="uploadErrorModal" title="No photo uploaded" content={<p>Upload a base pet photo to start editing</p>} />
        </div>
      </div>
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
          uploadDisplay()
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