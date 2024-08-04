export interface PantryItem {
  name: string;
  quantity?: number;
}

export interface quantity {
  quantity?: number;
}

export interface PantryItemProps {
  item: {
    name: string;
    quantity?: number;
  };
  pantryItems: PantryItem[];
  index: number;
  reloadPantry:any;
}
