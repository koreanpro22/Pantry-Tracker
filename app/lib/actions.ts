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
import { PantryItem, PantryField, Folder, Recipe } from "./types";

async function getPantryRef(name: string) {
  const docRef = doc(collection(firestore, "pantry"), name);
  const snapShot = await getDoc(docRef);

  return { ref: docRef, snapShot: snapShot };
}

async function getFolderRef(name: string) {
  const docRef = doc(collection(firestore, "folder"), name);
  const snapShot = await getDoc(docRef);

  return { ref: docRef, snapShot: snapShot };
}

//Add single item action
export async function addItem(name: string, quantity: string) {
  const { ref } = await getPantryRef(name);
  console.log("hitting add", ref);
  const date = Date.now();
  await setDoc(ref, { quantity, createdAt: date });
}

//Delete single item action
export async function deleteItem(name: string) {
  const { ref } = await getPantryRef(name);

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

//Edit single item action
export async function editItem(name: string, quantity: string) {
  const { ref } = await getPantryRef(name);

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
  const snapshot = query(collection(firestore, "folder"));
  const docs = await getDocs(snapshot);

  const folders: Folder[] = [];
  docs.forEach(async (doc) => {
    const folderData = doc.data() as Folder;

    const recipesRef = collection(firestore, "folder", doc.id, "recipes");
    const recipesSnapshot = await getDocs(recipesRef);

    const recipes: Recipe[] = [];
    recipesSnapshot.forEach((recipeDoc: any) => {
      recipes.push({
        ...(recipeDoc.data() as Recipe),
        name: recipeDoc.id
      });
    });

    folders.push({
      ...folderData,
      name: doc.id,
      recipes: recipes,
    });
  });

  return folders;
}

export async function createFolder(name: string) {
  const { ref } = await getFolderRef(name);

  console.log("hitting create folder", ref);
  const date = Date.now();
  await setDoc(ref, { createdAt: date });
}

export async function editRecipeFolder() {}

export async function getRecipes() {}
export async function createRecipe() {}
export async function editRecipe() {}
export async function deleteRecipe() {}
export async function deleteAllRecipes() {}
