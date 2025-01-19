import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrandService } from '../services/brand.service';
import { Brand } from '../models/brand.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand',
  standalone: false,
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent implements OnInit, OnDestroy {
  brandList: Brand[] = [];
  private getBrandSub: Subscription = new Subscription();
  private messageSub: Subscription = new Subscription();
  messageExecute: string = '';

  mode: string = 'Simpan';

  //pagination
  p: number = 1;

  constructor(public brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrandSub = this.brandService
      .getBrandListener()
      .subscribe((value: Brand[]) => {
        this.brandList = value;
      });

    this.messageSub = this.brandService
      .executeBrandListener()
      .subscribe((value) => {
        this.messageExecute = value;
      });

    this.brandService.getBrand();
  }

  ngOnDestroy(): void {
    this.getBrandSub.unsubscribe();
    this.messageSub.unsubscribe();
  }

  tampilData(brand: Brand, form: NgForm) {
    form.setValue({
      kdBrand: brand.kdBrand,
      namaB: brand.namaB,
    });

    this.mode = 'Perbaiki';
  }

  onReset() {
    this.mode = 'Simpan';
    this.messageExecute = '';
  }

  simpanBrand(form: NgForm) {
    if (this.mode.toUpperCase() === 'SIMPAN') {
      this.brandService.addBrand(form.value.kdBrand, form.value.namaB);
    } else {
      this.brandService.updateBrand(form.value.kdBrand, form.value.namaB);
    }

    form.resetForm();
    this.mode = 'Simpan';
  }

  hapusBrand(brand: Brand) {
    if (confirm('Hapus Data brand : ' + brand.kdBrand)) {
      this.brandService.deleteBrand(brand);
    }
  }
}
