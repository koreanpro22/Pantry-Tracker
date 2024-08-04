"use client";

import { Box } from "@mui/material";
import PantryList from "../components/PantryList";
import AddItemButton from "../components/AddItemButton";
import shelvingImage from "../../assets/pantry-shelving.jpg";
import { firestore } from "@/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { PantryItem } from "../lib/types";
import { getPantry } from "../lib/actions";
import { useState, useEffect } from "react";

interface quantity {
  quantity?: number;
}

// const getPantry = async () => {
//   const snapshot = query(collection(firestore, "pantry"));
//   const docs = await getDocs(snapshot);
//   const pantryList: PantryItem[] = [];

//   docs.forEach((doc) => {
//     pantryList.push({
//       name: doc.id,
//       ...(doc.data() as quantity),
//     });
//   });
//   return pantryList
// };

export default function Home() {
  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadPantry = async () => {
    console.log('hitting load pantry')
    try {
      const pantryItems = await getPantry();
      console.log('in try block ', pantryItems)
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
  console.log(pantry)
  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"center"}
        maxWidth={"600px"}
        height="100vh"
        sx={{
          backgroundImage: `url(${shelvingImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundPositionY: "1",
        }}
        p={4}
      >
        <Box alignSelf={"center"} fontSize={36} paddingTop={2}>
          Pantry
        </Box>
        <PantryList pantryItems={pantry} reloadPantry={loadPantry}/>
        <AddItemButton reloadPantry={loadPantry}/>
      </Box>
    </Box>
  );
}
