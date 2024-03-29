import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({ show: open, onHide, title, children, closable }) => {
  const [show, setShow] = useState(open);

  const closeModal = () => {
    if (show && onHide) {
      onHide();
    }
  };

  useEffect(() => {
    setShow(open);
  }, [open]);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto"
        onClose={closable !== false ? closeModal : () => {}}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 sm:p-7 md:p-8 overflow-hidden text-left align-middle bg-white dark:bg-base-100 transition-all transform shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-xl font-semibold leading-6">
                {title}
                {closable !== false ? (
                  <label
                    className="btn btn-sm btn-ghost btn-circle absolute right-5 top-7"
                    onClick={closeModal}
                  >
                    ✕
                  </label>
                ) : null}
              </Dialog.Title>
              <div className="mt-5">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
