# تسک ۱۴ قرارداد مسیرها و فهرست کامپوننت‌ها

وضعیت: آماده برای وایرفریم و handoff

## مسیرهای پیشنهادی

```text
/
/category/:slug
/search?q=&category=&availability=&leadTime=
/product/:slug
/bulk-request
/request/success/:id
/track-request
/contact
```

## مسیر خرده

خانه یا جست‌وجو → دسته‌بندی → انتخاب محصول → انتخاب تعداد/مشخصات → مشاهده قیمت و زمان تأمین → ثبت درخواست خرید → تأیید اطلاعات تماس → ادامه در واتساپ/تلگرام یا پیگیری با کد درخواست.

اگر قیمت یا موجودی قطعی نیست، CTA نباید «خرید مستقیم» باشد و باید از عبارت‌های زیر استفاده شود:

- درخواست خرید
- بررسی موجودی
- ثبت سفارش تأمین

## مسیر عمده

CTA عمده یا صفحه محصول → فرم استعلام → محصول، مشخصات، تعداد و زمان موردنیاز → کانال ترجیحی پاسخ → ساخت Lead → کد پیگیری → ادامه گفتگو در واتساپ/تلگرام.

## فیلدهای فرم استعلام

- نام و نام شرکت.
- شماره تماس.
- محصول یا دسته موردنظر.
- مشخصات فنی.
- تعداد یا حجم تقریبی.
- شهر و مقصد.
- زمان موردنیاز.
- فایل یا لیست کالا در صورت نیاز.
- کانال ترجیحی پاسخ.

## وضعیت تأمین به‌عنوان کامپوننت مستقل

نام پیشنهادی: `SupplyStatus`

```text
in-stock
ready-to-ship
on-demand
quote-required
temporarily-unavailable
unknown
```

این کامپوننت باید در کارت محصول، صفحه محصول، فرم استعلام و CRM با متن یکسان استفاده شود.

## وضعیت‌های CTA محصول

| وضعیت | CTA اصلی |
|---|---|
| موجود و قیمت مشخص | درخواست خرید |
| موجودی نیازمند بررسی | بررسی موجودی |
| تأمین سفارشی | ثبت سفارش تأمین |
| عمده یا قیمت اختصاصی | استعلام عمده |
| ناموجود موقت | اطلاع‌رسانی هنگام تأمین |

## Component inventory

### Navigation

`Header`, `MobileHeader`, `Breadcrumb`, `Footer`, `StickyContactBar`

### Commerce

`ProductCard/Technical`, `ProductGrid`, `ProductGallery`, `ProductSelector`, `SpecTable`, `PriceStatus`, `SupplyStatus`, `QuantityField`, `RelatedProducts`

### Discovery

`SearchBar`, `FilterBar`, `FilterDrawer`, `SortMenu`, `ActiveFilterChip`, `EmptySearchState`

### Lead generation

`InquiryForm`, `ContactPreference`, `LeadSuccess`, `WhatsAppCTA`, `TelegramCTA`, `RequestTracking`

### CRM Lite

`LeadCard`, `LeadKanban`, `LeadTimeline`, `LeadFilters`, `FollowUpBadge`, `NotesPanel`

## حالت‌های لازم برای هر کامپوننت

`default`, `hover`, `focus`, `pressed`, `disabled`, `loading`, `error`, `empty`, `mobile`, `desktop`

## رویدادهای تحلیلی

```text
view_home
view_category
search_submitted
filter_applied
view_product
click_retail_cta
click_bulk_cta
click_whatsapp
click_telegram
inquiry_started
inquiry_submitted
lead_created
request_tracking_opened
```

## معیار پذیرش

- کاربر حداکثر با سه تعامل به محصول مناسب برسد.
- قیمت، وضعیت تأمین و زمان تقریبی در کارت و صفحه محصول هم‌خوان باشند.
- مسیر خرده و عمده از هم قابل تشخیص باشند.
- همه CTAهای اصلی در موبایل در دسترس باشند.
- فرم استعلام بدون ورود به CRM پیچیده قابل ثبت باشد.
- حالت محصول بدون تصویر، قیمت قطعی یا موجودی هم شفاف باشد.
