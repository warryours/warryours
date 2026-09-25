/* ================= GLOBAL DATA ================= */
var articles = [];
var activities = [];
var projects = [];

/* ================= LOAD DATA FROM JSON ================= */
async function initApp() {
    try {
        // Ambil ketiga file JSON secara bersamaan (paralel)
        const [resArticles, resActivities, resProjects] = await Promise.all([
            fetch("content/articles.json"),
            fetch("content/activities.json"),
            fetch("content/projects.json")
        ]);

        articles = await resArticles.json();
        activities = await resActivities.json();
        projects = await resProjects.json();

        // Setelah data siap, jalankan render awal
        renderHomeLatest();
        showRoute();
    } catch (error) {
        console.error("Gagal memuat data JSON:", error);
    }
}

/* ================= HELPERS ================= */
/* ================= OPEN GRAPH ================= */
function updateOpenGraph(title, description, imageUrl) {
  // Update judul tab browser
  document.title = title ? title + " - Andi Wira Pratama" : "Portofolio - Andi Wira Pratama";

  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');

  if (ogTitle) ogTitle.setAttribute("content", title || "Portofolio Andi Wira Pratama");
  if (ogDesc) ogDesc.setAttribute("content", description || "Kumpulan artikel, aktivitas, dan proyek.");

  if (ogImage) {
    if (imageUrl) {
      const fullImageUrl = imageUrl.startsWith("http://") || imageUrl.startsWith("https://")
        ? imageUrl
        : window.location.origin + "/" + imageUrl;
      ogImage.setAttribute("content", fullImageUrl);
    } else {
      // Gambar default jika artikel/proyek tidak memiliki gambar
      ogImage.setAttribute("content", window.location.origin + "/assets/images/default-og.jpg");
    }
  }
}

function tagsHtml(tags) {
    return (
        '<div class="tags">' +
        tags
            .map(function (t) {
                return '<span class="tag">' + t + "</span>";
            })
            .join("") +
        "</div>"
    );
}
function baseUrl() {
    return location.origin + location.pathname;
}

function wordCount(html) {
    if (!html) return 0;
    var text = html
        .replace(/<[^>]*>/g, " ")
        .replace(/&[a-zA-Z]+;/g, " ")
        .trim();
    return text ? text.split(/\s+/).length : 0;
}

/* ================= READ TIME CALCULATION ================= */
function calculateReadTime(html, wpm) {
    wpm = wpm || 180; // Standar kecepatan membaca (180 kata/menit)
    var count = wordCount(html);
    var minutes = Math.ceil(count / wpm);
    return (minutes || 1) + " menit baca";
}

/* ================= RENDER: PROJECT LINKS ================= */
function projectLinksHtml(links) {
    return (
        '<p class="links">' +
        links
            .map(function (l) {
                return (
                    '<a href="' +
                    l.url +
                    '" target="_blank" rel="noopener">' +
                    l.label +
                    "</a>"
                );
            })
            .join(" ") +
        "</p>"
    );
}

/* ================= RENDER: HOME LATEST ================= */
function renderHomeLatest() {
    var html = '<div class="latest-section">';

    // 1. Artikel Terbaru
    if (articles.length) {
        var a = articles[0];
        var imageHtml = a.image
            ? '<img src="' + a.image + '" alt="' + a.title + '" class="preview-image" />'
            : '';

        html +=
            '<div class="latest-block">' +
            '<div class="latest-head"><h3>Artikel terbaru</h3><a href="#artikel">Lihat semua</a></div>' +
            '<div class="article-item">' +

            // --- PEMBUNGKUS TEKS DIBUKA ---
            '<div class="item-body">' +
            '<span class="meta"><span>' +
            a.date +
            "</span><span>" +
            a.readTime +
            "</span><span>" +
            wordCount(a.content) +
            " kata</span><span>Andi Wira Pratama</span></span>" +
            '<h3><a href="#artikel/' +
            a.slug +
            '">' +
            a.title +
            "</a></h3>" +
            '<p class="excerpt">' +
            a.excerpt +
            "</p>" +
            tagsHtml(a.tags) +
            "</div>" +
            // --- PEMBUNGKUS TEKS DITUTUP ---

            imageHtml + // Gambar ditaruh di sini (di luar item-body)
            "</div></div>";
    }

    // 2. Aktivitas Terbaru
    if (activities.length) {
        var t = activities[0];
        var imageHtmlAct = t.image
            ? '<img src="' + t.image + '" alt="' + t.title + '" class="preview-image" />'
            : '';

        html +=
            '<div class="latest-block">' +
            '<div class="latest-head"><h3>Aktivitas terbaru</h3><a href="#aktivitas">Lihat semua</a></div>' +
            '<div class="timeline"><div class="timeline-item">' +

            '<div class="item-body">' +
            '<span class="meta"><span>' +
            t.date +
            "</span></span>" +
            '<h3><a href="#aktivitas/' +
            t.slug +
            '">' +
            t.title +
            "</a></h3>" +
            "<p>" +
            t.excerpt +
            "</p>" +
            "</div>" +

            imageHtmlAct +
            "</div></div></div>";
    }

    // 3. Proyek Terbaru
    if (projects.length) {
        var p = projects[0];
        var imageHtmlProj = p.image
            ? '<img src="' + p.image + '" alt="' + p.title + '" class="preview-image" />'
            : '';

        html +=
            '<div class="latest-block">' +
            '<div class="latest-head"><h3>Proyek terbaru</h3><a href="#proyek">Lihat semua</a></div>' +
            '<div class="project-item">' +

            '<div class="item-body">' +
            '<h3><a href="#proyek/' + p.slug + '">' + p.title + '</a></h3>' +
            '<p class="desc">' + p.desc + '</p>' +
            tagsHtml(p.tags) +
            projectLinksHtml(p.links) +
            "</div>" +

            imageHtmlProj +
            '</div></div>';
    }

    html += "</div>";
    document.getElementById("home-latest").innerHTML = html;
}

/* ================= RENDER: ARTIKEL LIST ================= */
function renderArtikelList() {
    var html =
        '<h2 class="section-title">Artikel</h2><p class="page-intro">Tulisan singkat seputar pengembangan web, desain sistem, dan catatan belajar.</p>';
    articles.forEach(function (a) {
        var imageHtml = a.image
            ? '<img src="' + a.image + '" alt="' + a.title + '" class="preview-image" />'
            : '';

        html +=
            '<div class="article-item">' +
            // --- BUKA ITEM-BODY (TEKS) ---
            '<div class="item-body">' +
            '<span class="meta"><span>' + a.date + '</span><span>' + a.readTime + '</span></span>' +
            '<h3><a href="#artikel/' + a.slug + '">' + a.title + '</a></h3>' +
            '<p class="excerpt">' + a.excerpt + '</p>' +
            tagsHtml(a.tags) +
            '</div>' +
            // --- TUTUP ITEM-BODY ---
            imageHtml + // Gambar di luar item-body
            '</div>';
    });
    document.getElementById("artikel-list").innerHTML = html;
}

/* ================= RENDER: AKTIVITAS LIST ================= */
function renderAktivitasList() {
    var html =
        '<h2 class="section-title">Aktivitas</h2>' +
        '<p class="page-intro">Catatan singkat tentang apa yang sedang saya kerjakan dari waktu ke waktu.</p>' +
        '<div class="timeline">';

    activities.forEach(function (t) {
        var imageHtml = t.image
            ? '<img src="' + t.image + '" alt="' + t.title + '" class="preview-image" />'
            : '';

        html +=
            '<div class="timeline-item">' +
            // --- BUKA ITEM-BODY (TEKS) ---
            '<div class="item-body">' +
            '<span class="meta"><span>' + t.date + '</span></span>' +
            '<h3><a href="#aktivitas/' + t.slug + '">' + t.title + '</a></h3>' +
            '<p>' + t.excerpt + '</p>' +
            '</div>' +
            // --- TUTUP ITEM-BODY ---
            imageHtml + // Gambar di luar item-body
            '</div>';
    });
    html += '</div>';
    document.getElementById("aktivitas-list").innerHTML = html;
}

/* ================= RENDER: PROYEK LIST ================= */
function renderProyekList() {
    var html =
        '<h2 class="section-title">Proyek</h2><p class="page-intro">Sebagian proyek pribadi dan proyek kerja yang bisa saya tunjukkan.</p>';
    projects.forEach(function (p) {
    var imageHtml = p.image 
      ? '<img src="' + p.image + '" alt="' + p.title + '" class="preview-image" />' 
      : '';

    html +=
      '<div class="project-item">' +
      // --- BUKA ITEM-BODY (TEKS) ---
      '<div class="item-body">' +
      '<h3><a href="#proyek/' + p.slug + '">' + p.title + '</a></h3>' +
      '<p class="desc">' + p.desc + '</p>' +
      tagsHtml(p.tags) +
      projectLinksHtml(p.links) +
      '</div>' +
      // --- TUTUP ITEM-BODY ---
      imageHtml + // Gambar di luar item-body
      '</div>';
  });
  document.getElementById("proyek-list").innerHTML = html;
}

/* ================= RENDER: DETAIL VIEWS ================= */
function shareRowHtml() {
    var icons = {
        share:
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08a2.9 2.9 0 0 0-1.94.75L8.91 12.7a2.9 2.9 0 0 0 0-1.4l7.05-4.11a3 3 0 1 0-.88-1.73L8.03 9.57a3 3 0 1 0 0 4.86l7.15 4.15a3 3 0 1 0 2.82-2.5z"/></svg>',
        whatsapp:
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.42a9.87 9.87 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.64-1.03-5.13-2.9-7C17.17 3.03 14.68 2 12.04 2zm5.8 14.17c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.11.11-1.8-.11a16.7 16.7 0 0 1-1.62-.6c-2.86-1.24-4.72-4.13-4.86-4.32-.14-.19-1.16-1.55-1.16-2.96 0-1.4.73-2.09.99-2.38.26-.28.57-.35.76-.35h.55c.18 0 .42-.03.65.5.24.55.81 1.9.88 2.04.07.14.11.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.29.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.53.72 1.79.85.26.14.44.2.5.32.06.11.06.65-.18 1.33z"/></svg>',
        facebook:
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-9h3l.5-3.5h-3.5V7.2c0-1 .3-1.7 1.7-1.7h1.9V2.3C16.8 2.2 15.8 2 14.7 2 12 2 10.5 3.6 10.5 6.5V9.5H7.5v3.5h3V22h3z"/></svg>',
        threads:
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.2 22c-2.1 0-3.9-.5-5.3-1.6-1.6-1.2-2.5-3-2.7-5.3l2.2-.2c.2 1.7.8 3 1.9 3.8 1 .8 2.3 1.2 3.9 1.2 1.5 0 2.7-.3 3.5-1 .8-.6 1.2-1.4 1.2-2.4 0-.8-.2-1.5-.7-2-.5-.5-1.2-.8-2.2-1-.4.9-1 1.6-1.8 2.1-.9.5-1.9.8-3 .8-1.5 0-2.7-.4-3.6-1.3-.9-.9-1.3-2-1.3-3.3 0-1.4.5-2.5 1.4-3.4.9-.9 2.2-1.3 3.7-1.3 1.2 0 2.2.3 3.1.9.3-.2.7-.4 1.1-.5l.5 2c-.3.1-.6.2-.8.4.5.8.8 1.8.8 3v.3c1.4.3 2.5.9 3.3 1.8.8.9 1.2 2 1.2 3.4 0 1.7-.7 3.1-2 4.1-1.3 1-3 1.5-5.1 1.5zm-.6-11.7c-.9 0-1.6.2-2.1.7-.5.5-.7 1.1-.7 1.9 0 .7.2 1.3.7 1.7.5.4 1.1.6 1.9.6.8 0 1.5-.2 2-.6.5-.4.8-1 1-1.7v-.2c0-.9-.3-1.6-.9-2-.5-.3-1.1-.4-1.9-.4z"/></svg>',
        instagram:
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47a4.9 4.9 0 0 0-1.77 1.15A4.9 4.9 0 0 0 2.53 5.45c-.25.64-.42 1.37-.47 2.43C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43a4.9 4.9 0 0 0 1.15 1.77 4.9 4.9 0 0 0 1.77 1.15c.64.25 1.37.42 2.43.47 1.06.05 1.4.06 4.12.06s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47a4.9 4.9 0 0 0 1.77-1.15 4.9 4.9 0 0 0 1.15-1.77c.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.15-1.77A4.9 4.9 0 0 0 18.55 2.53c-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.72 2 12 2zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.21 1.86.35.47.18.8.4 1.15.75.35.35.57.68.75 1.15.14.36.31.88.35 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.5-.35 1.86-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.36.14-.88.31-1.86.35-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.21-1.86-.35a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.14-.36-.31-.88-.35-1.86C3.81 14.99 3.8 14.67 3.8 12s.01-2.99.06-4.04c.04-.98.21-1.5.35-1.86.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.36-.14.88-.31 1.86-.35C9.01 3.81 9.33 3.8 12 3.8zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7zm5.35-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>',
    };
    return (
        '<div class="share-row">' +
        '<span class="share-label">Bagikan:</span>' +
        '<button class="share-btn" onclick="shareWA()">' +
        icons.whatsapp +
        "WhatsApp</button>" +
        '<button class="share-btn" onclick="shareFB()">' +
        icons.facebook +
        "Facebook</button>" +
        '<button class="share-btn" onclick="shareThreads()">' +
        icons.threads +
        "Threads</button>" +
        '<button class="share-btn" onclick="shareIG()">' +
        icons.instagram +
        "Instagram</button>" +
        "</div>"
    );
}

/* ================= RENDER: ARTIKEL DETAIL ================= */
function renderArtikelDetail(slug) {
    var a = articles.filter(function (x) {
        return x.slug === slug;
    })[0];
    var el = document.getElementById("artikel-detail");
    if (!a) {
        el.innerHTML =
            '<p class="page-intro">Artikel tidak ditemukan.</p><a class="back-link" href="#artikel">&larr; Kembali ke Artikel</a>';
        return;
    }
    updateOpenGraph(a.title, a.excerpt, a.image);
    window.currentShare = {
        url: baseUrl() + "#artikel/" + a.slug,
        title: a.title,
    };
    el.innerHTML =
        '<a class="back-link" href="#artikel">&larr; Kembali ke Artikel</a>' +
        '<h1 class="detail-title">' +
        a.title +
        "</h1>" +
        '<span class="meta"><span>' +
        a.date +
        "</span><span>" +
        a.readTime +
        "</span><span>" +
        wordCount(a.content) +
        " kata</span><span>Andi Wira Pratama</span></span>" +
        tagsHtml(a.tags) +
        '<div class="detail-content">' +
        a.content +
        "</div>" +
        shareRowHtml();
}

/* ================= RENDER: AKTIVITAS DETAIL ================= */
function renderAktivitasDetail(slug) {
    var a = activities.filter(function (x) {
        return x.slug === slug;
    })[0];
    var el = document.getElementById("aktivitas-detail");
    if (!a) {
        el.innerHTML =
            '<p class="page-intro">Aktivitas tidak ditemukan.</p><a class="back-link" href="#aktivitas">&larr; Kembali ke Aktivitas</a>';
        return;
    }
    updateOpenGraph(a.title, a.excerpt, a.image);
    window.currentShare = {
        url: baseUrl() + "#aktivitas/" + a.slug,
        title: a.title,
    };
    el.innerHTML =
        '<a class="back-link" href="#aktivitas">&larr; Kembali ke Aktivitas</a>' +
        '<h1 class="detail-title">' +
        a.title +
        "</h1>" +
        '<span class="meta"><span>' +
        a.date +
        "</span></span>" +
        '<div class="detail-content">' +
        a.content +
        "</div>" +
        shareRowHtml();
}

/* ================= RENDER: PROJECT DETAIL ================= */
function renderProyekDetail(slug) {
    var p = projects.filter(function (x) {
        return x.slug === slug;
    })[0];
    var el = document.getElementById("proyek-detail");
    if (!p) {
        el.innerHTML =
            '<p class="page-intro">Proyek tidak ditemukan.</p><a class="back-link" href="#proyek">&larr; Kembali ke Proyek</a>';
        return;
    }
    updateOpenGraph(p.title, p.excerpt, p.image);
    window.currentShare = {
        url: baseUrl() + "#proyek/" + p.slug,
        title: p.title,
    };
    el.innerHTML =
        '<a class="back-link" href="#proyek">&larr; Kembali ke Proyek</a>' +
        '<h1 class="detail-title">' + p.title + '</h1>' +
        tagsHtml(p.tags) +
        '<div class="detail-content">' + p.content + '</div>' +
        projectLinksHtml(p.links) +
        shareRowHtml();
}

/* ================= SHARE ACTIONS ================= */
function showToast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(function () {
        t.classList.remove("show");
    }, 2600);
}
function shareNative() {
    if (navigator.share) {
        navigator
            .share({
                title: window.currentShare.title,
                url: window.currentShare.url,
            })
            .catch(function () { });
    } else {
        shareWA();
    }
}
function shareWA() {
    window.open(
        "https://wa.me/?text=" +
        encodeURIComponent(
            window.currentShare.title + " — " + window.currentShare.url,
        ),
        "_blank",
    );
}
function shareFB() {
    window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent(window.currentShare.url),
        "_blank",
    );
}
function shareThreads() {
    window.open(
        "https://www.threads.net/intent/post?text=" +
        encodeURIComponent(
            window.currentShare.title + " — " + window.currentShare.url,
        ),
        "_blank",
    );
}
function shareIG() {
    var url = window.currentShare.url;
    if (navigator.clipboard) {
        navigator.clipboard
            .writeText(url)
            .then(function () {
                showToast(
                    "Tautan disalin. Buka Instagram → buat Story baru → tempel lewat stiker link.",
                );
            })
            .catch(function () {
                showToast("Salin manual: " + url);
            });
    } else {
        showToast("Salin manual: " + url);
    }
}

/* ================= ROUTING ================= */
var routes = ["home", "aktivitas", "artikel", "proyek"];
function parseHash() {
    var h = (location.hash || "#home").replace("#", "");
    var parts = h.split("/");
    return { section: parts[0] || "home", slug: parts[1] || null };
}
function showRoute() {
    var r = parseHash();
    var section = routes.indexOf(r.section) !== -1 ? r.section : "home";

    routes.forEach(function (name) {
        var el = document.getElementById(name);
        if (el) el.classList.toggle("active", name === section);
    });
    document.querySelectorAll("nav a[data-route]").forEach(function (link) {
        link.classList.toggle(
            "active",
            link.getAttribute("data-route") === section && section !== "home",
        );
    });

    if (section === "artikel") {
        if (r.slug) {
            renderArtikelDetail(r.slug);
            document.getElementById("artikel-list").classList.remove("active");
            document.getElementById("artikel-detail").classList.add("active");
        } else {
            renderArtikelList();
            document
                .getElementById("artikel-detail")
                .classList.remove("active");
            document.getElementById("artikel-list").classList.add("active");
        }
    }
    if (section === "aktivitas") {
        if (r.slug) {
            renderAktivitasDetail(r.slug);
            document
                .getElementById("aktivitas-list")
                .classList.remove("active");
            document.getElementById("aktivitas-detail").classList.add("active");
        } else {
            renderAktivitasList();
            document
                .getElementById("aktivitas-detail")
                .classList.remove("active");
            document.getElementById("aktivitas-list").classList.add("active");
        }
    }

    if (section === "proyek") {
        if (r.slug) {
            renderProyekDetail(r.slug);
            document.getElementById("proyek-list").classList.remove("active");
            document.getElementById("proyek-detail").classList.add("active");
        } else {
            renderProyekList();
            document.getElementById("proyek-detail").classList.remove("active");
            document.getElementById("proyek-list").classList.add("active");
        }
    }

    window.scrollTo(0, 0);
}
window.addEventListener("hashchange", showRoute);

/* ================= LOAD DATA FROM JSON & MARKDOWN ================= */
async function initApp() {
    try {
        // 1. Fetch file JSON
        const [resArticles, resActivities, resProjects] = await Promise.all([
            fetch("content/articles.json"),
            fetch("content/activities.json"),
            fetch("content/projects.json")
        ]);

        articles = await resArticles.json();
        activities = await resActivities.json();
        projects = await resProjects.json();

        // 2. Fetch isi file Markdown (.md) secara otomatis sesuai filePath
        await Promise.all([
            ...articles.map(async (a) => {
                if (a.filePath) {
                    try {
                        const res = await fetch(a.filePath);
                        const rawText = await res.text();
                        a.content = marked.parse(rawText);
                    } catch (e) { a.content = ""; }
                }
            }),
            ...activities.map(async (act) => {
                if (act.filePath) {
                    try {
                        const res = await fetch(act.filePath);
                        const rawText = await res.text();
                        act.content = marked.parse(rawText);
                    } catch (e) { act.content = ""; }
                }
            }),
            ...projects.map(async (p) => {
                if (p.filePath) {
                    try {
                        const res = await fetch(p.filePath);
                        const rawText = await res.text();
                        p.content = marked.parse(rawText);
                    } catch (e) { p.content = ""; }
                }
            })
        ]);

        // Hitung readTime SETELAH data JSON berhasil di-fetch
        articles.forEach(function (a) {
            a.readTime = calculateReadTime(a.content || "");
        });

        // Setelah data siap, jalankan render awal
        renderHomeLatest();
        showRoute();
    } catch (error) {
        console.error("Gagal memuat data", error);
    }
}

initApp();

/* ================= THEME TOGGLE ================= */
var root = document.documentElement;
var sunIcon = document.getElementById("icon-sun");
var moonIcon = document.getElementById("icon-moon");
function systemPrefersDark() {
    return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
}
function applyThemeIcon(theme) {
    var isDark =
        theme === "dark" || (theme === null && systemPrefersDark());
    sunIcon.style.display = isDark ? "none" : "block";
    moonIcon.style.display = isDark ? "block" : "none";
}
function getStoredTheme() {
    try {
        return localStorage.getItem("theme");
    } catch (e) {
        return null;
    }
}
function setStoredTheme(theme) {
    try {
        if (theme) localStorage.setItem("theme", theme);
        else localStorage.removeItem("theme");
    } catch (e) { }
}

var stored = getStoredTheme();
if (stored === "light" || stored === "dark")
    root.setAttribute("data-theme", stored);
applyThemeIcon(stored);

document
    .getElementById("theme-toggle")
    .addEventListener("click", function () {
        var current = root.getAttribute("data-theme");
        var isDarkNow =
            current === "dark" || (!current && systemPrefersDark());
        var next = isDarkNow ? "light" : "dark";
        root.setAttribute("data-theme", next);
        setStoredTheme(next);
        applyThemeIcon(next);
    });

document.getElementById("year").textContent = new Date().getFullYear();