import { Dialog, DialogPanel } from "@headlessui/react";

export default function MyModal({
  isVisible,
  close,
  children,
}: {
  close: () => void;
  isVisible: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Dialog
        open={isVisible}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div
          //  onClick={close}
          className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50"
        >
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-[#f8f8f8] p-8 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {children}
              <div className="mt-6 flex justify-end"></div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
