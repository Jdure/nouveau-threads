export interface GetCart {
    data: Data;
}

export interface Data {
    cart: Cart;
}

export interface Cart {
    createdAt:     Date;
    updatedAt:     Date;
    lines:         Lines;
    estimatedCost: EstimatedCost;
}

export interface EstimatedCost {
    totalAmount: TotalAmount;
}

export interface TotalAmount {
    amount:       string;
    currencyCode: string;
}

export interface Lines {
    edges: Edge[];
}

export interface Edge {
    node: Node;
}

export interface Node {
    id:          string;
    quantity:    number;
    merchandise: Merchandise;
}

export interface Merchandise {
    product: Product;
}

export interface Product {
    title:         string;
    handle:        string;
    featuredImage: FeaturedImage;
    priceRange:    PriceRange;
}

export interface FeaturedImage {
    url: string;
}

export interface PriceRange {
    minVariantPrice: TotalAmount;
}
