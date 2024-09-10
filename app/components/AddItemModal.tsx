"use client";

import { Box, TextField, Button, Modal } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { addItem } from "../lib/actions";
import kirbyCoffee from "../../assets/kirby-coffee.jpg";

type AddItemModalProps = {
  openAdd: boolean;
  handleCloseAdd: any;
};

export default function AddItemModal({
  openAdd,
  handleCloseAdd,
}: AddItemModalProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<string>("1");

  const handleAddNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setName(e.target.value);
  };
  const handleAddQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setQuantity(e.target.value);
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
        width={250}
        // bgcolor="white"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          backgroundImage: `url(${kirbyCoffee.src})`,
          backgroundSize: "contain",
          opacity: 0.8,
          transform: "translate(-50%,-50%)",
        }}
        // color={"black"}
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
          label="Quantity"
          // type="number"
          onChange={handleAddQuantityChange}
          defaultValue={quantity}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="outlined"
          sx={{
            width: "fit-content",
            alignSelf: "center",
            bgcolor: "rgba(254, 250, 224, 1)",
            color: "black",
          }}
          onClick={() => handleClick()}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
}
