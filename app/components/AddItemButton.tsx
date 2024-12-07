"use client";

import { Box, Button, TextField, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, ChangeEvent } from "react";
import { addItem } from "../lib/actions";
import kirbyCoffee from "../../assets/kirby-coffee.jpg";

export default function AddItemButton({loadPantry} : any) {
  const [openAdd, setOpenAdd] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<string>("1");

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setName("");
    loadPantry();
  };

  const handleAddNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleAddQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleAddItem = async () => {
    await addItem(name, quantity);
    handleCloseAdd();
  };


  return (
    <Box>
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
          onClick={() => handleAddItem()}
        >
          Add
        </Button>
      </Box>
    </Modal>
      <Button
        sx={{
            bgcolor: "rgba(254, 250, 224, 1)",
            color: "black",
            border: "1px solid black"
        }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenAdd()}
      >
        Add
      </Button>
    </Box>
  );
}
