"use client";

import { Box, Button, TextField } from "@mui/material";
import PantryList from "./components/PantryList";
import AddItemButton from "./components/AddItemButton";
import kirbyImage from "../assets/kirby-background.jpg";
import { PantryItem } from "./lib/types";
import { getPantry } from "./lib/actions";
import { useState, useEffect } from "react";
import DeleteAllItemsButton from "./components/DeleteAllItemsButton";

export default function Home() {
  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("pantry");

  const loadPantry = async () => {
    try {
      const pantryItems = await getPantry();
      setPantry(pantryItems);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handlePantryClick = async () => {
    await setSearchQuery("")
    setActiveView("pantry");

  };
  const handleRecipesClick = async () => {
    await setSearchQuery("")
    setActiveView("recipes");
  };

  const handleCreateRecipes = async () => {
    alert('hitting create recipes')
  }

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
      {activeView === "pantry" && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"center"}
          maxWidth={"600px"}
          height="100vh"
          p={4}
        >
          <Box
            width="100vw"
            display={"flex"}
            justifyContent={"space-evenly"}
            paddingTop={2}
          >
            <Box fontSize={"30px"}>Pantry</Box>

            <Box fontSize={"30px"} onClick={handleRecipesClick}>
              Recipes
            </Box>
          </Box>
          <TextField
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // fullWidth
            margin="normal"
          />
          <PantryList
            pantryItems={pantry}
            reloadPantry={loadPantry}
            searchQuery={searchQuery}
          />
          <Box display={"flex"} width="100vw" justifyContent={"space-evenly"}>
            <AddItemButton reloadPantry={loadPantry} />
            <DeleteAllItemsButton reloadPantry={loadPantry} />
          </Box>
        </Box>
      )}
      {activeView === "recipes" && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"center"}
          maxWidth={"600px"}
          height="100vh"
          p={4}
        >
          <Box
            width="100vw"
            display={"flex"}
            justifyContent={"space-evenly"}
            paddingTop={2}
          >
            <Box fontSize={"30px"} onClick={handlePantryClick}>
              Pantry
            </Box>

            <Box fontSize={"30px"}>Recipes</Box>
          </Box>
          <TextField
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // fullWidth

            margin="normal"
          />

          {/* Recipe list component */}


          {/* Add Recipe Button */}
          <Button onClick={handleCreateRecipes}>Create new recipes</Button>
        </Box>
      )}
    </Box>
  );
}
