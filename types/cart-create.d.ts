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
    id:            string;
    updatedAt:     Date;
    createdAt:     Date;
    checkoutUrl:   string;
    estimatedCost: EstimatedCost;
    lines:         Lines;
}

export interface EstimatedCost {
    totalAmount: TotalAmount;
}

export interface TotalAmount {
    amount:       string;
    currencyCode: string;
}

export interface Lines {
    edges: any[];
}