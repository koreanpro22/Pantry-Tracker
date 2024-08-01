"use client";

import {
  Box,
  Stack,
  TextField,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect, ChangeEvent } from "react";
import { firestore } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

interface PantryItem {
  name: string;
  quantity?: number;
}

interface quantity {
  quantity?: number;
}

export default function Home() {
  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [inputItem, setInputItem] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setInputItem(e.target.value);
  };

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList: PantryItem[] = [];

    docs.forEach((doc) => {
      pantryList.push({
        name: doc.id,
        ...(doc.data() as quantity),
      });
    });
    setPantry(pantryList);
  };

  const addItem = async (item: string) => {
    if (inputItem) {
      const docRef = doc(collection(firestore, "pantry"), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1 });
      } else {
        await setDoc(docRef, { quantity: 1 });
      }
      await setInputItem('')
    }
    setOpen(false);
    await updatePantry();
  };

  const addOne = async (item: string) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);

    let quantity = 0;
    if (docSnap.exists()) {
      quantity = docSnap.data().quantity;
    }

    await setDoc(docRef, { quantity: quantity + 1 });
    await updatePantry();
  };

  const removeItem = async (item: string) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updatePantry();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    updatePantry();
  }, []);

  console.log("Pantry list: ", pantry);

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      p={4}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%,-50%)",
          }}
        >
          <TextField
            id="standard-basic"
            label="New Pantry Item"
            variant="standard"
            value={inputItem}
            onChange={handleChange}
          />
          <Button onClick={() => addItem(inputItem)}>Add</Button>
          {/* <Typography variant="h6">Add Item</Typography> */}
        </Box>
      </Modal>
      <Box alignSelf={"center"} fontSize={24} p={2} border="solid black">
        Pantry Tracker
      </Box>
      <Stack
        width="100vw"
        maxHeight="100vh"
        spacing={2}
        padding={4}
        m={4}
        overflow={"auto"}
      >
        {pantry.map((item, index) => (
          <Box key={index} display={"flex"} gap={2}>
            <Box
              width="100%"
              minHeight={"50px"}
              display={"flex"}
              justifyContent="space-evenly"
              alignItems="center"
              bgcolor={"#dfcf7b"}
            >
              <Box
              >
                {item.name} {item.quantity}
              </Box>
            </Box>

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => addOne(item.name)}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => removeItem(item.name)}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Stack>
      <Box
        display={"flex"}
        width="100vw"
        paddingLeft={4}
        paddingRight={4}
        alignItems="center"
        justifyContent="center"
      ></Box>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add
      </Button>
    </Box>
  );
}
