import { ReactElement } from "react";

type CustomModalProps = {
  id: string;
  title: string;
  content: ReactElement;
}

const CustomModal = ({ id: id, title, content }: CustomModalProps) => {
  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={`${id}ModalLabel`} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}ModalLabel`}><strong>{title}</strong></h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {content}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Gotcha <i className="bi bi-hand-thumbs-up-fill ms-1"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
