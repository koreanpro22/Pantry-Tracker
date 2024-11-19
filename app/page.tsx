"use client";

import { Box, Button, TextField, Stack } from "@mui/material";
import PantryList from "./components/PantryList";
import AddItemButton from "./components/AddItemButton";
import kirbyImage from "../assets/kirby-background.jpg";
import { PantryItem, Folder, Recipe } from "./lib/types";
import { createFolder, getPantry, getRecipeFolders } from "./lib/actions";
import { useState, useEffect, ChangeEvent } from "react";
import DeleteAllItemsButton from "./components/DeleteAllItemsButton";
import DeleteIcon from "@mui/icons-material/Delete";


export default function Home() {
  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("pantry");

  const [folderName, setFolderName] = useState("");
  const [activeFolder, setActiveFolder] = useState("");

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

  const loadFolders = async () => {
    try {
      const folders = await getRecipeFolders();
      setFolders(folders);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const handlePantryClick = async () => {
    await setSearchQuery("");
    setActiveView("pantry");
  };
  const handleRecipesClick = async () => {
    await setSearchQuery("");
    setActiveView("recipes");
  };

  const handleCreateRecipes = async () => {
    alert("hitting create recipes");
  };

  const handleCreateFolder = async () => {
    console.log("hitting create folder");
    await createFolder(folderName);
  };

  useEffect(() => {
    console.log("hitting pantry useEffect");
    loadPantry();
    loadFolders();
  }, []);

  const filteredFolders = folders
    .sort((a, b) => {
      return a.createdAt - b.createdAt;
    })
    .filter((folder) => {
      return folder.name.toLowerCase().includes(searchQuery);
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("Folders: ", folders);
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
      {activeFolder ? (
        <Box>ACTIVE FOLDER</Box>
      ) : (
        <Box>
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
              <Box
                display={"flex"}
                width="100vw"
                justifyContent={"space-evenly"}
              >
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
              <Stack gap={1}>
                {filteredFolders.map((folder, i) => {
                  return (
                    <Box>
                    <Button key={i} variant="contained">
                      {folder.name}
                    </Button>
                    <DeleteIcon />
                    </Box>
                  );
                })}
              </Stack>
              <TextField
                id="oultined-basic"
                label="New Folder Name"
                variant="outlined"
                value={folderName}
                margin="normal"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFolderName(e.target.value)
                }
              />
              <Button variant="contained" onClick={handleCreateFolder}>
                Create new folder
              </Button>

              {/* Add Recipe Button */}
              {/* <Button onClick={handleCreateRecipes}>Create new recipes</Button> */}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
