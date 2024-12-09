"use client";

import { Box, Button, TextField, Stack } from "@mui/material";
import PantryList from "./components/PantryList";
import AddItemButton from "./components/AddItemButton";
import kirbyImage from "../assets/kirby-background.jpg";
import { PantryItem, Folder, Recipe } from "./lib/types";
import {
  createFolder,
  deleteAllItems,
  getPantry,
  getRecipeFolders,
} from "./lib/actions";
import { useState, useEffect, ChangeEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModalButton from "./components/DeleteModalButton";
import { reload } from "firebase/auth";

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
    setActiveFolder("");
  };
  const handleRecipesClick = async () => {
    await setSearchQuery("");
    setActiveView("recipes");
    setActiveFolder("");
  };

  const handleAllFolders = async () => {
    setActiveFolder("");
  };

  const handleCreateRecipes = async () => {
    alert("hitting create recipes");
  };

  const handleCreateFolder = async () => {
    console.log("hitting create folder");
    await createFolder(folderName);
  };

  const handleFolderClick = async (folderName: string) => {
    setActiveFolder(folderName);
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
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      sx={{
        backgroundImage: `url(${kirbyImage.src})`,
        backgroundPositionY: "1px", // Fixed unit
        backgroundRepeat: "repeat",
        maxWidth: "100%",
      }}
    >
      {/* Search Bar */}
      <Box marginTop={10}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          margin="normal"
        />
      </Box>

      {/* Main Content */}
      <Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
          maxWidth="600px"
          height="100vh"
          p={2}
        >
          {/* Pantry View */}
          {activeView === "pantry" && (
            <>
              {/* Pantry Header */}
              <Box width="100vw" display="flex" justifyContent="space-evenly">
                <Box fontSize="30px">Pantry</Box>
                <Box fontSize="30px" onClick={handleRecipesClick}>
                  Recipes
                </Box>
              </Box>

              {/* Pantry List */}
              <PantryList
                pantryItems={pantry}
                loadPantry={loadPantry}
                searchQuery={searchQuery}
              />

              {/* Pantry Actions */}
              <Box display="flex" width="100vw" justifyContent="space-evenly">
                <AddItemButton loadPantry={loadPantry} />
                <DeleteModalButton
                  event={async () => {
                    await deleteAllItems();
                    loadPantry();
                  }}
                  message="Delete All Items"
                />
              </Box>
            </>
          )}

          {/* Recipes View */}
          {activeView === "recipes" && (
            <>
              {/* Recipes Header */}
              <Box width="100vw" display="flex" justifyContent="space-evenly">
                <Box fontSize="30px" onClick={handlePantryClick}>
                  Pantry
                </Box>
                <Box fontSize="30px">Recipes</Box>
              </Box>

              {/* Active Folder or Folders List */}
              {activeFolder ? (
                <Box display="flex">
                  <Box>ACTIVE FOLDER</Box>
                  <Button variant="outlined" onClick={handleAllFolders}>
                    Show All Folders
                  </Button>
                  {/* Add Recipe Button */}
                  {/* <Button onClick={handleCreateRecipes}>Create new recipes</Button> */}
                </Box>
              ) : (
                <Box>
                  {/* Folders List */}
                  <Stack
                    sx={{
                      backgroundColor: "rgba(212, 163, 115, .8)",
                      overflow: "auto",
                      scrollbarColor: "rgb(212, 163, 115) #FAEDCD",
                    }}
                    width="80%"
                    minWidth="350px"
                    maxHeight="100vh"
                    spacing={2}
                    padding={4}
                    m={4}
                  >
                    {filteredFolders.map((folder, i) => (
                      <Box
                        key={i}
                        display="flex"
                        gap={2}
                        bgcolor="rgba(254, 250, 224, 1)"
                        p={1}
                        paddingLeft={4}
                      >
                        <Box
                          sx={{ ":hover": { cursor: "pointer" } }}
                          onClick={() => handleFolderClick(folder.name)}
                        >
                          {folder.name}
                        </Box>
                        <Box display="flex" height={24} justifyContent="end">
                          <DeleteIcon
                            sx={{ ":hover": { cursor: "pointer" } }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Stack>

                  {/* New Folder Input */}
                  <TextField
                    id="outlined-basic"
                    label="New Folder Name"
                    variant="outlined"
                    value={folderName}
                    margin="normal"
                    onChange={(e) => setFolderName(e.target.value)}
                  />
                  <Button variant="contained" onClick={handleCreateFolder}>
                    Create new folder
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
