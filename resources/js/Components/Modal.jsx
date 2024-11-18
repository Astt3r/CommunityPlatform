import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";

export default function Modal({
    children,
    show = false,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {},
    title = "Modal Title", // New title prop with a default value
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 transition-all sm:px-0"
                onClose={close}
            >
                {/* Background Overlay */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gob-grey-90/75" />
                </TransitionChild>

                {/* Modal Panel */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <DialogPanel
                        className={`transform overflow-hidden squared bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gob-grey-10 p-4">
                            <h3 className="text-lg font-bold text-gob-primary-darken-3">
                                {title} {/* Dynamic title */}
                            </h3>
                            {closeable && (
                                <button
                                    type="button"
                                    onClick={close}
                                    className="text-gob-grey-70 hover:text-gob-primary-base focus:outline-none"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 text-gob-grey-70">{children}</div>
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
