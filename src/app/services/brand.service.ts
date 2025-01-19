import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Brand } from "../models/brand.model";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { ResponseAPI } from "../interfaces/response-api";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  private url: string = environment.api + "brands/";

  private subjectBrand = new Subject<Brand[]>();
  private subjectExecute = new Subject<string>();

  constructor(private http: HttpClient) {}

  executeBrandListener() {
    return this.subjectExecute.asObservable();
  }

  getBrandListener() {
    return this.subjectBrand.asObservable();
  }

  getBrand() {
    this.http
      .get<{ message: string; brands: Brand[] }>(this.url)
      .subscribe((value) => {
        this.subjectBrand.next(value.brands);
      });
  }

  addBrand(kdBrand: string, namaB: string) {
    const brand: Brand = {
      kdBrand: kdBrand,
      namaB: namaB,
    };
    this.http
      .post<{ message: string }>(this.url, brand)
      .subscribe((response) => {
        this.getBrand();
        this.subjectExecute.next(response.message);
      });
    this.http.post<ResponseAPI>(this.url, brand).subscribe((response) => {
      this.getBrand();
      this.subjectExecute.next(response.message);
      //console.log(response.message)
    });
  }

  deleteBrand(brand: Brand) {
    this.http
      .delete<{ message: string }>(this.url + brand.kdBrand)
      .subscribe((response) => {
        this.getBrand();
        this.subjectExecute.next(response.message);
      });
  }

  updateBrand(kdBrand: string, namaB: string) {
    const brand: Brand = {
      kdBrand: kdBrand,
      namaB: namaB,
    };
    this.http
      .put<{ message: string }>(this.url + kdBrand, brand)
      .subscribe((response) => {
        this.getBrand();
        this.subjectExecute.next(response.message);
      });
  }
}
