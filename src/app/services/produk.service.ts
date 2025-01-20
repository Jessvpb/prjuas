import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { ResponseAPI } from "../interfaces/response-api";
import { Produk } from "../models/produk.model";
import { Brand } from "../models/brand.model";
import { Kategori } from "../models/kategori.model";

@Injectable({
  providedIn: "root",
})
export class ProdukService {
  private url: string = environment.api + "products/";

  private subjectProduk = new Subject<Produk[]>();
  private subjectExecute = new Subject<string>();

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http
      .get<{ message: string; brands: Brand[] }>(environment.api + "brands/")
      .pipe(
        map((response) => response.brands), // Ambil hanya array categories
        catchError((error) => {
          console.error("Error fetching brands:", error);
          return of([]);
        })
      );
  }

  getCategories(): Observable<Kategori[]> {
    return this.http
      .get<{ message: string; categories: Kategori[] }>(
        environment.api + "categories/"
      )
      .pipe(
        map((response) => response.categories), // Ambil hanya array categories
        catchError((error) => {
          console.error("Error fetching categories:", error);
          return of([]);
        })
      );
  }

  executeProdukListener() {
    return this.subjectExecute.asObservable();
  }

  getProdukListener() {
    return this.subjectProduk.asObservable();
  }

  getProduk() {
    this.http
      .get<{ message: string; products: Produk[] }>(this.url)
      .subscribe((value) => {
        this.subjectProduk.next(value.products);
      });
  }

  addProduk(
    kdCategory: string,
    kdBrand: string,
    namaP: string,
    deskripsi: string,
    harga: number,
    stok: number
  ) {
    const produk: Omit<Produk, "kdProduct"> = {
      kdCategory: kdCategory,
      kdBrand: kdBrand,
      namaP: namaP,
      deskripsi: deskripsi,
      harga: harga,
      stok: stok,
    };
    this.http
      .post<{ message: string; kdProduct: string }>(this.url, produk)
      .subscribe((response) => {
        console.log("Produk berhasil ditambahkan, kdProduct:", response.kdProduct);
        this.getProduk();
        this.subjectExecute.next(response.message);
      });
    this.http.post<ResponseAPI>(this.url, produk).subscribe((response) => {
      this.getProduk();
      this.subjectExecute.next(response.message);
      //console.log(response.message)
    });
  }

  deleteProduk(produk: Produk) {
    this.http
      .delete<{ message: string }>(this.url + produk.kdProduct)
      .subscribe((response) => {
        this.getProduk();
        this.subjectExecute.next(response.message);
      });
  }

  updateProduk(
    kdProduct: string,
    kdBrand: string,
    kdCategory: string,
    namaP: string,
    deskripsi: string,
    harga: number,
    stok: number
  ) {
    const produk: Produk = {
      kdProduct: kdProduct,
      kdBrand: kdBrand,
      kdCategory: kdCategory,
      namaP: namaP,
      deskripsi: deskripsi,
      harga: harga,
      stok: stok,
    };
    this.http
      .put<{ message: string }>(this.url + kdProduct, produk)
      .subscribe((response) => {
        this.getProduk();
        this.subjectExecute.next(response.message);
      });
  }
}
