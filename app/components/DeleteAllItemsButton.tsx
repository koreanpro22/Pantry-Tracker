import { Box, Button } from "@mui/material";
import { deleteAllItems } from "../lib/actions";

interface DeleteAllItemsButtonProps {
  reloadPantry: any;
}

export default function DeleteAllItemsButton({
  reloadPantry,
}: DeleteAllItemsButtonProps) {
  const handleClick = async () => {
    await deleteAllItems();
    reloadPantry();
  };

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Button
        sx={{
          bgcolor: "rgba(254, 250, 224, 1)",
          color: "black",
          border: "1px solid black",
        }}
        variant="contained"
        onClick={() => handleClick()}
      >
        Delete All
      </Button>
    </Box>
  );
}
