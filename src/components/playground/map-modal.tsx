import Image from "next/image";
import { ReactElement } from "react";

interface MapModaProps {
  name: string,
  id: string,
  icon: string,
  maps: [],
  onMapClicked: (map: string) => void
}

const MapModal = ({ name, id, icon, maps, onMapClicked }: MapModaProps) => {
  const mapButton = (map: string) => {
    if (!map || map === "") return <div></div>
    return (
      <button type="button" className="btn btn-secondary shadow-lg m-1" title={`${name} map`} onClick={() => onMapClicked(map)}>
        <Image className="img-fluid" src={map} alt={`${name} item`} width={200} height={200} loading="lazy" />
      </button>
    );
  }

  const mapGrid = () => {
    let rows: ReactElement[] = [];
    for (let i = 0; i < maps.length; i += 2) {
      const map1 = maps[i];
      const map2 = maps[i + 1];
      rows = [...rows,
      <div className="row" key={`itemRow${i}`}>
        <div className="col">{mapButton(map1)}</div>
        <div className="col">{mapButton(map2)}</div>
      </div>
      ]
    }
    return rows;
  }

  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={`${id}ModalLabel`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-body-tertiary">
            <h5 className="modal-title" id={`${id}ModalLabel`}><strong>{name} maps</strong></h5>
            <Image className="img-fluid bg-info rounded ms-2 p-1" src={icon} alt={`${name} modal`} width={30} height={30} />
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {mapGrid()}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Done <i className="bi bi-check-circle-fill ms-1"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;