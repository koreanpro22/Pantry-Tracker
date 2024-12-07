import { Box, Button, Modal } from "@mui/material";

type ConfirmDeleteModalProps = {
  openModal: boolean;
  closeModal: any;
  handleEvent:any;
};

export default function ConfirmDeleteModal({
  openModal,
  closeModal,
  handleEvent,
}: ConfirmDeleteModalProps) {

  const handleClick = async () => {
    await handleEvent()
    closeModal()
  }

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width={400}
        bgcolor="white"
        boxShadow={24}
        p={4}
        display="flex"
        gap={3}
        sx={{
          transform: "translate(-50%,-50%)",
        }}
      >
        <Button onClick={() => handleClick()}>Confirm Delete</Button>
        <Button onClick={() => closeModal()}>Cancel</Button>
      </Box>
    </Modal>

  );
}
