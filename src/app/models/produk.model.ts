import { Brand } from './brand.model';
import { Kategori } from './kategori.model';

export interface Produk {
  kdProduct: string;
  kdBrand: string | Brand;
  kdCategory: string | Kategori;
  namaP: string;
  deskripsi: string;
  harga: number;
  stok: number;
  image_url: string;
  creator: string;
}
