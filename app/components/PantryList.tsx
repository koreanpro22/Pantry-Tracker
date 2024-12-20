"use client";

import { useState } from "react";
import { Box, Stack, Tooltip, TextField } from "@mui/material";
import { PantryItem } from "../lib/types";
import DeleteModalButton from "./DeleteModalButton";
import EditIcon from "@mui/icons-material/Edit";
import { deleteItem, editItem } from "../lib/actions";

type PantryListProps = {
  pantryItems: PantryItem[];
  loadPantry: any;
  searchQuery: string;
};

export default function PantryList({
  pantryItems,
  loadPantry,
  searchQuery,
}: PantryListProps) {
  const filteredItems = pantryItems
    .sort((a, b) => {
      return a.createdAt - b.createdAt;
    })
    .filter((item) => {
      return item.name.toLowerCase().includes(searchQuery);
    });

  //Use the index of the item currently being editted
  const [currEditIndex, setCurrEditIndex] = useState<number | null>(null);
  const [editQuantity, setEditQuantity] = useState<string>("");

  return (
    <Stack
      sx={{
        backgroundColor: "rgba(212, 163, 115, .8)",
        overflow: "auto",
        scrollbarColor: "rgb(212, 163, 115) #FAEDCD",
      }}
      width="80%"
      minWidth={"350px"}
      maxHeight="100vh"
      // height={"500px"}
      spacing={2}
      padding={4}
      borderRadius={1}
      m={4}
      // overflow={"auto"}
    >
      {!filteredItems.length && !searchQuery.length? 
      <Box display={"flex"} alignSelf={"center"}>Currently No Items in Pantry</Box>
      :
      filteredItems.map((item: PantryItem, index: number) => {
        return (
          <Box
            key={index}
            display={"flex"}
            gap={2}
            bgcolor={"rgba(254, 250, 224, 1)"}
            p={1}
            paddingLeft={4}
          >
            <Box
              width="100%"
              minHeight={"50px"}
              display={"flex"}
              justifyContent="start"
              alignItems="center"
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
                gap={1}
              >
                <TextField value={editQuantity} />
                <Box
                  onClick={async () => {
                    await editItem(item.name, editQuantity);
                    await loadPantry();
                    setCurrEditIndex(null);
                  }}
                >
                  Save
                </Box>
                <Box
                  onClick={async () => {
                    setCurrEditIndex(null);
                  }}
                >
                  Cancel
                </Box>
              </Box>
            ) : (
              <Box
                display={"flex"}
                height={24}
                // width={"18px"}
                justifyContent={"end"}
                alignSelf={"center"}
                alignItems={"center"}
                // p={2}
              >
                <Box display={"flex"} justifyContent={"center"} width={"100px"}>
                  {item.quantity}
                </Box>
              </Box>
            )}
            {index !== currEditIndex && (
              <Box display={"flex"} gap={1}>
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
                <DeleteModalButton
                  event={async () => {
                    await deleteItem(item.name);
                    loadPantry();
                  }}
                />
              </Box>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}
