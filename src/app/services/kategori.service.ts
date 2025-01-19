import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Kategori } from "../models/kategori.model";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { ResponseAPI } from "../interfaces/response-api";

@Injectable({
  providedIn: "root",
})
export class KategoriService {
  private url: string = environment.api + "categories/";

  private subjectKategori = new Subject<Kategori[]>();
  private subjectExecute = new Subject<string>();

  constructor(private http: HttpClient) {}

  executeKategoriListener() {
    return this.subjectExecute.asObservable();
  }

  getKategoriListener() {
    return this.subjectKategori.asObservable();
  }

  getKategori() {
    this.http
      .get<{ message: string; categories: Kategori[] }>(this.url)
      .subscribe((value) => {
        this.subjectKategori.next(value.categories);
      });
  }

  addKategori(kdCategory: string, namaC: string) {
    const kategori: Kategori = {
      kdCategory: kdCategory,
      namaC: namaC,
    };
    this.http
      .post<{ message: string }>(this.url, kategori)
      .subscribe((response) => {
        this.getKategori();
        this.subjectExecute.next(response.message);
      });
    this.http.post<ResponseAPI>(this.url, kategori).subscribe((response) => {
      this.getKategori();
      this.subjectExecute.next(response.message);
      //console.log(response.message)
    });
  }

  deleteKategori(kategori: Kategori) {
    this.http
      .delete<{ message: string }>(this.url + kategori.kdCategory)
      .subscribe((response) => {
        this.getKategori();
        this.subjectExecute.next(response.message);
      });
  }

  updateKategori(kdCategory: string, namaC: string) {
    const kategori: Kategori = {
      kdCategory: kdCategory,
      namaC: namaC,
    };
    this.http
      .put<{ message: string }>(this.url + kdCategory, kategori)
      .subscribe((response) => {
        this.getKategori();
        this.subjectExecute.next(response.message);
      });
  }
}
