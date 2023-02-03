import Image from "next/image";
import { useRecoilState } from "recoil";
import { Transition, Dialog } from "@headlessui/react";
import { modalState } from "@/atoms/modalAtom";
import { Fragment, useRef, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

function Modal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (!e.target.files) return;
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      if (!readerEvent.target) return;
      setSelectedFile(readerEvent.target.result as string);
    };
  };

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setIsModalOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-md px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:pb-6">
              <div>
                {selectedFile && (
                  <Image
                    className="w-full object-contain"
                    width={200}
                    height={200}
                    src={selectedFile}
                    alt="post image"
                  />
                )}
                <div
                  className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 cursor-pointer"
                  onClick={() => inputFileRef.current?.click()}
                >
                  <PhotoIcon
                    className="h-7 w-7 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload Pictures
                    </Dialog.Title>

                    <div>
                      <input
                        type="file"
                        ref={inputFileRef}
                        onChange={addImage}
                        hidden
                      />
                    </div>

                    <div className="mt-2">
                      <input
                        className="border-none focus:ring-0 w-full text-center"
                        type="text"
                        placeholder="Enter caption..."
                      />
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    >
                      Upload Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
