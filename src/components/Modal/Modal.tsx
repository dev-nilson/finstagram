import { Fragment, useRef, useState, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { useRecoilState } from "recoil";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { Transition, Dialog } from "@headlessui/react";
import { modalState } from "@/atoms/modalAtom";
import { auth, db, storage } from "../../../firebase";
import {
  FaceSmileIcon,
  FaceFrownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Spinner from "../Spinner/Spinner";

function Modal() {
  const [user] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const [expectationFile, setExpectationFile] = useState<string | null>(null);
  const [realityFile, setRealityFile] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [incomplete, setIncomplete] = useState<boolean>(false);
  const inputExpectationRef = useRef<HTMLInputElement>(null);
  const inputRealityRef = useRef<HTMLInputElement>(null);
  const inputCaptionRef = useRef<HTMLInputElement>(null);

  const isIncompletePost = () =>
    !inputExpectationRef.current?.files?.length ||
    !inputRealityRef.current?.files?.length;

  const uploadPost = async () => {
    if (isIncompletePost()) {
      setIncomplete(true);
      return;
    }

    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: user?.displayName,
      caption: inputCaptionRef.current?.value,
      avatar: user?.photoURL,
      timestamp: serverTimestamp(),
    });

    const expectedRef = ref(storage, `posts/${docRef.id}/expected`);
    await uploadString(expectedRef, expectationFile!, "data_url").then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(expectedRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          expected: downloadUrl,
        });
      }
    );

    const realityRef = ref(storage, `posts/${docRef.id}/reality`);
    await uploadString(realityRef, realityFile!, "data_url").then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(realityRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          reality: downloadUrl,
        });
      }
    );

    setIsModalOpen(false);
    setLoading(false);
    setIncomplete(false);
    setExpectationFile(null);
    setRealityFile(null);
  };

  const displayImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    variant: "expectation" | "reality"
  ) => {
    const reader = new FileReader();

    if (!e.target.files) return;
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      if (!readerEvent.target) return;

      const result = readerEvent.target.result as string;
      if (variant === "expectation") setExpectationFile(result);
      else setRealityFile(result);
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
                {expectationFile ? (
                  <div className="relative w-fit m-auto">
                    <Image
                      className="h-[100px] w-[100px] m-auto object-contain p-1 border rounded-md"
                      width={200}
                      height={50}
                      src={expectationFile}
                      alt="post image"
                    />
                    <div
                      className="h-5 w-5 rounded-full cursor-pointer absolute top-1 right-1 bg-red-500 items-center flex"
                      onClick={() => setExpectationFile(null)}
                    >
                      <XMarkIcon
                        className="h-4 w-4 m-auto text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="mx-auto flex items-center justify-center h-12 rounded-md bg-green-100 cursor-pointer"
                    onClick={() => inputExpectationRef.current?.click()}
                  >
                    <FaceSmileIcon
                      className="h-8 w-8 text-green-600"
                      aria-hidden="true"
                    />
                    <span>&nbsp; Click to upload expectation</span>
                  </div>
                )}
                {realityFile ? (
                  <div className="mt-3 relative w-fit m-auto">
                    <Image
                      className="h-[100px] w-[100px] m-auto object-contain p-1 border rounded-md"
                      width={200}
                      height={50}
                      src={realityFile}
                      alt="post image"
                    />
                    <div
                      className="h-5 w-5 rounded-full cursor-pointer absolute top-1 right-1 bg-red-500 items-center flex"
                      onClick={() => setRealityFile(null)}
                    >
                      <XMarkIcon
                        className="h-4 w-4 m-auto text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="mt-3 mx-auto flex items-center justify-center h-12 rounded-md bg-pink-100 cursor-pointer"
                    onClick={() => inputRealityRef.current?.click()}
                  >
                    <FaceFrownIcon
                      className="h-8 w-8 text-pink-600"
                      aria-hidden="true"
                    />
                    <span>&nbsp; Click to upload reality</span>
                  </div>
                )}
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div>
                      <input
                        type="file"
                        ref={inputExpectationRef}
                        onChange={(e) => displayImage(e, "expectation")}
                        accept="image/*"
                        hidden
                      />
                      <input
                        type="file"
                        ref={inputRealityRef}
                        onChange={(e) => displayImage(e, "reality")}
                        accept="image/*"
                        hidden
                      />
                    </div>

                    <div className="mt-2">
                      <input
                        className="border-none focus:ring-0 w-full text-center"
                        type="text"
                        ref={inputCaptionRef}
                        placeholder="Enter caption..."
                      />
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                      onClick={uploadPost}
                    >
                      {loading ? <Spinner /> : "Upload Post"}
                    </button>
                    {incomplete && (
                      <p className="text-center -mb-2 mt-2 text-sm text-red-700">
                        Please upload both pictures
                      </p>
                    )}
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
