import { Box, TextField, Button, Modal } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { PantryItem } from "../lib/types";
import { deleteItem } from "../lib/actions";

type DeleteItemModalProps = {
  item: PantryItem;
  openDelete: boolean;
  handleCloseDelete: any;
  pantryItems: PantryItem[];
  index: number;
  reloadPantry:any;
};

export default function DeleteItemModal({
  item,
  openDelete,
  handleCloseDelete,
  pantryItems,
  index,
  reloadPantry
}: DeleteItemModalProps) {

  const handleClick = async () => {
    await deleteItem(item.name)
    // pantryItems.splice(index,1);
    reloadPantry()
    handleCloseDelete()
  }

  return (
    <Modal open={openDelete} onClose={handleCloseDelete}>
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
        <Button onClick={() => handleCloseDelete()}>Cancel</Button>
      </Box>
    </Modal>

  );
}
