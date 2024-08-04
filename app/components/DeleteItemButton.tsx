import { Box, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import DeleteItemModal from "./DeleteItemModal";
import { PantryItemProps } from "../lib/types";

export default function DeleteItemButton({ item, pantryItems, index, reloadPantry }: PantryItemProps) {
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <DeleteItemModal
        item={item}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        pantryItems={pantryItems}
        index={index}
        reloadPantry={reloadPantry}
      />
      <Box
        border={"solid"}
        display={"flex"}
        justifyContent={"center"}
        alignSelf={"center"}
        borderRadius={2}
        p={1}
        onClick={() => handleOpenDelete()}
      >
        <Tooltip title="Delete">
          <DeleteIcon sx={{ ":hover": { cursor: "pointer" } }} />
        </Tooltip>
      </Box>
    </Box>
  );
}
