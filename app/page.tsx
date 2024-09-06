// "use client";

// import { Box, Stack, TextField, Button, Modal, Typography } from "@mui/material";
// import { useState, useEffect, ChangeEvent } from "react";
// import { firestore } from "@/firebase";
// import {
//   collection, doc, getDoc, getDocs, query,
// } from "firebase/firestore";

// export default function Home() {
//   return (
//     <Box >
//       <Typography variant="h2">
//         Pantry Tracker
//       </Typography>
//     </Box>
//   );
// }
"use client";

import { Box, TextField } from "@mui/material";
import PantryList from "./components/PantryList";
import AddItemButton from "./components/AddItemButton";
import shelvingImage from "../assets/pantry-shelving.jpg";
import kirbyImage from "../assets/kirby-background.jpg";
import { firestore } from "@/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { PantryItem } from "./lib/types";
import { getPantry } from "./lib/actions";
import { useState, useEffect } from "react";

export default function Home() {
  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadPantry = async () => {
    console.log("hitting load pantry");
    try {
      const pantryItems = await getPantry();
      console.log("in try block ", pantryItems);
      setPantry(pantryItems);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPantry();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(pantry);
  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      sx={{
        backgroundImage: `url(${kirbyImage.src})`,
        backgroundPositionY: "1",
        backgroundRepeat: "repeat",
        maxWidth: "100%",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"center"}
        maxWidth={"600px"}
        height="100vh"
        // sx={{
        //   backgroundImage: `url(${kirbyImage.src})`,
        //   backgroundPositionY: "1",
        //   backgroundRepeat: "repeat",
        //   maxWidth: "100%",
        // }}
        p={4}
      >
        <Box alignSelf={"center"} fontSize={36} paddingTop={2}>
          Pantry
        </Box>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
        <PantryList
          pantryItems={pantry}
          reloadPantry={loadPantry}
          searchQuery={searchQuery}
        />
        <AddItemButton reloadPantry={loadPantry} />
      </Box>
    </Box>
  );
}
