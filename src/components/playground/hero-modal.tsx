import Image from "next/image"
import { ReactElement } from "react";

interface HeroModalProps {
  id: string,
  name: string,
  icon: string,
  items: [],
  onItemClicked: (item: string) => void
}

const HeroModal = ({ id, name, icon, items, onItemClicked }: HeroModalProps) => {
  const itemButton = (item: string) => {
    if (!item || item === "") return <div></div>
    return (
      <button type="button" className="btn btn-secondary shadow-lg m-1" title={`${name} item`} onClick={() => onItemClicked(item)}>
        <Image className="img-fluid" src={item} alt={`${name} item`} width={200} height={200} loading="lazy" />
      </button>
    );
  }

  const itemGrid = () => {
    let rows: ReactElement[] = [];
    for (let i = 0; i < items.length; i += 2) {
      const item1 = items[i];
      const item2 = items[i + 1];
      rows = [...rows,
      <div className="row" key={`itemRow${i}`}>
        <div className="col">{itemButton(item1)}</div>
        <div className="col">{itemButton(item2)}</div>
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
            <h5 className="modal-title" id={`${id}ModalLabel`}><strong>{name}</strong></h5>
            <Image className="img-fluid rounded ms-2" src={icon} alt={`${name} modal`} width={30} height={30} />
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {itemGrid()}
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