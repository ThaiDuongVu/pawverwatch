import Image from "next/image"

interface HeroModalProps {
  id: string,
  name: string,
  icon: string,
  items: [],
  onItemClicked: (item: string) => void
}

const HeroModal = ({ id, name, icon, items, onItemClicked }: HeroModalProps) => {
  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={`${id}ModalLabel`}  data-bs-backdrop="static">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-body-tertiary">
            <h5 className="modal-title" id={`${id}ModalLabel`}><strong>{name}</strong></h5>
            <Image className="img-fluid rounded ms-2" src={icon} alt={`${name} modal`} width={30} height={30} />
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {items.map((item) => {
              return (
                <div key={item}>
                  <button type="button" className="btn btn-secondary shadow-lg m-1" title={`${name} item`} onClick={() => onItemClicked(item)}>
                    <Image className="img-fluid w-100" src={item} alt={`${name} item`} width={200} height={200} loading="lazy" />
                  </button>
                  <br />
                </div>
              );
            })}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Done <i className="bi bi-check-circle-fill ms-1"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroModal;