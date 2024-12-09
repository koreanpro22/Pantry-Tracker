import { Box, Tooltip, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import ConfirmDeleteModal from "./ComfirmDeleteModal";

type DeleteModalButtonProps = {
  event: any;
  message?: string;
};

export default function DeleteModalButton({
  event,
  message,
}: DeleteModalButtonProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <ConfirmDeleteModal
        openModal={openModal}
        closeModal={handleCloseModal}
        handleEvent={event}
      />
      {message ? (
        <Button
          sx={{
            bgcolor: "rgba(254, 250, 224, 1)",
            color: "black",
            border: "1px solid black",
          }}
          variant="contained"
          endIcon={<DeleteIcon />}
          onClick={() => handleOpenModal()}
        >
          {message}
        </Button>
      ) : (
        <Box
          border={"solid 1px"}
          display={"flex"}
          justifyContent={"center"}
          alignSelf={"center"}
          borderRadius={2}
          p={1}
          onClick={() => handleOpenModal()}
        >
          <Tooltip title="Delete">
            <DeleteIcon sx={{ ":hover": { cursor: "pointer" } }} />
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
