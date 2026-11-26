export type SeedArticle = {
  slug: string;
  title: string;
  excerpt: string;
  cover_url: string;
  cover_alt: string;
  daysAgo: number;
  body: string;
};

export const seedArticles: readonly SeedArticle[] = [
  {
    slug: "apa-itu-lumpia-semarang",
    title: "Apa Itu Lumpia Semarang dan Apa Isinya?",
    excerpt: "Kenalan dengan lumpia khas Semarang: isi rebung, telur, dan udang yang dibungkus kulit tipis lalu digoreng renyah.",
    cover_url: "/images/hero/piring-lumpia.webp",
    cover_alt: "Sepiring lumpia goreng khas Semarang",
    daysAgo: 12,
    body: `<p>Lumpia adalah jajanan paling terkenal dari Semarang. Bentuknya ramping, kulitnya tipis, dan setelah digoreng terasa renyah di luar tapi gurih di dalam. Banyak orang yang berkunjung ke Semarang merasa belum lengkap kalau pulang tanpa membawa lumpia.</p>
<p>Lumpia Semarang lahir dari perpaduan dua budaya, yaitu Tionghoa dan Jawa. Dari sanalah lahir cita rasa yang berbeda dari lumpia di daerah lain: isian gurih sedikit manis yang dibungkus kulit tipis, lalu disajikan bersama saus dan cabai rawit.</p>
<h2>Isi lumpia Semarang</h2>
<p>Isi utamanya adalah rebung, telur, dan udang. Rebung memberi rasa gurih manis yang khas dan sedikit tekstur renyah, sedangkan telur dan udang membuat isiannya terasa penuh dan wangi.</p>
<ul><li>Rebung, tunas bambu muda yang menjadi ciri khas lumpia Semarang</li><li>Telur, yang membuat isian lembut dan gurih</li><li>Udang, yang memberi aroma dan rasa laut yang manis</li></ul>
<h2>Digoreng atau basah?</h2>
<p>Lumpia Semarang biasa dinikmati dalam dua bentuk. Lumpia goreng dimakan hangat dengan kulit yang kriuk, sedangkan lumpia basah disajikan tanpa digoreng. Mbak Cun menyajikan lumpia yang digoreng renyah, dalam bentuk frozen untuk digoreng sendiri di rumah atau siap santap.</p>
<h2>Lumpia Mbak Cun</h2>
<p>Lumpia Mbak Cun dibuat rumahan sejak 1998, tanpa pengawet dan MSG. Ukurannya mini, panjang sekitar 10 cm, jadi mudah dinikmati sekali gigit. Setiap pembelian mendapat cabai rawit gratis untuk menemani lumpianya.</p>
<blockquote>Lumpia mini isi rebung, telur, dan udang: cocok untuk camilan sore maupun oleh-oleh.</blockquote>
<h2>Cara menikmati</h2>
<p>Nikmati selagi hangat dengan cabai rawit di sampingnya. Rasa gurih lumpia berpadu pas dengan pedas segar cabai, dan satu porsi biasanya habis lebih cepat dari perkiraan.</p>
<p>Mau mencoba? Lihat pilihan paket di halaman menu, lalu pesan lewat WhatsApp.</p>`,
  },
  {
    slug: "cara-menggoreng-lumpia-frozen",
    title: "Cara Menggoreng Lumpia Frozen Supaya Renyah",
    excerpt: "Lumpia frozen siap goreng di rumah dalam sekitar 7 menit. Ini langkah singkat agar hasilnya kriuk dan matang merata.",
    cover_url: "/images/menu/lumpia-frozen.webp",
    cover_alt: "Lumpia frozen siap digoreng",
    daysAgo: 9,
    body: `<p>Lumpia frozen Mbak Cun dibuat supaya praktis: tinggal goreng di rumah, sekitar 7 menit sudah siap disantap. Tidak perlu repot menyiapkan isian atau membungkus kulit, karena semuanya sudah jadi. Tugas Anda hanya menggoreng.</p>
<p>Meski terlihat mudah, ada beberapa hal kecil yang membuat hasil gorengan jauh lebih renyah. Berikut langkah dan tips yang bisa langsung dicoba.</p>
<h2>Yang perlu disiapkan</h2>
<ul><li>Lumpia frozen, langsung dari freezer</li><li>Minyak goreng dalam jumlah cukup banyak, agar lumpia terendam sebagian</li><li>Wajan dan sutil atau penjepit</li><li>Tisu dapur atau saringan untuk meniriskan minyak</li></ul>
<h2>Langkah menggoreng</h2>
<ol><li>Panaskan minyak dengan api sedang hingga panas merata.</li><li>Masukkan lumpia dalam kondisi beku. Jangan terlalu penuh dalam satu wajan agar suhu minyak tidak turun.</li><li>Goreng sambil sesekali dibalik hingga warnanya kuning keemasan, sekitar 7 menit.</li><li>Angkat dan tiriskan agar minyaknya turun.</li><li>Sajikan selagi hangat bersama cabai rawit.</li></ol>
<h2>Tips agar lebih renyah</h2>
<ul><li>Jangan mencairkan lumpia dulu. Kulit yang sudah lembap akan cepat menyerap minyak dan jadi kurang renyah.</li><li>Gunakan api sedang. Api terlalu besar membuat kulit cepat gosong sementara bagian dalam belum matang.</li><li>Goreng sedikit demi sedikit, jangan memasukkan semuanya sekaligus.</li><li>Tiriskan di atas tisu atau saringan, bukan ditumpuk di piring, supaya kulitnya tetap kriuk.</li></ul>
<h2>Mau digoreng sebanyak apa?</h2>
<p>Goreng secukupnya saja, sesuai yang akan dimakan. Sisanya biarkan tetap di freezer. Lumpia yang baru digoreng selalu paling enak dibanding yang sudah lama didiamkan.</p>
<p>Tidak sempat menggoreng? Mbak Cun juga menyediakan lumpia goreng siap santap. Pilih yang sesuai lewat halaman menu.</p>`,
  },
  {
    slug: "menyimpan-lumpia-frozen",
    title: "Menyimpan Lumpia Frozen: Tahan Sampai 2 Bulan",
    excerpt: "Simpan lumpia frozen di freezer agar tahan hingga 2 bulan, dan goreng hanya sebanyak yang akan dimakan.",
    cover_url: "/images/katalog/mentah.webp",
    cover_alt: "Lumpia mentah siap disimpan di freezer",
    daysAgo: 6,
    body: `<p>Salah satu keunggulan lumpia frozen adalah bisa disimpan lama. Selama disimpan di freezer, lumpia Mbak Cun tahan sampai 2 bulan. Artinya Anda bisa membeli sekali untuk beberapa kali santap, tanpa khawatir cepat rusak.</p>
<p>Supaya rasa dan teksturnya tetap terjaga sampai hari terakhir, ada beberapa kebiasaan sederhana yang sebaiknya diterapkan sejak lumpia diterima.</p>
<h2>Cara menyimpan</h2>
<ul><li>Langsung masukkan ke freezer begitu lumpia diterima.</li><li>Letakkan di bagian yang tidak sering terkena udara luar, jauh dari pintu freezer.</li><li>Ambil secukupnya saja saat ingin menggoreng.</li><li>Rapatkan kembali kemasan setelah dibuka agar lumpia yang tersisa tetap terjaga.</li></ul>
<h2>Hindari ini</h2>
<ul><li>Mencairkan lumpia lalu membekukannya lagi. Perubahan suhu berulang membuat kulit lembap dan mudah sobek.</li><li>Menyimpan di dekat makanan yang berbau tajam.</li><li>Menumpuk barang berat di atas kemasan lumpia.</li></ul>
<h2>Kapan sebaiknya digoreng?</h2>
<p>Goreng saat ingin disantap, langsung dari kondisi beku. Dengan begitu kulitnya renyah dan isinya tetap gurih. Waktu menggorengnya sekitar 7 menit dengan api sedang. Langkah lengkapnya ada di artikel cara menggoreng lumpia frozen.</p>
<h2>Cocok untuk stok keluarga</h2>
<p>Karena tahan sampai 2 bulan, lumpia frozen cocok disimpan sebagai stok camilan keluarga, bekal tamu yang datang mendadak, atau hidangan tambahan saat ada acara kecil di rumah.</p>
<p>Ingin stok untuk beberapa minggu ke depan? Pesan beberapa paket sekaligus lewat WhatsApp.</p>`,
  },
  {
    slug: "lumpia-untuk-arisan-dan-hajatan",
    title: "Pesan Lumpia untuk Arisan, Pengajian, dan Hajatan",
    excerpt: "Butuh lumpia dalam jumlah banyak? Pesanan 50 pcs atau lebih bisa lewat WhatsApp, minimal H-1 dengan DP.",
    cover_url: "/images/menu/lumpia-goreng.webp",
    cover_alt: "Lumpia goreng siap santap untuk acara",
    daysAgo: 3,
    body: `<p>Lumpia mini mudah dibagi dan disukai banyak orang, jadi cocok untuk arisan, pengajian, rapat kantor, sampai hajatan. Ukurannya yang kecil, sekitar 10 cm, membuatnya praktis dimakan sambil mengobrol tanpa perlu piring besar atau sendok.</p>
<p>Untuk acara dengan banyak tamu, pesanan sebaiknya dipersiapkan jauh-jauh hari supaya semuanya terkelola dengan baik. Berikut ketentuan dan cara memesannya.</p>
<h2>Ketentuan pesanan dalam jumlah banyak</h2>
<ul><li>Minimal 50 pcs</li><li>Pesan lewat WhatsApp, minimal H-1 sebelum acara</li><li>DP dibayar di awal</li></ul>
<h2>Cara memesan</h2>
<ol><li>Chat Mbak Cun lewat WhatsApp.</li><li>Sebutkan jumlah yang dibutuhkan dan tanggal acara.</li><li>Tentukan pilihan menu dan bentuknya, frozen atau siap santap.</li><li>Bayar DP untuk mengunci pesanan.</li></ol>
<p>Kalau belum yakin jumlah yang pas, sebutkan perkiraan jumlah tamu. Nanti dibantu menghitung agar tidak kurang dan tidak berlebihan.</p>
<h2>Pilihan menu</h2>
<p>Pilihannya bisa lumpia, tahu rebung, tahu bakso, atau pisang coklat, dalam bentuk frozen maupun siap santap. Dengan beberapa pilihan, tamu yang tidak makan udang atau menyukai rasa manis tetap kebagian.</p>
<h2>Tips untuk acara</h2>
<ul><li>Pesan lebih awal, apalagi saat akhir pekan dan musim hajatan.</li><li>Pilih siap santap bila tidak ada yang sempat menggoreng di hari acara.</li><li>Sediakan cabai rawit di meja agar tamu bisa menyesuaikan pedasnya.</li></ul>
<p>Siap memesan? Hubungi Mbak Cun lewat WhatsApp dengan tombol di bawah.</p>`,
  },
];
