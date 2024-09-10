import { Box, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditItemModal from "./EditItemModal";
import { PantryItemProps } from "../lib/types";

export default function EditItemButton({ item, pantryItems, index, reloadPantry }: PantryItemProps) {
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <EditItemModal
        item={item}
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
        pantryItems={pantryItems}
        index={index}
        reloadPantry={reloadPantry}
      />
      <Box
        border={"solid 1px"}
        display={"flex"}
        justifyContent={"center"}
        alignSelf={"center"}
        borderRadius={2}
        p={1}
        onClick={() => handleOpenEdit()}
      >
        <Tooltip title="Edit">
          <EditIcon sx={{ ":hover": { cursor: "pointer" } }} />
        </Tooltip>
      </Box>
    </Box>
  );
}
