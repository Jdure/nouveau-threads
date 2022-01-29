export interface FetchCart {
    data: Data;
}

export interface Data {
    cartCreate: CartCreate;
}

export interface CartCreate {
    cart:       Cart;
    userErrors: any[];
}

export interface Cart {
    id: string;
}