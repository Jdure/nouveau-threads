export interface ProductDetail {
    data: ProductData;
}

export interface ProductData {
    product: Product;
}

export interface Product {
    id:            string;
    title:         string;
    description:   string;
    priceRange:    PriceRange;
    featuredImage: FeaturedProductImage;
}

export interface FeaturedProductImage {
    url:     string;
    altText: null;
}

export interface ProductPriceRange {
    minVariantPrice: MinVariantPrice;
}

export interface MinVariantPrice {
    amount: string;
}
