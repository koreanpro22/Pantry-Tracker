import { firestore } from "@/firebase";
import { collection, deleteDoc, doc, getDoc, setDoc, query, getDocs } from "firebase/firestore";
import { PantryItem, quantity } from "./types";

async function getRef(name: string) {
    const docRef = doc(collection(firestore, "pantry"), name)
    const snapShot = await getDoc(docRef);

    return { ref: docRef, snapShot: snapShot }
}

export async function addItem(name: string, quantity: number) {
    const { ref } = await getRef(name);
    console.log('hitting add', ref)
    
    await setDoc(ref, { quantity })
}

export async function deleteItem(name:string) {
    const { ref } = await getRef(name);

    console.log('hitting delete item', ref)
    await deleteDoc(ref);
}

export async function deleteList(names: any) {

    console.log('hitting delete list')

    names.forEach(async (name: string) => {
        const { ref } = await getRef(name);
        await deleteDoc(ref);
    });
}

export async function editItem(name:string, quantity:number) {
    const { ref } = await getRef(name);

    console.log('hitting edit', ref)
    await setDoc(ref, { quantity })

}

export async function getPantry() {
  const snapshot = query(collection(firestore, "pantry"));
  const docs = await getDocs(snapshot);
  const pantryList: PantryItem[] = [];

  docs.forEach((doc: any) => {
    pantryList.push({
      name: doc.id,
      ...(doc.data() as quantity),
    });
  });
  return pantryList
};