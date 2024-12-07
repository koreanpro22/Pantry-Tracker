export interface PantryItem {
  name: string;
  quantity: string;
  createdAt: number;
}

export interface quantity {
  quantity: string;
}
export interface PantryField {
  quantity: string;
  createdAt: number;
}

export interface PantryItemProps {
  item: {
    name: string;
    quantity: string;
    createdAt: number;
  };
  pantryItems: PantryItem[];
  index: number;
  loadPantry:any;
}

export interface Recipe {
  name: string;                       
  time: number;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  createdAt: number;
}

export interface Folder {
  name: string;
  recipes: Recipe[];
  createdAt: number;
}
