import { Box, TextField, Button, Modal } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { PantryItem } from "../lib/types";
import { editItem } from "../lib/actions";

type EditItemModalProps = {
  item: PantryItem;
  openEdit: boolean;
  handleCloseEdit: any;
  pantryItems: PantryItem[];
  index: number;
  reloadPantry: any;
};

export default function EditItemModal({ item, openEdit, handleCloseEdit, pantryItems, reloadPantry }: EditItemModalProps) {
  const [quantity, setQuantity] = useState<string>(item.quantity || "");


  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleClick = async () => {
    await editItem(item.name, quantity);
    reloadPantry();
    handleCloseEdit();
  };

  return (
    <Modal open={openEdit} onClose={handleCloseEdit} >
      <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%,-50%)",
          }}
      >
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          onChange={handleQuantityChange}
          defaultValue={quantity}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button onClick={handleClick}>Edit</Button>
      </Box>
    </Modal>
  );
}
