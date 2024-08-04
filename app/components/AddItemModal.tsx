"use client";

import { Box, TextField, Button, Modal } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { addItem } from "../lib/actions";

type AddItemModalProps = {
  openAdd: boolean;
  handleCloseAdd: any;
};

export default function AddItemModal({
  openAdd,
  handleCloseAdd,
}: AddItemModalProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setName(e.target.value);
  };
  const handleAddQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setQuantity(Number(e.target.value));
  };

  const handleClick = async () => {
    await addItem(name, quantity);
    handleCloseAdd();
  };

  return (
    <Modal open={openAdd} onClose={handleCloseAdd}>
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
          id="standard-basic"
          label="New Pantry Item"
          variant="standard"
          value={name}
          onChange={handleAddNameChange}
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          onChange={handleAddQuantityChange}
          defaultValue={quantity}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="outlined"
          sx={{ width: "fit-content", alignSelf: "center" }}
          onClick={() => handleClick()}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
}
