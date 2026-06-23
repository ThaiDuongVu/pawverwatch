import { ReactElement } from "react";

type CustomModalProps = {
  name: string;
  title: string;
  content: ReactElement;
}

const CustomModal = ({ name, title, content }: CustomModalProps) => {
  return (
    <div className="modal fade" id={name} tabIndex={-1} aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalLabel"><strong>{title}</strong></h1>
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
