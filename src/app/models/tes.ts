//component.ts
    barangList: Barang[] = []; // Daftar barang
  transaksiList: Transaksi[] = []; // Daftar transaksi barang masuk
  filteredBarangMasukList: Transaksi[] = []; // Barang yang sudah difilter berdasarkan pencarian
  selectedBarangId: string = ''; // ID barang yang dipilih
  jumlah: number = 0; // Jumlah barang yang masuk
  keterangan: string = ''; // Keterangan barang masuk
  searchQuery: string = ''; // Query pencarian untuk barang masuk
  p: number = 1; // Halaman untuk pagination (default 1)

tampilkanFormTambah(): void {
    // Menampilkan modal SweetAlert2 dengan form input pencarian barang
    Swal.fire({
      title: 'Tambah Barang Masuk',
      html: `
        <div class="form-group mb-3">
          <!-- Select untuk memilih barang -->
          <select id="barangSelect" class="form-control" style="margin-top: 10px;">
            <option value="">-- Pilih Barang --</option>
            ${this.barangList.map(barang => `
              <option value="${barang._id}">${barang.nama} - ${barang.merk}</option>
            `).join('')}
          </select>
        </div>
        <div class="form-group mb-3">
          <input type="number" id="jumlahInput" class="form-control" min="1" placeholder="Jumlah barang">
        </div>
        <div class="form-group">
          <input type="text" id="keteranganInput" class="form-control" placeholder="Masukkan keterangan">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Tambah',
      cancelButtonText: 'Batal',
      preConfirm: () => {
        const selectedBarangId = (document.getElementById('barangSelect') as HTMLSelectElement).value;
        const jumlah = (document.getElementById('jumlahInput') as HTMLInputElement).value;
        const keterangan = (document.getElementById('keteranganInput') as HTMLInputElement).value;

        if (!selectedBarangId || !jumlah || parseInt(jumlah) <= 0) {
          Swal.showValidationMessage('Harap pilih barang dan masukkan jumlah yang valid!');
          return false; // Tidak melanjutkan proses jika data tidak valid
        }

        return { selectedBarangId, jumlah: parseInt(jumlah), keterangan };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { selectedBarangId, jumlah, keterangan } = result.value;
        // Menambahkan barang masuk melalui transaksiService
        this.transaksiService.tambahBarangMasuk(selectedBarangId, jumlah, keterangan).subscribe(
          (response) => {
            Swal.fire({
              title: 'Berhasil!',
              text: 'Barang masuk berhasil ditambahkan.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              // Refresh halaman untuk memuat data baru
              window.location.reload();
            });
          },
          (error) => {
            Swal.fire('Gagal!', 'Terjadi kesalahan saat menambahkan barang masuk.', 'error');
            console.error(error);
          }
        );
      }
    });
  }

//