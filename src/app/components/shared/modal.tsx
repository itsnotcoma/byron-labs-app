"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    title?: string;
}

const Modal = ({ children, onClose, title }: ModalProps) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        let timer = null;

        const backdropHandler = (event: MouseEvent) => {
            if (!modalRef.current?.contains(event.target as Node)) {
                onClose();
                window.removeEventListener("click", backdropHandler);
            }
        };

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            window.addEventListener("click", backdropHandler);
        });

        return () => {
            window.removeEventListener("click", backdropHandler);
        };
    }, [modalRef, onClose]);

    return createPortal(
        <div className="cdk-overlay-modal fixed left-0 top-0 z-10 flex h-svh w-svw items-center justify-center bg-[#171717]/50">
            <dialog
                ref={modalRef}
                className="border-border bg-muted mx-auto flex max-h-[90vh] w-[calc(100%_-_1.25rem)] max-w-[580px] flex-col items-center justify-center rounded-lg p-5 "
            >
                <header className="relative flex w-full flex-1 pt-5">
                    {title && <h2 className="mb-6 break-words text-center font-clash-display text-2xl">{title}</h2>}
                    <button
                        type="button"
                        className="absolute -right-2 -top-2 flex transition-colors hover:text-black/60"
                        onClick={onClose}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.16998 14.83L14.83 9.17004"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M14.83 14.83L9.16998 9.17004"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </header>
                <main className="overflow-y-auto">{children}</main>
            </dialog>
        </div>,
        document.body
    );
};

export default Modal;
