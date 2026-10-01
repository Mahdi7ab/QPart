(() => {
  const data = window.QPART_CATALOG;
  const root = document.getElementById("erp-catalog");
  const catalogSearch = document.getElementById("catalog-search");
  const siteSearch = document.getElementById("site-search");
  const empty = document.getElementById("catalog-empty");
  const filterButtons = [...document.querySelectorAll("[data-catalog-filter]")];
  const machineryFilters = document.getElementById("machinery-filters");
  const machineryGrid = document.getElementById("machinery-grid");
  const machineryEmpty = document.getElementById("machinery-empty");
  let audienceFilter = "all";
  let machineryFilter = "all";
  let query = "";

  const normalize = (value) => (value || "").toLocaleLowerCase("fa").replace(/[\u200c\s]+/g, " ").trim();
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  function renderCatalog() {
    root.replaceChildren();
    const matches = data.classifications.filter((group) => {
      const audienceMatches = audienceFilter === "all" || (audienceFilter === "internal" ? group.audience === "internal" : group.audience !== "internal");
      const text = normalize([group.name, group.code, group.summary, group.searchable].join(" "));
      return audienceMatches && (!query || text.includes(normalize(query)));
    });
    for (const group of matches) {
      const card = make("article", "erp-card");
      card.dataset.group = group.id;
      const imageBox = make("div", "erp-card-image");
      if (group.image) {
        const img = document.createElement("img");
        img.src = group.image;
        img.alt = "";
        img.loading = "lazy";
        imageBox.append(img);
      } else {
        imageBox.dataset.icon = group.audience === "internal" ? "▦" : (group.id === "services" ? "◌" : "▧");
        imageBox.setAttribute("aria-hidden", "true");
      }
      const body = make("div", "erp-card-body");
      const meta = make("div", "erp-meta");
      meta.append(make("span", "erp-code", `کد ERP ${group.code}`));
      meta.append(make("span", group.audience === "internal" ? "erp-scope scope-internal" : "erp-scope scope-customer", group.audience === "internal" ? "گروه داخلی ERP" : "گروه قابل عرضه"));
      body.append(meta, make("h3", "", group.name), make("p", "", group.summary));
      if (group.audience === "internal") {
        body.append(make("p", "erp-internal-note", "طبقه‌بندی انبار؛ برای نمایش موجودی فروشگاهی استفاده نمی‌شود."));
      } else {
        const link = make("a", "erp-card-link", "درخواست بررسی کالا ←");
        link.href = "#contact";
        body.append(link);
      }
      card.append(imageBox, body);
      root.append(card);
    }
    const spare = data.itemMappings.find((item) => item.itemCode === "904");
    const spareQuery = normalize([spare.item, spare.itemCode, spare.erpClass, spare.classCode, spare.unit1, spare.usage, spare.note].join(" "));
    const spareMatches = spare && audienceFilter !== "internal" && (!query || spareQuery.includes(normalize(query)));
    if (spareMatches) {
      const card = make("article", "erp-card erp-item-card");
      card.dataset.group = "commercial-spares";
      const imageBox = make("div", "erp-card-image");
      const image = document.createElement("img");
      image.src = "assets/category-spares.png";
      image.alt = "";
      image.loading = "lazy";
      imageBox.append(image);
      const body = make("div", "erp-card-body");
      body.append(make("h3", "", spare.item), make("p", "", "قطعه یدکی قابل استعلام"));
      const meta = make("div", "erp-meta");
      meta.append(make("span", "erp-scope scope-customer", "گروه فروشگاهی: قطعات یدکی"));
      meta.append(make("span", "erp-meta-detail", `طبقه‌بندی ERP: ${spare.erpClass}`));
      meta.append(make("span", "erp-meta-detail", `واحد ERP: ${spare.unit1} · مصرف: ${spare.usage}`));
      body.append(meta, make("p", "erp-internal-note", "در فهرست ERP زیر مواد اولیه ثبت شده؛ این نگاشت، گروه فروشگاهی را تغییر نمی‌دهد."));
      const link = make("a", "erp-card-link", "درخواست بررسی کالا ←");
      link.href = "#contact";
      body.append(link);
      card.append(imageBox, body);
      root.append(card);
    }
    empty.hidden = matches.length > 0 || Boolean(spareMatches);
  }

  function machineSvg(id) {
    const shapes = {
      chainsaw: ['<rect x="18" y="27" width="25" height="17" rx="4"/>', '<path d="M43 31h21v8H43M23 44v8m15-8v8M16 32h-5m48-1 5-4m-5 16 5 4"/>', '<circle cx="28" cy="35" r="3"/>'],
      sprayer: ['<path d="M25 20h21l-2 36H27l-2-36Zm4 0v-7h12v7M46 25h8l4 13-9 3M28 30h14"/>', '<path d="M58 38h7m-4-5 5-3m-4 12 6 2"/>'],
      generator: ['<rect x="13" y="22" width="48" height="31" rx="5"/><path d="M19 22v-6h36v6M19 53l-3 5m42-5 3 5M22 47h30M22 29h14v12H22z"/>', '<circle cx="46" cy="35" r="6"/>'],
      cultivator: ['<path d="M19 22h24l6 8H25l-6-8Zm10 8-7 21m7-21 4 22m8-22 8 21m-8-21-3 22M19 22l-5-8m29 8 8-9m-19 9V11"/>', '<circle cx="19" cy="24" r="3"/>'],
      "diesel-generator": ['<rect x="15" y="23" width="47" height="29" rx="4"/><path d="M21 23v-7h34v7M20 52l-3 6m42-6 3 6M22 45h32M22 29h13v11H22z"/>', '<path d="M44 31h12m-12 5h12"/>'],
    };
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 76 68");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "64");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.7");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    for (const shape of shapes[id] || []) {
      const wrapper = document.createElementNS("http://www.w3.org/2000/svg", "g");
      wrapper.innerHTML = shape;
      svg.append(...wrapper.children);
    }
    return svg;
  }

  function renderMachinery() {
    machineryFilters.replaceChildren();
    const allButton = make("button", `filter-chip${machineryFilter === "all" ? " is-active" : ""}`, "همه دستگاه‌ها");
    allButton.type = "button";
    allButton.dataset.machineryFilter = "all";
    allButton.setAttribute("aria-pressed", String(machineryFilter === "all"));
    machineryFilters.append(allButton);
    for (const item of data.machinery) {
      const button = make("button", `filter-chip${machineryFilter === item.id ? " is-active" : ""}`, item.name);
      button.type = "button";
      button.dataset.machineryFilter = item.id;
      button.setAttribute("aria-pressed", String(machineryFilter === item.id));
      machineryFilters.append(button);
    }
    machineryGrid.replaceChildren();
    const matches = data.machinery.filter((item) => {
      const selected = machineryFilter === "all" || item.id === machineryFilter;
      return selected && (!query || normalize(`${item.name} ${item.search}`).includes(normalize(query)));
    });
    for (const item of matches) {
      const card = make("article", "machinery-card");
      const visual = make("div", "machinery-card-image");
      const machineImages = {
        "brush-cutter": "assets/product-brush-cutter.png",
        "water-pump": "assets/product-water-pump.png",
        chainsaw: "assets/product-chainsaw-v3.png",
        generator: "assets/product-generator-v3.png"
      };
      if (machineImages[item.id]) {
        const img = document.createElement("img");
        img.src = machineImages[item.id];
        img.alt = "";
        img.loading = "lazy";
        visual.append(img);
      } else {
        visual.append(machineSvg(item.id));
      }
      const body = make("div", "machinery-card-body");
      body.append(make("h3", "", item.name), make("p", "", "مدل و مشخصات در زمان استعلام بررسی می‌شود."));
      const link = make("a", "machinery-card-link", "استعلام این دستگاه ←");
      link.href = "#contact";
      card.append(visual, body, link);
      machineryGrid.append(card);
    }
    machineryEmpty.hidden = matches.length > 0;
  }

  function setSearch(value) {
    query = value;
    if (catalogSearch.value !== value) catalogSearch.value = value;
    if (siteSearch.value !== value) siteSearch.value = value;
    renderCatalog();
    renderMachinery();
  }

  filterButtons.forEach((button) => button.addEventListener("click", () => {
    audienceFilter = button.dataset.catalogFilter;
    filterButtons.forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle("is-active", selected);
      candidate.setAttribute("aria-pressed", String(selected));
    });
    renderCatalog();
  }));
  catalogSearch.addEventListener("input", () => setSearch(catalogSearch.value));
  siteSearch.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const target = data.machinery.some((item) => normalize(item.name + " " + item.search).includes(normalize(query))) ? "machinery-browser" : "catalog";
    document.getElementById(target).scrollIntoView({ behavior: "smooth", block: "start" });
  });
  siteSearch.addEventListener("input", () => setSearch(siteSearch.value));
  machineryFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-machinery-filter]");
    if (!button) return;
    machineryFilter = button.dataset.machineryFilter;
    renderMachinery();
  });
  const menuButton = document.querySelector(".menu-button");
  const mobileNav = document.getElementById("mobile-nav");
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "بازکردن منو" : "بستن منو");
    mobileNav.hidden = isOpen;
  });
  mobileNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      mobileNav.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "بازکردن منو");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileNav.hidden) {
      mobileNav.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "بازکردن منو");
      menuButton.focus();
    }
  });
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      siteSearch.focus();
    }
  });

  // Manual browsing keeps motion under the visitor's control.
  const heroItems = [
    { name: "پمپ آب", description: "برای آبیاری مزارع و باغات", image: "assets/product-water-pump.png" },
    { name: "اره موتوری", description: "برای برش و هرس چوب", image: "assets/product-chainsaw-v3.png" },
    { name: "علف‌تراش", description: "برای رسیدگی به باغ و فضای سبز", image: "assets/product-brush-cutter.png" }
  ];
  let heroIndex = 0;
  const heroDots = [...document.querySelectorAll("[data-hero-index]")];
  function showHero(index) {
    heroIndex = (index + heroItems.length) % heroItems.length;
    const item = heroItems[heroIndex];
    const image = document.getElementById("hero-product-image");
    image.src = item.image;
    image.alt = "تصویر نمونه " + item.name;
    document.getElementById("hero-product-name").textContent = item.name;
    document.getElementById("hero-product-description").textContent = item.description;
    heroDots.forEach((dot, index) => dot.setAttribute("aria-pressed", String(index === heroIndex)));
  }
  heroDots.forEach((dot) => dot.addEventListener("click", () => showHero(Number(dot.dataset.heroIndex))));
  document.querySelectorAll("[data-hero-step]").forEach((button) => button.addEventListener("click", () => showHero(heroIndex + Number(button.dataset.heroStep))));
  document.querySelectorAll("[data-machine-shortcut]").forEach((link) => link.addEventListener("click", () => {
    machineryFilter = link.dataset.machineShortcut;
    setSearch("");
    renderMachinery();
  }));
  document.querySelector("[data-spares-shortcut]").addEventListener("click", () => {
    audienceFilter = "customer";
    filterButtons.forEach((button) => {
      const selected = button.dataset.catalogFilter === "customer";
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    setSearch("یدکی");
  });
  renderCatalog();
  renderMachinery();
})();
