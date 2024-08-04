"use client";

import { useEffect, useState } from "react";
import { Box, Stack, Tooltip, Checkbox } from "@mui/material";
import { PantryItem } from "../lib/types";
import { green } from "@mui/material/colors";
import EditItemButton from "./EditItemButton";
import DeleteItemButton from "./DeleteItemButton";

type PantryListProps = {
  pantryItems: PantryItem[];
  reloadPantry: any;
  searchQuery: string;
};

export default function PantryList({ pantryItems, reloadPantry, searchQuery }: PantryListProps) {
  console.log(pantryItems, reloadPantry);
  // const [items, setItems] = useState(pantryItems);
  const filteredItems = pantryItems.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <Stack
      sx={{
        backgroundColor: "rgba(212, 163, 115, .2)",
      }}
      width="500px"
      maxHeight="100vh"
      spacing={2}
      padding={4}
      m={4}
      overflow={"auto"}
    >
      {filteredItems.map((item: PantryItem, index: number) => {

        console.log(item)
        return item ? (
          <Box
            key={index}
            display={"flex"}
            gap={2}
            bgcolor={"rgba(254, 250, 224, 1)"}
          >
            <Checkbox
              color="success"
              sx={{
                color: "",
                "&.Mui-checked": {
                  color: green[300],
                },
              }}
            />
            <Box
              width="100%"
              minHeight={"50px"}
              display={"flex"}
              // justifyContent="space-evenly"
              justifyContent="start"
              alignItems="center"
              paddingLeft={4}
              // bgcolor={"rgba(254, 250, 224, .4)"}
            >
              <Box>{item.name}</Box>
            </Box>
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
            <EditItemButton item={item} pantryItems={pantryItems} index={index} reloadPantry={reloadPantry}/>
            <DeleteItemButton item={item} pantryItems={pantryItems} index={index} reloadPantry={reloadPantry}/>
          </Box>
        ) : (
          <Box> Nothing </Box>
        );
      })}
    </Stack>
  );
}
