import { firestore } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { PantryItem, PantryField } from "./types";

async function getRef(name: string) {
  const docRef = doc(collection(firestore, "pantry"), name);
  const snapShot = await getDoc(docRef);

  return { ref: docRef, snapShot: snapShot };
}

//Add single item action
export async function addItem(name: string, quantity: string) {
  const { ref } = await getRef(name);
  console.log("hitting add", ref);
  const date = Date.now()
  await setDoc(ref, { quantity, createdAt: date });
}

//Delete single item action
export async function deleteItem(name: string) {
  const { ref } = await getRef(name);

  console.log("hitting delete item", ref);
  await deleteDoc(ref);
}

//Delete all items action
export async function deleteAllItems() {
  const snapshot = query(collection(firestore, "pantry"));
  const docs = await getDocs(snapshot);

  const deletePromises: Promise<void>[] = [];

  docs.forEach(async (document: any) => {
    deletePromises.push(deleteDoc(doc(firestore, "pantry", `${document.id}`)));
  });

  try {
    await Promise.all(deletePromises);
    console.log("All documents deleted successfully");
  } catch (error) {
    console.error("Error deleting documents:", error);
  }
}

export async function deleteList(names: any) {
  console.log("hitting delete list");

  names.forEach(async (name: string) => {
    const { ref } = await getRef(name);
    await deleteDoc(ref);
  });
}

//Edit single item action
export async function editItem(name: string, quantity: string) {
  const { ref } = await getRef(name);

  console.log("hitting edit", ref);
  await setDoc(ref, { quantity });
}

//Get all pantry items action
export async function getPantry() {
  const snapshot = query(collection(firestore, "pantry"));
  const docs = await getDocs(snapshot);
  const pantryList: PantryItem[] = [];

  docs.forEach((doc: any) => {
    pantryList.push({
      name: doc.id,
      ...(doc.data() as PantryField),
    });
  });
  return pantryList;
}

export async function getRecipeFolders() {

}
export async function createRecipeFolder() {

}
export async function editRecipeFolder() {

}

export async function getRecipes() {

}
export async function createRecipe() {
  
}
export async function editRecipe() {

}
export async function deleteRecipe() {

}
export async function deleteAllRecipes() {

}