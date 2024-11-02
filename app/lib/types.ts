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
  reloadPantry:any;
}
