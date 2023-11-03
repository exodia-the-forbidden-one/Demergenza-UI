export interface Menu {
    id: string;
    name: string;
    ingredients: any;
    price: number;
    image: string;
    category:Category;
}
export interface Category {
    id: string
    name: string;
    menus?: Menu[];
    image: string;
}