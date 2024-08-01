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
  // const items = [
  //   {
  //     name: "apple",
  //     quantity: 2,
  //   },
  //   {
  //     name: "banana",
  //     quantity: 4,
  //   },
  //   {
  //     name: "orange",
  //     quantity: 3,
  //   },
  //   {
  //     name: "kiwi",
  //     quantity: 1,
  //   },
  //   {
  //     name: "onions",
  //     quantity: 5,
  //   },
  //   {
  //     name: "watermelon",
  //     quantity: 2,
  //   },
  //   {
  //     name: "cabbage",
  //     quantity: 3,
  //   },
  //   {
  //     name: "lettuce",
  //     quantity: 1,
  //   },
  //   {
  //     name: "garlic",
  //     quantity: 4,
  //   },
  //   {
  //     name: "beef",
  //     quantity: 2,
  //   },
  //   {
  //     name: "tofu",
  //     quantity: 5,
  //   },
  //   {
  //     name: "spinach",
  //     quantity: 3,
  //   },
  // ];

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
    }
    setOpen(false)
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
      justifyContent={"center"}
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
          border="2px solid black"
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
      <Box alignSelf={"center"} fontSize={24} p={2}>
        Pantry Tracker
      </Box>
      <Stack
        width="100vw"
        maxHeight="500px"
        spacing={2}
        padding={4}
        m={4}
        overflow={"auto"}
      >
        {/* {items.map((item, index) => ( */}
        {pantry.map((item, index) => (
          <Box key={index} display={"flex"} gap={2}>
            <Box
              width="100%"
              minHeight={"50px"}
              display={"flex"}
              justifyContent="space-evenly"
              alignItems="center"
              // border="solid black"
              bgcolor={"#dfcf7b"}
            >
              <Box
              // border="solid black"
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
        // border={"dotted black"}
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
