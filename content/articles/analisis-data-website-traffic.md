Halo semuanya, salam kenal, saya Wira. Saat tulisan ini dibuat, saya sedang belajar dasar-dasar data analyst di sebuah platform pelatihan bernama Nusacodes, dalam program "Bootcamp Data Analyst". Di bootcamp ini kami diajari beberapa topik, di antaranya: fundamental data analisis, spreadsheet, Python, SQL, Looker Studio, dan Tableau.

Sebagai bagian dari final project bootcamp tersebut, saya mencoba melakukan analisa data sebuah dataset website traffic yang telah disediakan oleh mentor kami, yang bisa di akses <a href="https://drive.google.com/file/d/1ymsf9izSPu9D1vua77dUkevAoYL7jFVD/view?usp=sharing" target="_blank" rel="noopener noreferrer">disini</a>

### Latar Belakang

Website traffic adalah indikator utama untuk mengukur seberapa populer atau sukses sebuah situs web. Website traffic mengacu pada jumlah data yang dikirim dan diterima oleh pengunjung dari sebuah situs web.

Dari data tersebut kita bisa memanfaatkannya untuk mendapat insight yang berharga dalam menentukan strategi apa yang bisa dipakai untuk mengoptimalkan situs web, sesuai dengan tujuan atau sasaran yang ingin dicapai dari dataset tersebut.

### Tujuan

Dari latar belakang di atas serta data yang diperoleh, terlihat bahwa Sumber Lalu Lintas (Traffic Sources) menjadi pokok utama dari analisis data kali ini. Tujuan analisis dijabarkan lewat beberapa pertanyaan berikut:

- Page Views (Tampilan Halaman): sumber lalu lintas mana yang memiliki page views tertinggi & terendah?
- Session Duration (Durasi Sesi): sumber lalu lintas mana yang memiliki session duration tertinggi & terendah?
- Bounce Rate (Tingkat Pentalan): sumber lalu lintas mana yang memiliki bounce rate tertinggi & terendah?
- Time on Page (Waktu di Halaman): sumber lalu lintas mana yang memiliki page views & time on page tertinggi & terendah?
- Previous Visit (Kunjungan Sebelumnya): sumber mana yang memiliki previous visit tertinggi & terendah?
- Conversion Rate (Tingkat Konversi): sumber lalu lintas mana yang paling efektif dalam mendorong konversi?

Dari pertanyaan-pertanyaan tersebut, kita bisa menyimpulkan sumber lalu lintas mana yang paling efektif membawa pengunjung ke situs kita.

### Identifikasi Data

Setelah menentukan tujuan analisa, langkah berikutnya adalah membuka dataset berekstensi .csv menggunakan Google Spreadsheet. 

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*h6PJOhCAWMyTtkeeol-Trg.gif" alt="Demo Aplikasi" style="max-width: 700px; width: 100%; height: auto;">

Dataset ini terdiri dari 7 kolom dengan deskripsi sebagai berikut:

- **Page Views** — jumlah total kali sebuah halaman dilihat oleh pengunjung, termasuk setiap kali halaman dimuat ulang (refresh).
- **Session Duration** — waktu rata-rata yang dihabiskan pengguna dalam satu sesi di situs web.
- **Bounce Rate** — persentase pengunjung yang meninggalkan situs setelah melihat hanya satu halaman.
- **Traffic Source** — asal pengunjung situs, seperti mesin pencari (organic search), tautan situs lain (referral), media sosial, atau kunjungan langsung (direct).
- **Time on Page** — waktu rata-rata yang dihabiskan pengguna pada satu halaman tertentu.
- **Previous Visits** — data kunjungan sebelumnya oleh pengguna yang sama.
- **Conversion Rate** — persentase pengunjung yang melakukan tindakan yang diinginkan, seperti pembelian atau pengisian formulir.

### Cleaning Data

Proses membersihkan data dilakukan dengan mengecek: 
1. Duplikasi data
2. Spasi yang tidak diperlukan
3. Data yang kurang relevan
4. Standarisasi format data.

**Pengecekan Duplikasi data**, bisa menggunakan fitur remove duplikat seperti pada gambar dibawah:

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*H7U_244rf3RJk7nml-pkVQ.gif" alt="Demo Aplikasi" style="max-width: 700px; width: 100%; height: auto;">

Untuk dataset kali ini, tidak menemukan data yang duplikat, sehingga tidak ada yang perlu di hapus. 

**Pengecekan spasi yang tidak diperlukan**, bisa menggunakan fitur trim whitespace seperti pada gambar dibawah:

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*H7U_244rf3RJk7nml-pkVQ.gif" alt="Demo Aplikasi" style="max-width: 700px; width: 100%; height: auto;">

Dataset kali ini juga tidak menemukan data yang memiliki spasi yang tidak berguna, sehingga tidak ada yang perlu di hapus.

**Pengecekan data yang kurang relevan**, kita gunakan filter untuk mengecek terlebih dahulu isi data, pada setiap kolomnya seperti pada gambar di bawah:

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*auKiyAH3AISGCf6kaWsnEg.gif" alt="Demo Aplikasi" style="max-width: 700px; width: 100%; height: auto;">

Setelah mengecek satu persatu isi data setiap kolomnya menggunakan filter, tidak ditemukan data yang tidak relevan sehingga data bisa kita proses ke tahap selanjutnya.

**Standarisasi format data**, dilakukan untuk menyeragamkan data menjadi bentuk yang konsisten agar mudah untuk dianalisis.

Karena data yang kita punya dominan angka, maka untuk angka kita standarisasi dengan batasan angka dibelakang koma, tidak lebih dari 2 digit angka seperti pada gambar dibawah:

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*QwXspDwokzOXU_OPDdUJyQ.gif" alt="Demo Aplikasi" style="max-width: 700px; width: 100%; height: auto;">

Setelah data kita standarisasi, maka kita bisa mulai mengalisis data tersebut.

### Analisa Data

Pada tahap ini, digunakan pivot table untuk menemukan nilai tertinggi dan terendah dari traffic source, dengan membandingkan traffic source terhadap semua variabel metrik: Page Views, Session Duration, Bounce Rate, Time on Page, Previous Visits, dan Conversion Rate.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*V2eLOha5y9ddQhhpiKRrvQ.gif" alt="Demo Aplikasi" style="max-width: 700px; width: 100%; height: auto;">

Setelah summary data terbentuk, nilai terbesar dan terkecil dari masing-masing metrik ditemukan dengan bantuan conditional formatting (color scale) untuk mengurutkan nilai terendah ke tertinggi.

<p>
<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*YCS27IqUSh7B2xxxi6Zw7g.gif" alt="Demo Aplikasi" style="max-width: 700px; width: 100%; height: auto;">
<p/>

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*70FTtWexg7u1Dem1uVIsGQ.png" alt="Demo Aplikasi" style="max-width: 700px; width: 100%; height: auto;">

Dari tabel yang dihasilkan, terlihat bahwa **Traffic Source "Organic" adalah sumber trafik tertinggi**, sedangkan Traffic Source "Direct" adalah sumber trafik terendah. Visualisasi dalam bentuk chart juga menegaskan bahwa "Organic" adalah penyumbang terbesar untuk visit, views, dan conversion rate dibanding sumber trafik lainnya.

### Visualisasi Data

Untuk memvisualisasikan data dengan lebih baik, data juga diolah menggunakan <a href="https://lookerstudio.google.com/reporting/7c4a473f-1dda-48c4-bc59-508df7db0bd5" target="_blank" rel="noopener noreferrer">Looker Studi</a> agar lebih mudah dibaca dan dieksplorasi secara interaktif.

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*2soZmAJcZ2_v5PNItPXGvA.gif" alt="Demo Aplikasi" style="max-width: 700px; width: 100%; height: auto;">

### Kesimpulan

Dari data yang telah diolah dan dianalisa, dapat disimpulkan bahwa sumber trafik organik merupakan penyumbang terbesar dari website traffic ini, sehingga performanya perlu dijaga. Sementara itu, sumber trafik terendah yaitu direct perlu menjadi sorotan, dengan membuat strategi pemasaran yang relevan untuk meningkatkan sumber trafik tersebut.

Demikian hasil analisa data yang telah didemonstrasikan, lebih dan kurangnya mohon dimaafkan. Terima kasih.
