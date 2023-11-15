export interface DatoSection {
  id: string;
  __typename: string;
  title: string | null;
}

export type DatoImage = {
  blurUpThumb: string;
  responsiveImage: {
    alt: string;
    src: string;
    srcSet: string;
  };
};

export type Cart = {
  id: string;
  items: CartItem[];
  cart_total: number;
};

export type CartItem = {
  title: string;
  sku: string;
  quantity: number;
  id: string;
  price: number;
  images: DatoImage[];
};
