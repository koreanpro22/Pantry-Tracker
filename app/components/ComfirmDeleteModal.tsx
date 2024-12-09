import { Box, Button, Modal } from "@mui/material";

type ConfirmDeleteModalProps = {
  openModal: boolean;
  closeModal: any;
  handleEvent: any;
};

export default function ConfirmDeleteModal({
  openModal,
  closeModal,
  handleEvent,
}: ConfirmDeleteModalProps) {
  const handleClick = async () => {
    await handleEvent();
    closeModal();
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        bgcolor="rgba(254, 250, 224, 1)"
        boxShadow={24}
        p={3}
        display="flex"
        borderRadius={1}
        gap={3}
        sx={{
          transform: "translate(-50%,-50%)",
        }}
      >
        <Button variant="contained" color="error" onClick={() => handleClick()}>
          Confirm Delete
        </Button>
        <Button variant="contained" onClick={() => closeModal()}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}
