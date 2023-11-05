export interface Menu {
    name: string;
    ingredients: string[];
    price: number;
}
export interface Category {
    name: string;
    menus?: Menu[];
    image: string;
}