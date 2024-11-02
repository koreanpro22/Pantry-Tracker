"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Tooltip,
  Checkbox,
  Button,
  TextField,
} from "@mui/material";
import { PantryItem } from "../lib/types";
import { green } from "@mui/material/colors";
import EditItemButton from "./EditItemButton";
import DeleteItemButton from "./DeleteItemButton";
import EditIcon from "@mui/icons-material/Edit";
import { editItem } from "../lib/actions";

type PantryListProps = {
  pantryItems: PantryItem[];
  reloadPantry: any;
  searchQuery: string;
};

export default function PantryList({
  pantryItems,
  reloadPantry,
  searchQuery,
}: PantryListProps) {
  // const [items, setItems] = useState(pantryItems);
  // const filteredItems = pantryItems.filter((item) => {
  //   return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  // });
  const filteredItems = pantryItems.sort((a, b) => {
    return a.createdAt - b.createdAt
  });

  //Use the index of the item currently being editted
  const [currEditIndex, setCurrEditIndex] = useState<number | null>(null);
  const [editQuantity, setEditQuantity] = useState<string>("");
  console.log('pantryItems', pantryItems)
  return (
    <Stack
      sx={{
        backgroundColor: "rgba(212, 163, 115, .2)",
      }}
      width="80%"
      minWidth={"350px"}
      maxHeight="100vh"
      spacing={2}
      padding={4}
      m={4}
      overflow={"auto"}
    >
      {filteredItems.map((item: PantryItem, index: number) => {
        return (
          <Box
            key={index}
            display={"flex"}
            gap={2}
            bgcolor={"rgba(254, 250, 224, 1)"}
            p={1}
          >
            <Box
              width="100%"
              minHeight={"50px"}
              display={"flex"}
              justifyContent="start"
              alignItems="center"
              paddingLeft={4}
            >
              <Box>{item.name}</Box>
            </Box>
            {index === currEditIndex ? (
              <Box
                display={"flex"}
                height={24}
                justifyContent={"center"}
                alignSelf={"center"}
                alignItems={"center"}
                p={2}
              >
                <input type="text" size={3} value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)}/>
                <Button
                  onClick={async () => {
                    await editItem(item.name, editQuantity);
                    await reloadPantry();
                    setCurrEditIndex(null);
                  }}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <Box
                display={"flex"}
                height={24}
                justifyContent={"center"}
                alignSelf={"center"}
                alignItems={"center"}
                p={2}
              >
                {item.quantity}
              </Box>
            )}
            {index !== currEditIndex && (
              <Box
                border={"solid 1px"}
                display={"flex"}
                justifyContent={"center"}
                alignSelf={"center"}
                borderRadius={2}
                p={1}
                onClick={() => {
                  setEditQuantity(item.quantity);
                  setCurrEditIndex(index);
                }}
              >
                <Tooltip title="Edit">
                  <EditIcon sx={{ ":hover": { cursor: "pointer" } }} />
                </Tooltip>
              </Box>
            )}
            <DeleteItemButton
              item={item}
              pantryItems={pantryItems}
              index={index}
              reloadPantry={reloadPantry}
            />
          </Box>
        );
      })}
    </Stack>
  );
}
