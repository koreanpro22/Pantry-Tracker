export interface PantryItem {
  name: string;
  quantity: string;
}

export interface quantity {
  quantity: string;
}

export interface PantryItemProps {
  item: {
    name: string;
    quantity: string;
  };
  pantryItems: PantryItem[];
  index: number;
  reloadPantry:any;
}
