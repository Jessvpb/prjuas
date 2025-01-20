import { Component } from "@angular/core";
import { ProdukService } from "../services/produk.service";

@Component({
  selector: "app-dashboard",
  standalone: false,
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
  jumlahProduk: number = 0;
  jumlahKategori: number = 0;
  jumlahBrand: number = 0;

  constructor(private produkService: ProdukService) {}

  ngOnInit(): void {
    // Ambil jumlah produk, kategori, dan brand saat halaman dashboard dimuat
    this.produkService.getProdukCount().subscribe((count) => {
      this.jumlahProduk = count;
    });
    this.produkService.getCategoriesCount().subscribe((count) => {
      this.jumlahKategori = count;
    });
    this.produkService.getBrandsCount().subscribe((count) => {
      this.jumlahBrand = count;
    });
  }
}
