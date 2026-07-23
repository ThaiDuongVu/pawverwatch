import Image from "next/image";
import { downloadFromURI } from "@/helper";

interface FavoriteCardInterface {
  src: string,
  onFavoriteRemoved: (src: string) => void,
}

const FavoriteCard = ({ src, onFavoriteRemoved }: FavoriteCardInterface) => {
  return (
    <div>
      <div className="card">
        <Image
          src={`data:image/png;${src}`}
          className="card-img-top"
          width={100}
          height={100}
          alt="Favorited image"
          style={{
            width: "100%",
            height: "auto",
          }} />
        <div className="card-body bg-body-secondary">
          <button
            type="button"
            className="btn btn-danger me-2"
            onClick={() => { onFavoriteRemoved(src); }}>
            Remove <i className="bi bi-trash-fill ms-1"></i>
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => { downloadFromURI(`data:image/png;${src}`, "favorite"); }}>
            Download <i className="bi bi-download ms-1"></i>
          </button>
        </div>
      </div>
      <br />
    </div>
  )
};

export default FavoriteCard;