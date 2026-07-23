import Image from "next/image";

const Toast = ({ id, header, message, isError }: { id: string, header: string, message: string, isError?: boolean }) => {
  return (
    <div className="toast-container position-fixed bottom-0 end-0">
      <div className="toast justify-content-center m-2" id={id} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header bg-body-secondary">
          {
            isError
              ?
              <Image src="/images/red.png" width={25} height={25} unoptimized={true} alt="toastHeaderImage" className="rounded me-2" />
              :
              <Image src="/icon/icon.png" width={25} height={25} unoptimized={true} alt="toastHeaderImage" className="rounded me-2" />
          }
          <strong className="me-auto">{header}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  );
};

export default Toast;