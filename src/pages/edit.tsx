import { SyntheticEvent, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import CustomModal from "@/components/custom-modal";
import { initializeModel, removeBackground } from "@/background-remover";

const Edit = () => {
  const [editState, setEditState] = useState("upload");
  // Edit process:
  // 1. upload
  // 2. remove-bg
  // 3. configure

  //#region Base image upload

  const [baseImageFile, setBaseImageFile] = useState<File | null>(null);
  const [baseImageURL, setBaseImageURL] = useState("/images/placeholder2.png");
  const [bgRemovedImageUrl, setBgRemovedImageUrl] = useState("/images/placeholder2.png");
  const [bgRemovalDone, setBgRemovalDone] = useState(false);

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
    setBgRemovedImageUrl(URL.createObjectURL(file));
  }

  //#endregion

  //#region Remove image background

  const removeBG = async () => {
    setBgRemovedImageUrl("/images/processing-placeholder.png");
    await initializeModel();
    removeBackground(baseImageFile).then((img) => {
      const src = URL.createObjectURL(img);
      setBgRemovedImageUrl(src);
      setBgRemovalDone(true);
    });
  };

  const removeBGDisplay = () => {
    return (
      <div className="container">
        {
          bgRemovalDone
            ?
            <div className="text-center">
              <h5><strong>Use this?</strong></h5>
              <p>Choose which photo to edit</p>
              <div className="row">
                <div className="col text-end">
                  <Image className="img-fluid rounded" src={baseImageURL} alt="Original photo" width={200} height={300} placeholder="blur" blurDataURL="automatic" />
                  <br />
                  <button type="button" className="btn btn-secondary m-2">The OG <i className="bi bi-hand-index-fill ms-1"></i></button>
                </div>
                <div className="col text-start">
                  <Image className="img-fluid rounded" src={bgRemovedImageUrl} alt="BG removed photo" width={200} height={300} placeholder="blur" blurDataURL="automatic" />
                  <br />
                  <button type="button" className="btn btn-warning m-2">No background <i className="bi bi-hand-index-fill ms-1"></i></button>
                </div>
              </div>
            </div>
            :
            <div className="text-center">
              <h5><strong>Remove background?</strong></h5>
              <p>
                Would you like to remove the background from the photo before editing?
                <br />
                Don&apos;t worry we&apos;ll handle it automatically.
              </p>
              <Image className="img-fluid rounded" src={bgRemovedImageUrl} alt="BG removed photo" width={200} height={300} placeholder="blur" blurDataURL="automatic" />
              <br />
              <button type="button" className="btn btn-secondary m-2">Nah <i className="bi bi-hand-thumbs-down-fill ms-1"></i></button>
              <button type="button" className="btn btn-warning m-2" onClick={removeBG}>Sure <i className="bi bi-hand-thumbs-up-fill ms-1"></i></button>
            </div>
        }
      </div>
    )
  };

  //#endregion

  const editDisplay = () => {
    switch (editState) {
      case "upload":
        return uploadDisplay();

      case "remove-bg":
        return removeBGDisplay();

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