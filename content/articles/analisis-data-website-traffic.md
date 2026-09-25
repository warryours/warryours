Halo semuanya, salam kenal, saya Wira. Saat tulisan ini dibuat, saya sedang belajar dasar-dasar data analyst di sebuah platform pelatihan bernama Nusacodes, dalam program "Bootcamp Data Analyst". Di bootcamp ini kami diajari beberapa topik, di antaranya: fundamental data analisis, spreadsheet, Python, SQL, Looker Studio, dan Tableau.

Sebagai bagian dari final project bootcamp tersebut, saya mencoba melakukan analisa data sebuah dataset website traffic yang telah disediakan oleh mentor kami.

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

Setelah menentukan tujuan analisa, langkah berikutnya adalah membuka dataset berekstensi .csv menggunakan Google Spreadsheet. Dataset ini terdiri dari 7 kolom dengan deskripsi sebagai berikut:

- **Page Views** — jumlah total kali sebuah halaman dilihat oleh pengunjung, termasuk setiap kali halaman dimuat ulang (refresh).
- **Session Duration** — waktu rata-rata yang dihabiskan pengguna dalam satu sesi di situs web.
- **Bounce Rate** — persentase pengunjung yang meninggalkan situs setelah melihat hanya satu halaman.
- **Traffic Source** — asal pengunjung situs, seperti mesin pencari (organic search), tautan situs lain (referral), media sosial, atau kunjungan langsung (direct).
- **Time on Page** — waktu rata-rata yang dihabiskan pengguna pada satu halaman tertentu.
- **Previous Visits** — data kunjungan sebelumnya oleh pengguna yang sama.
- **Conversion Rate** — persentase pengunjung yang melakukan tindakan yang diinginkan, seperti pembelian atau pengisian formulir.

### Cleaning Data

Proses membersihkan data dilakukan dengan mengecek: duplikasi data, spasi yang tidak diperlukan, data yang kurang relevan, dan standarisasi format data.

Untuk dataset ini, pengecekan menggunakan fitur remove duplicate tidak menemukan data duplikat. Pengecekan trim whitespace juga tidak menemukan spasi yang tidak berguna. Pengecekan lewat filter pada setiap kolom juga tidak menemukan data yang tidak relevan.

Langkah terakhir adalah standarisasi format data. Karena data yang dimiliki dominan berupa angka, standarisasi dilakukan dengan membatasi angka di belakang koma tidak lebih dari 2 digit, agar data konsisten dan mudah dianalisis.

### Analisa Data

Pada tahap ini, digunakan pivot table untuk menemukan nilai tertinggi dan terendah dari traffic source, dengan membandingkan traffic source terhadap semua variabel metrik: Page Views, Session Duration, Bounce Rate, Time on Page, Previous Visits, dan Conversion Rate.

Setelah summary data terbentuk, nilai terbesar dan terkecil dari masing-masing metrik ditemukan dengan bantuan conditional formatting (color scale) untuk mengurutkan nilai terendah ke tertinggi.

Dari tabel yang dihasilkan, terlihat bahwa Traffic Source "Organic" adalah sumber trafik tertinggi, sedangkan Traffic Source "Direct" adalah sumber trafik terendah. Visualisasi dalam bentuk chart juga menegaskan bahwa "Organic" adalah penyumbang terbesar untuk visit, views, dan conversion rate dibanding sumber trafik lainnya.

### Visualisasi Data

Untuk memvisualisasikan data dengan lebih baik, data juga diolah menggunakan Looker Studio agar lebih mudah dibaca dan dieksplorasi secara interaktif.

### Kesimpulan

Dari data yang telah diolah dan dianalisa, dapat disimpulkan bahwa sumber trafik organik merupakan penyumbang terbesar dari website traffic ini, sehingga performanya perlu dijaga. Sementara itu, sumber trafik terendah yaitu direct perlu menjadi sorotan, dengan membuat strategi pemasaran yang relevan untuk meningkatkan sumber trafik tersebut.

Demikian hasil analisa data yang telah didemonstrasikan, lebih dan kurangnya mohon dimaafkan. Terima kasih.
