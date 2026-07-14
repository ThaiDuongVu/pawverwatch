import Image from "next/image"

interface MapModaProps {
  name: string,
  id: string,
  icon: string,
  onMapClicked: (map: string) => void
}

const MapModal = ({ name, id, icon, onMapClicked }: MapModaProps) => {
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
            {/* Maps images here */}
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