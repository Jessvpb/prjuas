import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { ResponseAPI } from "../interfaces/response-api";
import { Produk } from "../models/produk.model";

@Injectable({
  providedIn: "root",
})
export class ProdukService {
  private url: string = environment.api + "products/";

  private subjectProduk = new Subject<Produk[]>();
  private subjectExecute = new Subject<string>();

  constructor(private http: HttpClient) {}

  getBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/brands`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/categories`);
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

  addProduk(produk: Omit<Produk, "kdProduct">, kdCategory: any, namaP: any, deskripsi: any, harga: any, stok: any, image_url: any) {
    this.http
      .post<{ message: string; kdProduct: string }>(this.url, produk)
      .subscribe((response) => {
        this.getProduk();
        this.subjectExecute.next(response.message);
      });
    // this.http.post<ResponseAPI>(this.url, data).subscribe((response) => {
    //   this.getProduk();
    //   this.subjectExecute.next(response.message);
    //   //console.log(response.message)
    // });
  }

  deleteProduk(produk: Produk) {
    this.http
      .delete<{ message: string }>(this.url + produk.kdProduct)
      .subscribe((response) => {
        this.getProduk();
        this.subjectExecute.next(response.message);
      });
  }

  updateProduk(produk: Produk, kdCategory: any, namaP: any, deskripsi: any, harga: any, stok: any, image_url: any) {
    this.http
      .put<{ message: string }>(this.url + produk.kdProduct, produk)
      .subscribe((response) => {
        this.getProduk();
        this.subjectExecute.next(response.message);
      });
  }
}
