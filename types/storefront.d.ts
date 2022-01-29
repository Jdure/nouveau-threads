export interface Storefront {
    data: Data;
}

export interface Data {
    products: Products;
}

export interface Products {
    edges: Edge[];
}

export interface Edge {
    node: Node;
}

export interface Node {
    id:            string;
    handle:        string;
    title:         string;
    featuredImage: FeaturedImage;
    priceRange:    PriceRange;
}

export interface FeaturedImage {
    url:     string;
    altText: null;
}

export interface PriceRange {
    minVariantPrice: MinVariantPrice;
}

export interface MinVariantPrice {
    amount: string;
}
