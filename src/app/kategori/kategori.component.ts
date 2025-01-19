import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KategoriService } from '../services/kategori.service';
import { Kategori } from '../models/kategori.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kategori',
  standalone: false,
  templateUrl: './kategori.component.html',
  styleUrl: './kategori.component.css',
})
export class KategoriComponent implements OnInit, OnDestroy {
  kategoriList: Kategori[] = [];
  private getKategoriSub: Subscription = new Subscription();
  private messageSub: Subscription = new Subscription();
  messageExecute: string = '';

  mode: string = 'Simpan';

  //pagination
  p: number = 1;

  constructor(public kategoriService: KategoriService) {}

  ngOnInit(): void {
    this.getKategoriSub = this.kategoriService
      .getKategoriListener()
      .subscribe((value: Kategori[]) => {
        this.kategoriList = value;
      });

    this.messageSub = this.kategoriService
      .executeKategoriListener()
      .subscribe((value) => {
        this.messageExecute = value;
      });

    this.kategoriService.getKategori();
  }

  ngOnDestroy(): void {
    this.getKategoriSub.unsubscribe();
    this.messageSub.unsubscribe();
  }

  tampilData(kategori: Kategori, form: NgForm) {
    form.setValue({
      kdCategory: kategori.kdCategory,
      namaC: kategori.namaC,
    });

    this.mode = 'Perbaiki';
  }

  onReset() {
    this.mode = 'Simpan';
    this.messageExecute = '';
  }

  simpanKategori(form: NgForm) {
    if (this.mode.toUpperCase() === 'SIMPAN') {
      this.kategoriService.addKategori(form.value.kdCategory, form.value.namaC);
    } else {
      this.kategoriService.updateKategori(
        form.value.kdCategory,
        form.value.namaC
      );
    }

    form.resetForm();
    this.mode = 'Simpan';
  }

  hapusKategori(kategori: Kategori) {
    if (confirm('Hapus Data kategori : ' + kategori.kdCategory)) {
      this.kategoriService.deleteKategori(kategori);
    }
  }
}
