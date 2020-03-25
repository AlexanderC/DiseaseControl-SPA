import { useState } from "react";

export const useModal = (initialState: boolean = false) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return {
    isOpen: modalOpen,
    open,
    close,
  };
};
