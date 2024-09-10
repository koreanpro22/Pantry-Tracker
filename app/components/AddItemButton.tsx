"use client";

import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddItemModal from "./AddItemModal";
import { useState } from "react";

export default function AddItemButton({reloadPantry} : any) {
  const [openAdd, setOpenAdd] = useState(false);
  const [inputItem, setInputItem] = useState("");

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setOpenAdd(false);
    reloadPantry();
    setInputItem("");
  };

  return (
    <Box>
      <AddItemModal openAdd={openAdd} handleCloseAdd={handleCloseAdd} />

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
