// Ana JS dosyası. index.html'den taşınan scriptler buraya eklenecek.

// Konum paneli gösterme
document
  .getElementById("showLocationBtn")
  .addEventListener("click", function () {
    var loc = document.getElementById("location");
    var menuPanel = document.getElementById("menuPanel");
    if (loc.style.display === "none") {
      loc.style.display = "block";
      loc.classList.remove("animate__fadeOutDown");
      loc.classList.add("animate__fadeInUp");
      menuPanel.style.display = "none";
    } else {
      loc.classList.remove("animate__fadeInUp");
      loc.classList.add("animate__fadeOutDown");
      setTimeout(function () {
        loc.style.display = "none";
      }, 800);
    }
  });
// Menü paneli gösterme
document.getElementById("showMenuBtn").addEventListener("click", function () {
  var menuPanel = document.getElementById("menuPanel");
  var loc = document.getElementById("location");
  if (menuPanel.style.display === "none") {
    menuPanel.style.display = "block";
    menuPanel.classList.remove("animate__fadeOutDown");
    menuPanel.classList.add("animate__fadeInUp");
    loc.style.display = "none";
  } else {
    menuPanel.classList.remove("animate__fadeInUp");
    menuPanel.classList.add("animate__fadeOutDown");
    setTimeout(function () {
      menuPanel.style.display = "none";
    }, 800);
  }
});
// Menü içeriğini doldurma
async function loadMenu(type) {
  const menuTitle = document.getElementById("menuTitle");
  const menuItems = document.getElementById("menuItems");
  menuTitle.style.display = "none";
  menuItems.innerHTML = "<li class='text-white'>Yükleniyor...</li>";
  try {
    const res = await fetch("menu.json");
    const data = await res.json();
    let items = type === "yiyecek" ? data.yiyecekler : data.icecekler;
    // Ürün adını dosya adına dönüştüren fonksiyon
    function toFileName(ad) {
      return (
        ad
          .toLocaleLowerCase("tr")
          .replace(/ç/g, "c")
          .replace(/ğ/g, "g")
          .replace(/ı/g, "i")
          .replace(/ö/g, "o")
          .replace(/ş/g, "s")
          .replace(/ü/g, "u")
          .replace(/[^a-z0-9]/g, "") + ".jpg"
      );
    }
    menuItems.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "mb-2 animate__animated animate__fadeInUp text-white";
      // Satır: resim - içerik (ad, açıklama, fiyat)
      const row = document.createElement("div");
      row.className = "d-flex align-items-center";
      // Görsel ekle (her ürün için)
      const img = document.createElement("img");
      img.src = `img/products/${toFileName(item.ad)}`;
      img.alt = item.ad + " görseli";
      img.style.width = "48px";
      img.style.height = "48px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "12px";
      img.style.marginRight = "12px";
      row.appendChild(img);
      // İçerik (ad, açıklama, fiyat) - dikey hizalanmış
      const contentDiv = document.createElement("div");
      contentDiv.className = "d-flex flex-column";
      const adFiyatRow = document.createElement("div");
      adFiyatRow.className = "d-flex align-items-center";
      const adSpan = document.createElement("span");
      adSpan.innerHTML = `<strong style='font-size:1rem;'>${item.ad}</strong>`;
      adSpan.style.marginRight = "8px";
      const fiyatSpan = document.createElement("span");
      fiyatSpan.innerHTML = `<span class='fw-bold' style='font-size:0.95rem; color:#b6ffb6;'>${item.fiyat}</span>`;
      adFiyatRow.appendChild(adSpan);
      adFiyatRow.appendChild(fiyatSpan);
      contentDiv.appendChild(adFiyatRow);
      const aciklamaSpan = document.createElement("span");
      aciklamaSpan.innerHTML = `<span style='color:#e0e0e0;font-size:0.95rem;'></span>`;
      aciklamaSpan.className = "mt-1";
      contentDiv.appendChild(aciklamaSpan);
      row.appendChild(contentDiv);
      li.appendChild(row);
      const hr = document.createElement("hr");
      hr.className = "my-2";
      li.appendChild(hr);
      menuItems.appendChild(li);
    });
  } catch (err) {
    menuItems.innerHTML = `<li class='text-danger'>Menü verisi yüklenemedi.</li>`;
  }
}
document.getElementById("btnYiyecek").addEventListener("click", function () {
  loadMenu("yiyecek");
});
document.getElementById("btnIcecek").addEventListener("click", function () {
  loadMenu("icecek");
});
