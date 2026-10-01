window.QPART_CATALOG = {
  classifications: [
    { id: "services", code: "100", name: "خدمات", audience: "customer", summary: "گروه خدمات در طبقه‌بندی کالاهای ERP.", image: "", searchable: "خدمات" },
    { id: "commercial-machinery", code: "900", name: "دستگاه تجاری", audience: "customer", summary: "ماشین‌آلات و دستگاه‌های تجاری ثبت‌شده در فهرست ERP.", image: "assets/category-machinery.png", searchable: "دستگاه تجاری ماشین آلات ماشین‌آلات" },
    { id: "commercial-spares", code: "901", name: "یدکی تجاری", audience: "customer", summary: "گروه قطعات یدکی تجاری. در فهرست کالا، برخی ردیف‌ها به گروه دستگاه یا مواد اولیه نگاشت شده‌اند.", image: "assets/category-spares.png", searchable: "یدکی تجاری قطعات یدکی" },
    { id: "manufactured-products", code: "902", name: "محصولات تولیدی", audience: "customer", summary: "محصولات تولیدی ثبت‌شده در طبقه‌بندی ERP.", image: "", searchable: "محصولات تولیدی" },
    { id: "raw-materials", code: "903", name: "مواد اولیه", audience: "internal", summary: "طبقه‌بندی داخلی ERP؛ یک گروه عملیاتی انبار است و دسته فروشگاهی محسوب نمی‌شود.", image: "", searchable: "مواد اولیه داخلی ERP" },
    { id: "packaging", code: "904", name: "بسته‌بندی", audience: "internal", summary: "طبقه‌بندی داخلی ERP؛ گروه عملیاتی است و دسته فروشگاهی محسوب نمی‌شود.", image: "", searchable: "مواد بسته بندی بسته‌بندی داخلی ERP" }
  ],
  itemMappings: [
    { item: "خدمات", itemCode: "100", erpClass: "خدمات", classCode: "100", unit1: "عدد", usage: "سایر کالاها", audience: "service" },
    { item: "دستگاه تجاری", itemCode: "900", erpClass: "دستگاه تجاری", classCode: "900", unit1: "عدد", usage: "فروش", audience: "customer" },
    { item: "یدکی تجاری", itemCode: "901", erpClass: "یدکی تجاری", classCode: "901", unit1: "عدد", unit2: "بسته", usage: "فروش", audience: "customer" },
    { item: "محصولات تولیدی", itemCode: "902", erpClass: "محصولات تولیدی", classCode: "902", unit1: "کیلوگرم", usage: "فروش", audience: "customer" },
    { item: "مواد اولیه", itemCode: "903", erpClass: "مواد اولیه", classCode: "903", unit1: "کیلوگرم", usage: "داخلی", audience: "internal" },
    { item: "قطعات یدکی", itemCode: "904", erpClass: "مواد اولیه", classCode: "903", unit1: "عدد", usage: "فروش", audience: "customer", note: "طبقه‌بندی ERP این ردیف مواد اولیه است؛ ردیف فروش قطعات یدکی در کاتالوگ زیر گروه قطعات می‌ماند." },
    { item: "بسته‌بندی", itemCode: "905", erpClass: "مواد اولیه", classCode: "903", unit1: "عدد", usage: "داخلی", audience: "internal", note: "در فهرست کالا، بسته‌بندی زیر مواد اولیه قرار دارد. این نگاشت ERP، دسته فروشگاهی نیست." }
  ],
  machinery: [
    { id: "chainsaw", name: "اره موتوری", search: "اره موتوری اره زنجیری chainsaw" },
    { id: "brush-cutter", name: "علف‌تراش", search: "علف تراش علف‌تراش brush cutter" },
    { id: "sprayer", name: "سمپاش", search: "سمپاش sprayer" },
    { id: "generator", name: "موتور برق", search: "موتور برق generator" },
    { id: "cultivator", name: "کولتیواتور", search: "کولتیواتور cultivator" },
    { id: "water-pump", name: "پمپ آب", search: "پمپ آب water pump" },
    { id: "diesel-generator", name: "دیزل ژنراتور", search: "دیزل ژنراتور diesel generator" }
  ]
};
