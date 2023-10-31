export interface Menu {
    id: string;
    name: string;
    ingredients: string[];
    price: number;
    image: string;
}
export interface Category {
    id: string
    name: string;
    menus?: Menu[];
    image: string;
}