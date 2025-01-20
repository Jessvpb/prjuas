import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Produk } from "../models/produk.model";
import { ProdukService } from "../services/produk.service";
import { Brand } from "../models/brand.model";
import { Kategori } from "../models/kategori.model";

@Component({
  selector: "app-produk",
  standalone: false,
  templateUrl: "./produk.component.html",
  styleUrl: "./produk.component.css",
})
export class ProdukComponent {
  produkList: Produk[] = [];
  brandList: Brand[] = [];
  kategoriList: Kategori[] = [];
  private getProdukSub: Subscription = new Subscription();
  private messageSub: Subscription = new Subscription();
  messageExecute: string = "";

  mode: string = "Simpan";
  lastInsertedKdProduct: string | null = null;

  //pagination
  p: number = 1;

  constructor(public produkService: ProdukService) {}

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
    this.getProdukSub = this.produkService
      .getProdukListener()
      .subscribe((value: Produk[]) => {
        this.produkList = value;
      });

    this.messageSub = this.produkService
      .executeProdukListener()
      .subscribe((value) => {
        this.messageExecute = value;
      });

    this.produkService.getProduk();
  }

  getBrands(): void {
    this.produkService.getBrands().subscribe((data) => {
      console.log("Brand List: ", data);
      this.brandList = data;
    });
  }

  getCategories(): void {
    this.produkService.getCategories().subscribe((data) => {
      console.log("Kategori List: ", data);
      this.kategoriList = data;
    });
  }

  ngOnDestroy(): void {
    this.getProdukSub.unsubscribe();
    this.messageSub.unsubscribe();
  }

  tampilData(produk: Produk, form: NgForm) {
    form.setValue({
      kdProduct: produk.kdProduct,
      kdBrand: produk.kdBrand,
      kdCategory: produk.kdCategory,
      namaP: produk.namaP,
      deskripsi: produk.deskripsi,
      harga: produk.harga,
      stok: produk.stok,
    });

    this.mode = "Perbaiki";
  }

  onReset() {
    this.mode = "Simpan";
    this.messageExecute = "";
  }

  simpanProduk(form: NgForm) {
    if (this.mode.toUpperCase() === "SIMPAN") {
      this.produkService.addProduk(
        form.value.kdBrand,
        form.value.kdCategory,
        form.value.namaP,
        form.value.deskripsi,
        form.value.harga,
        form.value.stok
      );
    } else {
      this.produkService.updateProduk(
        form.value.kdProduct,
        form.value.kdBrand,
        form.value.kdCategory,
        form.value.namaP,
        form.value.deskripsi,
        form.value.harga,
        form.value.stok
      );
    }

    form.resetForm();
    this.mode = "Simpan";
  }

  hapusProduk(produk: Produk) {
    if (confirm("Hapus Data produk : " + produk.kdProduct)) {
      this.produkService.deleteProduk(produk);
    }
  }
}
