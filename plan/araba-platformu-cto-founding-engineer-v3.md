
# 🚗 Araba Marketplace Platformu — CTO + Founding Engineer Seviyesi Teknik Mimari ve Veri Tasarımı (V3)

**Doküman tipi:** Ürünleşebilir teknik blueprint  
**Amaç:** Sadece otomobil odaklı, güven ve karar desteği merkezli, yüksek ölçeklenebilir marketplace ürünü için başlangıçtan production’a uzanan teknik çerçeveyi tanımlamak  
**Kapsam:** Domain modeli, servis mimarisi, veri tasarımı, arama altyapısı, skor motorları, event sistemi, güven/fraud katmanı, medya işleme, observability, güvenlik, yayın akışı, roadmap, riskler

---

# 0. Yönetici Özeti

Bu ürün klasik bir ilan sitesi olarak tasarlanmamalıdır. Temel tez:

> Kullanıcı “çok ilan” değil, “doğru arabayı güvenle ve hızlıca bulmak” ister.

Bu nedenle sistemin çekirdeği 4 katmandan oluşur:

1. **Listing platformu**  
   İlan oluşturma, medya, satıcı, iletişim, favori, kayıtlı arama, bildirimler.

2. **Structured vehicle data platformu**  
   Araç özelliklerini serbest metin değil normalize edilmiş veri modeliyle tutan yapı.

3. **Decision intelligence platformu**  
   Fiyat skoru, güven skoru, ilan kalite skoru, benzer araç, karşılaştırma, uyarılar.

4. **Trust & compliance platformu**  
   Satıcı doğrulama, fraud detection, ilan tutarsızlıkları, raporlama, moderasyon.

Bu yapı sayesinde ürün; Sahibinden benzeri genel pazar yeri yaklaşımından ayrışır ve AutoScout24 / mobile.de / DubiCars / AutoUncle’daki güçlü yönleri daha derin ve modüler biçimde birleştirir.

---

# 1. Ürün-İş Tezi ve Teknik Yansımaları

## 1.1 Ürün tezi
Kullanıcıların ana problemleri:
- doğru filtrelerle aradığını bulamama
- güvenilir ilanı ayırt edememe
- piyasa değerini anlayamama
- favori/karşılaştırma/takip süreçlerinin zayıf olması
- uygulamanın yavaş, dağınık ve state kaybettiren yapıda olması

## 1.2 Teknik sonuçlar
Bu problemler doğrudan mimari tercihleri etkiler:

| Problem | Teknik ihtiyaç |
|---|---|
| Derin filtreleme | Normalize veri modeli + güçlü search index |
| Güven eksikliği | Verification, fraud, moderation servisleri |
| Fiyat değerlendirme | Pricing engine + comparable pipeline |
| Takip ve bildirim | Event-driven notification sistemi |
| Yavaşlık / karmaşa | Cache, edge delivery, state persistence, sade API tasarımı |

## 1.3 Sistem hedefleri
- Mobil-first ama web uyumlu
- Search latency P95 < 300ms
- İlan detay açılışı P95 < 500ms
- Medya yükleme başarısı > %99.5
- Bildirim teslimat oranı > %95
- Fraud yakalama oranı sürekli artan ML/rule hibriti
- Backoffice ile moderasyon ve operasyon desteklenebilir

---

# 2. Mimari Prensipler

## 2.1 Başlangıç prensibi
İlk günden “microservice her şey” yapmak yerine, **modüler monolith + event outbox** ile başlanmalı; domain karmaşıklığı ve ekip büyüdükçe servis ayrıştırılmalıdır.

## 2.2 Prensipler
- **API-first**
- **Schema-first contracts**
- **Event-driven side effects**
- **Search is a projection, not source of truth**
- **OLTP ve analytics ayrımı**
- **Strong auditability**
- **Idempotent write operations**
- **Soft delete + reversible moderation**
- **Feature flags her kritik deneyimde**
- **Domain ownership net**

## 2.3 Kaynak gerçekliği
Erken aşamada ekip küçük olacağı için:
- tek repo veya kontrollü monorepo
- tek ana relational database cluster
- event bus ile gevşek bağlı ek modüller
- search ve object storage ayrık

---

# 3. Yüksek Seviye Mimari

## 3.1 Katmanlar

### Client Layer
- iOS / Android uygulama
- Responsive web app
- Admin / Moderation backoffice
- Internal operations dashboard

### Edge Layer
- CDN
- WAF
- API Gateway / BFF
- Image transformation CDN

### Application Layer
- Auth & Identity
- User Profile
- Seller / Dealer
- Vehicle Catalog
- Listing
- Media
- Search
- Saved Search & Favorites
- Compare
- Messaging / Lead
- Pricing Intelligence
- Trust & Verification
- Fraud & Moderation
- Notification
- Analytics Ingestion
- Admin Ops

### Data Layer
- PostgreSQL
- Redis
- OpenSearch / Elasticsearch
- Object Storage (S3 compatible)
- Kafka / Redpanda / NATS JetStream
- Data warehouse (BigQuery / ClickHouse / Snowflake)
- Feature store (ileride)

---

# 4. Önerilen Teknoloji Yığını

## 4.1 Frontend
- **Mobile:** React Native + TypeScript  
  Neden: hızlı iterasyon, ortak component mantığı, erken ekip verimliliği
- **Web:** Next.js
- **Admin:** Next.js / React + component library

## 4.2 Backend
- **Primary language:** TypeScript (NestJS) veya Go  
  Öneri:
  - hızlı ürün geliştirme için NestJS
  - search-heavy / performance-critical alanlarda Go servisleri sonradan
- **API:** REST + gerektiğinde GraphQL BFF
- **Async:** Kafka / Redpanda

## 4.3 Data
- PostgreSQL
- Redis
- OpenSearch
- S3 + image/video processing pipeline

## 4.4 Infra
- Docker
- Kubernetes (erken aşamada ops kapasitesi yoksa ECS/Fargate)
- Terraform
- GitHub Actions / GitLab CI

## 4.5 Observability
- OpenTelemetry
- Prometheus + Grafana
- Loki / ELK
- Sentry

---

# 5. Domain Sınırları (Bounded Contexts)

## 5.1 Identity Context
Sorumluluk:
- kullanıcı hesabı
- giriş yöntemleri
- device sessions
- MFA
- authz claims

## 5.2 User & Profile Context
- kullanıcı tercihleri
- favori markalar
- notification preferences
- saved searches
- consent yönetimi

## 5.3 Seller Context
- bireysel satıcı
- galeri / bayi
- kurumsal satıcı
- satıcı doğrulama
- satıcı reputasyonu

## 5.4 Vehicle Catalog Context
- marka
- model
- kasa
- jenerasyon
- trim/paket
- motor
- yakıt
- şanzıman
- donanım sözlüğü
- EV meta alanları

Bu context çok kritik; ilanların filtrelenebilirliği bunun kalitesine bağlıdır.

## 5.5 Listing Context
- ilan draft
- yayınlama
- fiyat
- açıklama
- durum
- expiry
- relist
- promoted states

## 5.6 Media Context
- fotoğraf
- video
- 360 tur
- image moderation
- processing states

## 5.7 Search Context
- listing projections
- filters
- relevance ranking
- query suggestions

## 5.8 Intelligence Context
- price score
- market range
- comparable listings
- recommendation
- anomaly flags

## 5.9 Trust & Fraud Context
- verification
- scam detection
- mismatch checks
- abuse reports
- moderation queue

## 5.10 Engagement Context
- message/lead
- call intent
- favorite
- compare
- alerts
- saved search

## 5.11 Notification Context
- push
- email
- in-app
- batched digests
- delivery events

## 5.12 Analytics Context
- event ingestion
- funnel
- attribution
- experiment analysis

---

# 6. Çekirdek Veri Modeli

Aşağıdaki model production düşünülerek hazırlanmıştır. Her şey tek tabloda tutulmamalı; normalize core + denormalized projections birlikte kullanılmalıdır.

---

# 7. Ana Entity Listesi

## 7.1 users
Platform hesabı.

Temel alanlar:
- id (uuid)
- email
- phone_e164
- password_hash / auth_provider
- status
- is_phone_verified
- is_email_verified
- last_login_at
- created_at
- updated_at
- deleted_at

## 7.2 user_profiles
- user_id
- first_name
- last_name
- avatar_url
- city_id
- preferred_language
- preferred_theme
- marketing_consent
- privacy_version_accepted_at

## 7.3 user_devices
- id
- user_id
- device_type
- app_version
- push_token
- locale
- last_seen_at

## 7.4 sellers
Her user seller olmayabilir. Bu tablo ilan veren yapıyı tutar.
- id
- owner_user_id
- seller_type (individual, dealer, corporate)
- display_name
- slug
- bio
- city_id
- is_verified
- rating_avg
- rating_count
- response_rate
- response_time_median_sec
- active_listing_count

## 7.5 dealer_profiles
Dealer-specific alanlar.
- seller_id
- legal_name
- tax_number
- license_number
- website
- address_text
- geo_point
- opening_hours_json
- showroom_count
- has_trade_in
- has_financing
- has_delivery

## 7.6 seller_verifications
- id
- seller_id
- verification_type (phone, email, id, tax, address, trade_license)
- status
- verified_at
- provider
- metadata_json
- expires_at

## 7.7 brands
- id
- name
- slug
- country_code
- logo_url
- is_active

## 7.8 models
- id
- brand_id
- name
- slug
- segment
- body_type_default
- production_start_year
- production_end_year

## 7.9 generations
- id
- model_id
- name
- code
- start_year
- end_year

## 7.10 trims
- id
- generation_id
- name
- market_region
- start_year
- end_year
- normalized_features_json (baseline)

## 7.11 engines
- id
- generation_id
- engine_code
- displacement_cc
- fuel_type
- cylinder_count
- horsepower_hp
- torque_nm
- drivetrain_default
- transmission_default
- emission_standard
- battery_capacity_kwh
- wltp_range_km

## 7.12 features
Normalize özellik sözlüğü.
- id
- category (safety, comfort, infotainment, exterior, performance, ev)
- name
- slug
- value_type (boolean, number, enum, text)
- unit
- is_filterable

## 7.13 cities
- id
- country_code
- name
- region_id
- lat
- lng

## 7.14 districts
- id
- city_id
- name
- lat
- lng

## 7.15 vehicles
İlan ile araç birebir bağlanmak zorunda değil; aynı araç yeniden listelenebilir. Bu tablo fiziksel araç varlığını temsil eder.
- id
- vin_hash
- plate_hash
- brand_id
- model_id
- generation_id
- trim_id
- engine_id
- year
- first_registration_date
- body_type
- transmission
- fuel_type
- drivetrain
- exterior_color
- interior_color
- odometer_km
- seat_count
- door_count
- created_at

## 7.16 vehicle_features
- vehicle_id
- feature_id
- bool_value
- number_value
- enum_value
- text_value

## 7.17 vehicle_condition_reports
- id
- vehicle_id
- source (seller, expert_report, partner_api, manual_review)
- report_type (damage, appraisal, expert)
- status
- report_date
- report_url
- raw_payload_json

## 7.18 vehicle_damage_panels
Panel bazlı boya/değişen bilgisi.
- id
- condition_report_id
- panel_name (hood, roof, trunk, left_front_door ...)
- condition_type (original, painted, local_painted, changed, repaired)
- severity
- note

## 7.19 vehicle_history_events
- id
- vehicle_id
- event_type (inspection, ownership_change, damage_claim, service_record, import)
- event_date
- source
- confidence_score
- metadata_json

## 7.20 listings
İlanın ana kaydı.
- id
- seller_id
- vehicle_id
- title
- description
- price_amount
- price_currency
- negotiable
- listing_type (sale, urgent_sale, auction_future_optional)
- status (draft, pending_review, active, rejected, paused, sold, expired, deleted)
- moderation_status
- published_at
- expires_at
- sold_at
- city_id
- district_id
- geo_point
- source_channel
- contact_mode (call, message, both)
- visibility_score
- quality_score
- trust_score
- price_score
- fraud_score
- created_at
- updated_at

## 7.21 listing_snapshots
Zaman içinde ilan değişiklikleri.
- id
- listing_id
- version_no
- price_amount
- description_hash
- feature_hash
- media_hash
- state_json
- created_at

## 7.22 listing_media
- id
- listing_id
- media_type (image, video, tour360)
- storage_key
- order_no
- width
- height
- duration_sec
- checksum
- moderation_status
- processing_status
- perceptual_hash
- blurhash
- created_at

## 7.23 listing_feature_overrides
İlan bazında trim default’unu override eden özellikler.
- listing_id
- feature_id
- bool_value
- number_value
- enum_value
- text_value
- source

## 7.24 listing_boosts
- id
- listing_id
- boost_type
- starts_at
- ends_at
- priority_weight
- payment_id

## 7.25 favorites
- id
- user_id
- listing_id
- folder_id
- note
- created_at

## 7.26 favorite_folders
- id
- user_id
- name
- is_shared
- share_token
- created_at

## 7.27 compare_sets
- id
- user_id
- name
- created_at

## 7.28 compare_set_items
- compare_set_id
- listing_id
- added_at

## 7.29 saved_searches
- id
- user_id
- name
- query_json
- alert_enabled
- alert_frequency
- last_alert_at
- created_at

## 7.30 leads
İlana gösterilen ilgi aksiyonları.
- id
- listing_id
- user_id nullable
- seller_id
- lead_type (call_click, message, whatsapp, test_drive_request, financing_request)
- source
- created_at

## 7.31 message_threads
- id
- listing_id
- buyer_user_id
- seller_user_id
- status
- last_message_at

## 7.32 messages
- id
- thread_id
- sender_user_id
- message_type
- body
- moderation_status
- created_at
- read_at

## 7.33 reports
Kullanıcı şikayetleri.
- id
- reporter_user_id
- target_type (listing, seller, message)
- target_id
- reason_code
- comment
- status
- created_at
- resolved_at

## 7.34 moderation_cases
- id
- target_type
- target_id
- reason_code
- severity
- queue_name
- assigned_to
- status
- decision
- created_at
- resolved_at

## 7.35 price_analyses
- listing_id
- market_min
- market_median
- market_max
- model_confidence
- comparable_count
- price_score
- label
- last_computed_at
- explanation_json

## 7.36 trust_analyses
- listing_id
- trust_score
- seller_score
- completeness_score
- anomaly_score
- report_risk_score
- explanation_json
- last_computed_at

## 7.37 notification_preferences
- user_id
- push_enabled
- email_enabled
- price_drop_enabled
- saved_search_enabled
- message_enabled
- digest_frequency

## 7.38 notifications
- id
- user_id
- type
- channel
- payload_json
- status
- scheduled_at
- sent_at
- read_at

## 7.39 audit_logs
- id
- actor_type
- actor_id
- action
- target_type
- target_id
- old_value_json
- new_value_json
- ip_address
- user_agent
- created_at

---

# 8. İlişkiler ve Cardinality

Önemli ilişkiler:
- user 1..n sellers (genelde 1 ama mimari esnek olmalı)
- seller 1..n listings
- listing 1..1 vehicle
- vehicle n..m features
- listing 1..n media
- listing 1..n snapshots
- listing 1..1 latest price_analysis
- listing 1..1 latest trust_analysis
- user 1..n favorites
- user 1..n saved_searches
- listing 1..n leads
- seller 1..n verifications
- listing 1..n reports / moderation_cases

---

# 9. Veritabanı Tasarım İlkeleri

## 9.1 OLTP için PostgreSQL
Sebep:
- güçlü transaction
- relational integrity
- JSONB ile kontrollü esneklik
- partial indexes
- GIS desteği (PostGIS opsiyonel)

## 9.2 JSONB nerede kullanılmalı?
Sınırlı ve bilinçli:
- third-party raw payload
- explanation fields
- temporary metadata
- schema evolution gereken düşük-kritik alanlar

JSONB ile temel domain kolonlarını saklamamak gerekir.

## 9.3 Versioning
İlan güncellemeleri kritik olduğu için `listing_snapshots` zorunlu. Kullanıcı şu soruların cevabını alabilmeli:
- fiyat kaç kere değişti?
- açıklama değişti mi?
- fotoğraflar değişti mi?
- ilan tekrar yayınlandı mı?

---

# 10. Search Mimarisi

Search sistemi source of truth değildir; projection’dır.

## 10.1 Neden ayrı search engine?
Çünkü kullanıcı:
- çoklu filtre
- facet counts
- range filtering
- tam metin + structured hybrid search
- geo search
- hızlı sort
ister.

Bu ihtiyaç relational DB üzerinde ölçekli ve hızlı karşılanmaz.

## 10.2 Search document yapısı

Her aktif listing için tek document:

```json
{
  "listing_id": "uuid",
  "seller_id": "uuid",
  "seller_type": "dealer",
  "seller_verified": true,
  "brand": "BMW",
  "model": "320i",
  "generation": "G20",
  "trim": "M Sport",
  "year": 2020,
  "km": 45000,
  "price": 1950000,
  "currency": "TRY",
  "city": "Istanbul",
  "district": "Kadikoy",
  "location": {"lat": 40.98, "lon": 29.05},
  "fuel": "petrol",
  "transmission": "automatic",
  "body_type": "sedan",
  "drivetrain": "rwd",
  "horsepower_hp": 184,
  "torque_nm": 300,
  "battery_kwh": null,
  "wltp_range_km": null,
  "tramer_amount": 0,
  "damage_panels": ["left_front_fender:painted"],
  "features": ["carplay", "sunroof", "adaptive_cruise"],
  "has_expert_report": true,
  "has_video": true,
  "media_count": 18,
  "price_score": 86,
  "trust_score": 91,
  "quality_score": 88,
  "boost_weight": 0,
  "published_at": "2026-03-18T10:00:00Z",
  "updated_at": "2026-03-18T12:00:00Z"
}
```

## 10.3 Index stratejisi
- keyword fields: brand, model, seller_type
- numeric: price, km, year, hp, torque
- nested veya flattened: features, panel conditions
- geo_point: location
- text fields: title, description
- suggestion fields: autocomplete, model synonyms

## 10.4 Facet mantığı
Kullanıcı filtreleri uyguladıkça:
- marka
- model
- yakıt
- şanzıman
- şehir
- satıcı tipi
- fiyat aralıkları
- km aralıkları
sayımları dönmeli.

## 10.5 Synonym / normalization
Türkiye özelinde:
- “boyasız”, “orijinal”
- “sunroof”, “cam tavan”
- “geri görüş”, “arka kamera”
- “otomatik”, “auto”
- “hatasız”, “kusursuz” (riskli metin işareti)

Bu sözlük search quality için kritik.

---

# 11. Filtre Sistemi Tasarımı

## 11.1 Filtre mimarisi
UI filter config ile backend filter contract ayrılmalı. Böylece:
- mobil/web aynı filter schema’yı kullanır
- A/B test yapılabilir
- filtreler dinamik açılıp kapatılabilir

## 11.2 Örnek filter schema

```json
{
  "brand_ids": ["bmw"],
  "model_ids": ["3-series"],
  "body_types": ["sedan", "wagon"],
  "seller_types": ["individual"],
  "city_ids": ["34", "16"],
  "radius_km": 200,
  "price": {"min": 1000000, "max": 2500000},
  "km": {"min": 0, "max": 100000},
  "year": {"min": 2018, "max": 2024},
  "fuel_types": ["petrol", "hybrid"],
  "transmissions": ["automatic"],
  "drivetrains": ["awd", "rwd"],
  "horsepower": {"min": 150, "max": 350},
  "torque_nm": {"min": 250, "max": 700},
  "tramer": {"max": 0},
  "panel_rules": [
    {"panel": "roof", "allowed": ["original"]},
    {"panel": "hood", "allowed": ["original", "local_painted"]}
  ],
  "required_features": ["carplay", "adaptive_cruise"],
  "excluded_flags": ["taxi_exit", "heavy_damage"],
  "expert_report_required": true,
  "verified_seller_required": true
}
```

## 11.3 Çoklu şehir + radius
Kullanıcı ihtiyaçlarına göre iki mode:
- `selected_cities[]`
- `origin_geo + radius_km`

Aynı anda kullanılabilir; bu durumda OR/AND mantığı ürün kararıyla netleşmeli. Öneri:
- Varsayılan OR: seçilen şehirler veya radius alanı

## 11.4 Panel bazlı hasar filtresi
Bu ürünün kritik ayrıştırıcılarından biridir.
Panel seti standardize edilmeli:
- front_bumper
- hood
- roof
- trunk
- left_front_door
- right_front_fender ...

Her panel için enum:
- original
- local_painted
- painted
- changed
- repaired
- unknown

---

# 12. Ranking / Sıralama Motoru

Kullanıcı “en alakalı” sonucu görmeli; ama bu sadece text relevance değil.

## 12.1 Ana ranking sinyalleri
- query relevance
- filter match strictness
- freshness
- price score
- trust score
- quality score
- seller quality
- geo relevance
- boost / paid promotions
- behavioral CTR/CVR

## 12.2 Önerilen ranking formülü (basitleştirilmiş)

```text
ranking_score =
  0.25 * relevance_score +
  0.15 * freshness_score +
  0.15 * price_score_norm +
  0.15 * trust_score_norm +
  0.10 * quality_score_norm +
  0.10 * seller_reputation_norm +
  0.05 * geo_score +
  0.05 * engagement_score +
  paid_boost_modifier
```

## 12.3 Guardrails
- paid boost organik kaliteyi tamamen ezmemeli
- fraud/high-risk listings ceiling uygulanmalı
- çok kötü price score alanlar üstte agresif gösterilmemeli
- moderation pending listing asla görünmemeli

## 12.4 Sort seçenekleri
- Önerilen
- Fiyat artan
- Fiyat azalan
- KM artan
- En yeni
- En iyi fiyat
- En yüksek güven
- En yakın konum
- En düşük km / yıl dengesi (özel skor)

---

# 13. Fiyat Zekâsı (Pricing Intelligence Engine)

Bu katman ürünün stratejik çekirdeğidir.

## 13.1 Amaç
Kullanıcıya şu soruların cevabını vermek:
- Bu araç pahalı mı?
- Emsallere göre iyi mi?
- Neden iyi/kötü?
- Benzerleri hangi aralıkta?

## 13.2 Girdi özellikleri
- brand/model/generation/trim
- year
- km
- fuel
- transmission
- body_type
- city/region
- damage/tramer
- seller_type
- features
- market liquidity
- seasonality
- days on market

## 13.3 Model yaklaşımı
Aşama 1:
- rule + comparable median

Aşama 2:
- gradient boosting regression

Aşama 3:
- explainable pricing service + confidence intervals

## 13.4 Comparable seçimi
Comparable havuzunda:
- aynı brand/model
- yakın year band
- km tolerance
- benzer trim/engine
- hasar seviyesi benzer
- bölge benzerliği
- son N gün aktif ilan + satılmış ilan varsa daha iyi

## 13.5 Output
- market_min
- market_median
- market_max
- price_score (0-100)
- label (çok iyi / iyi / piyasa / pahalı / aşırı pahalı)
- confidence
- explanation bullets

## 13.6 UI açıklama örneği
- Benzer 48 ilan baz alınarak hesaplandı
- Aynı model/yıl ortalamasından %7 daha düşük
- KM seviyesi ortalamanın altında
- Satıcı doğrulaması pozitif etki ediyor
- Hasar kaydı olmadığından değer korunuyor

---

# 14. Güven Skoru (Trust Engine)

## 14.1 Amaç
Sadece satıcıya değil, ilanın kendisine güveni skorlamak.

## 14.2 Sinyaller
### Satıcı kaynaklı
- phone verified
- id verified
- tax verified
- geçmiş ilan sayısı
- rapor/şikayet oranı
- response rate
- satış geçmişi
- tutarlı ilan geçmişi

### İlan kaynaklı
- zorunlu alan tamlığı
- açıklama kalitesi
- fotoğraf sayısı / kalitesi
- video / 360 varlığı
- ekspertiz raporu
- panel hasar bilgisi
- fiyat anomalisi
- metin-tablo çelişkisi
- duplicate detection

### Sistem/fraud kaynaklı
- IP/device risk
- çok hızlı tekrar ilan
- sahte medya
- sürekli fiyat manipülasyonu
- abusive messaging
- blacklisted plate/vin patterns

## 14.3 Çıktılar
- trust_score (0-100)
- risk_level
- flags[]
- explanation[]

## 14.4 Trust score guardrails
Aşağıdaki durumlarda ceiling uygulanır:
- id doğrulama yoksa max 85
- şüpheli duplicate varsa max 70
- fiyat anomali yüksekse max 65
- pending moderation varsa public olmamalı

---

# 15. İlan Kalite Skoru (Quality Score)

Trust ile karışmamalı. Quality, ilanın ne kadar iyi sunulduğunu ölçer.

## Sinyaller
- fotoğraf sayısı
- fotoğraf çözünürlüğü
- blur detection
- açıklama uzunluğu
- açıklama özgünlüğü
- kritik alanların doluluğu
- donanım alanlarının doldurulması
- video varlığı
- ekspertiz ekli olması
- lokasyon doğruluğu

## Kullanım alanları
- publish sırasında tavsiye
- ranking’te hafif katkı
- satıcı dashboard’unda kalite önerileri

---

# 16. Fraud & Moderation Sistemi

## 16.1 Fraud türleri
- sahte fiyat
- clickbait başlık
- yanlış paket bilgisi
- hasarsız yazıp tramer gizlemek
- duplicate listing
- stock photo kullanımı
- çalıntı fotoğraf
- kimlik/satıcı sahteciliği
- kapora dolandırıcılığı
- spam mesaj

## 16.2 Detection yaklaşımı
### Rule-based
- aşırı düşük fiyat threshold
- çok kısa sürede çok ilan
- aynı foto ile çok ilan
- description blacklist
- dış iletişim zorlaması
- risky keyword matching

### ML / heuristic
- image duplicate clustering
- text anomaly scoring
- seller behavior anomaly
- fraud graph analysis

## 16.3 Moderation kuyrukları
- pricing anomaly queue
- identity risk queue
- content moderation queue
- duplicate queue
- user report queue

## 16.4 Moderation kararları
- approve
- reject
- request_more_info
- soft_hide
- shadow_limit
- suspend_seller
- escalate_legal

## 16.5 Auditability
Her karar `audit_logs` ve `moderation_cases` içinde izlenebilir olmalı.

---

# 17. İlan Yayınlama Akışı (Write Path)

## 17.1 Draft oluşturma
1. seller auth
2. draft oluştur
3. vehicle basics seç
4. media upload
5. features + damage + expert report
6. price / contact options
7. publish request

## 17.2 Publish pipeline
- request validation
- anti-abuse checks
- media status check
- quality pre-score
- fraud pre-check
- moderation gating
- active listing creation
- search indexing event
- notification/event emission

## 17.3 Event akışı
`listing.publish.requested`
→ `listing.validated`
→ `listing.media.ready`
→ `listing.fraud.checked`
→ `listing.moderation.completed`
→ `listing.published`
→ `search.document.upsert`
→ `pricing.recompute.requested`
→ `trust.recompute.requested`

## 17.4 Neden event-driven?
- search projection async güncellenir
- pricing / trust ağır işlemler ayrılır
- notification side effects ayrık yürür

---

# 18. Medya Pipeline

## 18.1 İhtiyaçlar
- güvenilir upload
- arka planda resize
- webp/avif türetme
- thumbnail
- blur/NSFW/basic moderation
- duplicate image detection
- perceptual hash
- EXIF stripping
- watermark opsiyonu

## 18.2 Akış
1. client presigned URL alır
2. raw upload object storage’a gider
3. upload completed event
4. media processor consume eder
5. derivatives üretir
6. moderation checks
7. listing_media update
8. ready event emit edilir

## 18.3 Depolama düzeni
- raw/
- processed/original-normalized/
- processed/thumb/
- processed/web/
- processed/mobile/
- video/transcoded/

## 18.4 Kritik karar
Media DB’de binary tutulmamalı; sadece metadata + storage key tutulmalı.

---

# 19. Bildirim Sistemi

## 19.1 Bildirim tipleri
- message received
- price dropped
- saved search new match
- favorite car updated
- listing status changed
- verification result
- moderation request
- compare reminder

## 19.2 Delivery kanalları
- push
- email
- in-app
- digest

## 19.3 Event kaynakları
- listing.price_changed
- saved_search.match_found
- message.created
- listing.status_changed
- compare.watch_triggered

## 19.4 Anti-spam
- batching
- quiet hours
- category caps
- deduping
- user preferences

---

# 20. Favori / Kayıtlı Arama / Takip Sistemi

Bu alan retention için kritik.

## 20.1 Favori olayları
- ilan favorilendi
- favori klasöre taşındı
- favori notu eklendi
- favori araç fiyatı değişti
- favori araç satıldı
- favori araç delist edildi
- benzer araç önerildi

## 20.2 Saved search akışı
`query_json` saklanır. Periyodik matcher servisi:
- yeni listing geldiğinde incremental match
veya
- schedule ile batch evaluate

## 20.3 Ölçekleme
Yeni ilanlarda tüm saved searches’i brute force çalıştırmak pahalı olabilir.
Aşama 1:
- batch polling
Aşama 2:
- inverted saved search indexing

---

# 21. Compare Sistemi

## 21.1 Compare mantığı
Normalize alanlar karşılaştırılmalı:
- price
- km
- year
- hp
- torque
- fuel
- transmission
- body
- dimensions
- trunk
- features
- damage
- price score
- trust score

## 21.2 Teknik tasarım
Compare özel tablo yeterli; sonuç runtime compose edilir.
Cache:
- compare set hash → rendered summary cache

---

# 22. Mesajlaşma / Lead Sistemi

## 22.1 MVP kararı
Tam gerçek zamanlı chat yerine ilk aşamada:
- thread-based messaging
- websocket opsiyonel
- push notifications

## 22.2 Güvenlik
- phone/email masking
- abusive text moderation
- scam link detection
- rate limiting

## 22.3 Alternatif
Bazı pazarlarda sadece lead form + call tracking ile başlanabilir.

---

# 23. Backoffice / Admin Gereksinimleri

Bu ürün backoffice’siz yönetilemez.

## 23.1 Moderation panel
- queue list
- listing detail with history
- seller graph
- media preview
- actions
- notes
- audit timeline

## 23.2 Seller ops
- verification status
- document review
- suspensions
- reputation view

## 23.3 Pricing ops
- outlier dashboard
- comparable debug
- model confidence monitor

## 23.4 Support ops
- user account lookup
- listing restore
- merge duplicates
- message/report investigation

## 23.5 Feature flag ops
- rollout
- cohort targeting
- kill switch

---

# 24. API Tasarımı

## 24.1 Genel prensip
- public API’ler sade
- admin/internal API’ler ayrı namespace
- idempotency keys write işlemlerinde zorunlu
- pagination cursor-based
- ETag / conditional GET detay sayfalarında opsiyonel

## 24.2 Örnek public endpoint seti

### Auth
- `POST /v1/auth/register`
- `POST /v1/auth/login`
- `POST /v1/auth/refresh`
- `POST /v1/auth/logout`

### Catalog
- `GET /v1/catalog/brands`
- `GET /v1/catalog/models?brand_id=`
- `GET /v1/catalog/trims?model_id=&year=`
- `GET /v1/catalog/features`

### Search
- `POST /v1/search/listings`
- `GET /v1/search/suggestions?q=`
- `GET /v1/search/facets?...`

### Listings
- `POST /v1/listings/drafts`
- `PATCH /v1/listings/{id}`
- `POST /v1/listings/{id}/publish`
- `GET /v1/listings/{id}`
- `POST /v1/listings/{id}/favorite`
- `POST /v1/listings/{id}/report`

### Media
- `POST /v1/media/presign`
- `POST /v1/media/complete`
- `DELETE /v1/media/{id}`

### Saved searches
- `POST /v1/saved-searches`
- `GET /v1/saved-searches`
- `PATCH /v1/saved-searches/{id}`

### Compare
- `POST /v1/compare-sets`
- `POST /v1/compare-sets/{id}/items`
- `GET /v1/compare-sets/{id}`

### Messaging
- `POST /v1/listings/{id}/threads`
- `POST /v1/threads/{id}/messages`
- `GET /v1/threads`

## 24.3 Internal event consumers
- pricing-worker
- trust-worker
- search-projector
- notification-worker
- moderation-worker

---

# 25. Event-Driven Mimari Detayı

## 25.1 Neden gerekli?
Çünkü her write işleminde sync her şeyi yapmak:
- latency artırır
- coupling yaratır
- retry yönetimini zorlaştırır

## 25.2 Event standard
Her event:
- event_id
- event_type
- aggregate_type
- aggregate_id
- occurred_at
- version
- payload
- correlation_id
- causation_id

## 25.3 Önemli eventler
- user.registered
- seller.verified
- listing.created
- listing.updated
- listing.published
- listing.price_changed
- listing.media_ready
- listing.reported
- listing.sold
- listing.expired
- saved_search.created
- message.created
- moderation.case_opened
- pricing.analysis_completed
- trust.analysis_completed

## 25.4 Outbox pattern
Transactional outbox şarttır:
- DB write + outbox aynı transaction
- relay worker event bus’a yazar
- consumer idempotent olur

---

# 26. Cache Stratejisi

## 26.1 Redis kullanım alanları
- session / token blacklist
- search result cache kısa TTL
- listing detail fragment cache
- compare summary cache
- catalog lookup cache
- rate limiting counters

## 26.2 Cache kuralları
- source of truth değil
- kısa TTL
- event ile selective invalidation
- stampede protection

## 26.3 Caching dikkat
Personalized arama sonuçları aşırı agresif cachelenmemeli.

---

# 27. Analytics ve Veri Ambarı

## 27.1 Event taxonomy
- app_opened
- search_performed
- filter_applied
- listing_opened
- favorite_added
- compare_started
- message_sent
- call_clicked
- saved_search_created
- notification_opened
- report_submitted

## 27.2 Neden ayrı analytics hattı?
OLTP’ye analitik yük bindirilmemeli.

## 27.3 Warehouse kullanım alanları
- funnel analysis
- cohort retention
- listing quality dashboards
- seller performance
- ranking experiments
- pricing model training

## 27.4 Reverse ETL / internal use
İleride yüksek değerli kullanıcı segmentleri notification engine’e aktarılabilir.

---

# 28. Güvenlik ve Compliance

## 28.1 Auth
- JWT access + refresh
- device-bound refresh tokens
- MFA high-risk işlemlerde

## 28.2 Yetkilendirme
RBAC:
- user
- seller
- dealer_admin
- moderator
- support_agent
- super_admin

## 28.3 Data privacy
- PII kolonlarını sınırlı erişim
- encryption at rest
- encryption in transit
- audit log
- right to deletion / anonymization flows

## 28.4 Abuse prevention
- login rate limit
- message rate limit
- listing publish limit
- IP reputation
- device fingerprint

## 28.5 Content safety
- external links scanning
- profanity/abuse filters
- suspicious payment language detection

---

# 29. Performans Hedefleri

## 29.1 P95 hedefleri
- Search results: < 300ms
- Listing detail API: < 500ms
- Favorite toggle: < 150ms
- Draft save: < 250ms
- Publish request accept: < 400ms (async completion later)
- Image upload init: < 150ms

## 29.2 En pahalı işlemler
- pricing recompute
- trust recompute
- image processing
- saved search matching
- search reindexing bulk

Bunlar async olmalı.

---

# 30. Ölçeklenebilirlik Stratejisi

## 30.1 Başlangıç ölçeği
- 100k aktif ilan
- günlük 10k yeni ilan
- aylık milyonlarca arama

## 30.2 Orta ölçek
- search cluster shard planning
- read replicas
- media CDN optimization
- queue partitioning

## 30.3 Yüksek ölçek
- listing projections multi-region
- dedicated pricing pipelines
- stream processing
- model serving infra

---

# 31. Deploy / Release Stratejisi

## 31.1 Ortamlar
- local
- dev
- staging
- prod

## 31.2 Release
- trunk-based development
- feature flags
- canary deployments
- rollback hazır
- DB migrations backward compatible

## 31.3 Migration prensibi
Expand → Migrate → Contract  
Tek adımda destructive migration yapılmamalı.

---

# 32. Test Stratejisi

## 32.1 Test katmanları
- unit tests
- contract tests
- integration tests
- e2e critical flows
- load tests
- search relevance evaluation
- data quality tests

## 32.2 Kritik e2e senaryolar
- kullanıcı kayıt olur
- saved search oluşturur
- satıcı ilan draft oluşturur
- medya yükler
- publish eder
- ilan search’te görünür
- fiyat düşer
- favori kullanıcı bildirim alır
- report açılır
- moderation aksiyonu uygulanır

---

# 33. SRE / Observability

## 33.1 Golden signals
- latency
- traffic
- errors
- saturation

## 33.2 Domain metrics
- publish success rate
- media processing failure rate
- search zero-result rate
- price-score coverage
- trust-score coverage
- moderation SLA
- notification delivery rate

## 33.3 Alerting
- search P95 spike
- publish failure > threshold
- message spam anomaly
- duplicate detection spike
- media queue lag
- event bus lag
- warehouse ingestion lag

---

# 34. Veri Kalitesi ve Catalog Yönetimi

Bu ürünün kaderini belirleyen alanlardan biri catalog kalitesidir.

## 34.1 Sorun
Türkiye ve benzeri pazarlarda kullanıcı serbest metinle:
- yanlış paket
- yanlış model
- yanlış güç
- eksik donanım
girebilir.

## 34.2 Çözüm
- catalog-assisted listing creation
- VIN decode partner entegrasyonu (mümkünse)
- model/trim suggestion engine
- inconsistent combination validator  
  Örn: belirli modelde olmayan motor + paket kombinasyonu

## 34.3 Data governance
- admin catalog editor
- alias/synonym manager
- deprecated trim merge
- versioned catalog

---

# 35. Tavsiye Motoru (Recommendation)

MVP’de şart değil ama temel tasarım düşünülmeli.

## 35.1 Kullanım alanları
- “Bu ilanı beğendiysen şunlara bak”
- favorilere göre benzer araçlar
- bütçeye göre alternatifler
- düşük km / iyi fiyat alternatifleri

## 35.2 Yaklaşım
Aşama 1:
- content-based similarity

Aşama 2:
- collaborative + content hybrid

---

# 36. Boş Durumlar ve Edge Cases

## 36.1 No results
Sadece “sonuç yok” demek yerine:
- filtre fazla dar olabilir
- yakın şehirleri ekle
- bütçeyi %10 artır
- km sınırını gevşet
- expert report zorunluluğunu kaldır öner

## 36.2 Missing data
- trust score ceiling
- kullanıcıya “bilgi eksik” rozeti
- ranking penalty

## 36.3 Suspicious data
- görünür uyarı
- manual review queue
- contact limitation opsiyonu

## 36.4 Deleted / sold listing
- tombstone page
- benzer ilan önerileri
- favori kullanıcıya durum bildirimi

---

# 37. Yol Haritası (Teknik)

## Faz 0 — Foundations
- Auth
- User profile
- Catalog basics
- Listing draft/publish
- Media pipeline
- Search basics
- Favorites
- Saved searches
- Push notifications basic
- Admin moderation basic

## Faz 1 — Differentiation MVP
- Price score v1
- Trust score v1
- Panel damage filters
- Compare
- Seller verification basic
- Listing history snapshots
- Relevance ranking v1

## Faz 2 — Market Advantage
- Dealer portal
- Expert report integrations
- Fraud engine v2
- Messaging
- Advanced saved search matching
- Recommendation v1
- Compare insights

## Faz 3 — Defensibility
- ML pricing v2
- fraud graph
- dynamic ranking
- financing / trade-in integrations
- inspection booking
- lead scoring
- marketplace reputation system

---

# 38. Minimum Ürün Kararları (Zor Öncelikler)

İlk sürümde mutlaka olmalı:
- hızlı arama
- güçlü filtre
- panel bazlı hasar modeli
- favori + saved search
- price score v1
- trust score v1
- seller verification basic
- moderation panel
- listing snapshot/history basic

İlk sürümde ertelenebilir:
- full real-time chat
- auction
- multi-seller teams
- advanced ML recommendation
- financing deep integrations
- public seller reviews (operasyonel riskli)

---

# 39. Kurucu Ekip İçin Operasyonel Gerçekler

## 39.1 İlk 6 ayda en kritik üç savaş alanı
1. catalog & structured data quality
2. search & filtering quality
3. fraud / misleading listing control

## 39.2 En pahalı yanlışlar
- general marketplace gibi her kategoriyi destekleyen generic schema kurmak
- araç verisini serbest metne bırakmak
- backoffice/moderasyon olmadan launch etmek
- pricing intelligence’i çok geç eklemek
- event/audit tarihi tutmadan ilerlemek

## 39.3 En büyük moat adayları
- yüksek kaliteli structured automotive data
- ilan dürüstlük / trust sistemi
- bölgesel pricing intelligence
- panel bazlı condition filtering
- kullanıcı karar desteği katmanı

---

# 40. Açık Teknik Kararlar

Bu kararlar erken netleştirilmeli:

1. Backend ana dili TypeScript mi Go mu?
2. Monolith başlangıcı hangi sınırda servisleşecek?
3. Message sistemi MVP’de olacak mı?
4. VIN decode / expert report partnerleri olacak mı?
5. Türkiye özelinde tramer / hasar verisi hangi hukuki ve ticari modelle entegre edilecek?
6. Paid boost ranking içinde hangi sert limitlerle çalışacak?
7. Search engine OpenSearch mü Elastic mi?
8. Warehouse ClickHouse mu BigQuery mi?
9. Moderasyon 7/24 mü, çalışma saatleri mi?
10. Dealer onboarding manuel mi self-serve mü?

---

# 41. Örnek SQL Şema Kırılımı (Kısa)

```sql
create table listings (
  id uuid primary key,
  seller_id uuid not null references sellers(id),
  vehicle_id uuid not null references vehicles(id),
  title text not null,
  description text not null,
  price_amount bigint not null,
  price_currency char(3) not null default 'TRY',
  negotiable boolean not null default false,
  status varchar(32) not null,
  moderation_status varchar(32) not null default 'pending',
  city_id int not null references cities(id),
  district_id int references districts(id),
  geo_point geography(point, 4326),
  visibility_score numeric(5,2),
  quality_score numeric(5,2),
  trust_score numeric(5,2),
  price_score numeric(5,2),
  fraud_score numeric(5,2),
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_listings_seller_status on listings(seller_id, status);
create index idx_listings_city_status on listings(city_id, status);
create index idx_listings_published_at on listings(published_at desc);
```

---

# 42. Örnek Event Payload

```json
{
  "event_id": "7fc8a3b1-9a79-4e20-8c8c-42af3c9f7fcb",
  "event_type": "listing.published",
  "aggregate_type": "listing",
  "aggregate_id": "listing_123",
  "occurred_at": "2026-03-18T12:00:00Z",
  "version": 1,
  "correlation_id": "req_abc123",
  "payload": {
    "listing_id": "listing_123",
    "seller_id": "seller_456",
    "vehicle_id": "vehicle_789",
    "price_amount": 1850000,
    "city_id": 34,
    "brand_id": 3,
    "model_id": 88
  }
}
```

---

# 43. Örnek Search Query Contract

```json
{
  "q": "bmw 320i m sport",
  "filters": {
    "city_ids": [34, 16],
    "price": {"min": 1200000, "max": 2500000},
    "km": {"max": 90000},
    "year": {"min": 2019},
    "seller_types": ["individual"],
    "fuel_types": ["petrol"],
    "transmissions": ["automatic"],
    "required_features": ["carplay", "sunroof"],
    "tramer": {"max": 0}
  },
  "sort": "recommended",
  "page": {"cursor": null, "size": 20}
}
```

---

# 44. Örnek Price Score Hesaplama Pseudocode

```text
comparables = find_comparables(listing)
if comparables.count < MIN_REQUIRED:
    return insufficient_confidence

expected_price = weighted_median(comparables)
delta_pct = (listing.price - expected_price) / expected_price

score = 70
if delta_pct < -0.12: score += 20
elif delta_pct < -0.05: score += 10
elif delta_pct <= 0.05: score += 5
elif delta_pct > 0.15: score -= 20

score += condition_adjustment(listing)
score += seller_quality_adjustment(listing.seller)
score = clamp(score, 0, 100)
```

---

# 45. Örnek Trust Score Pseudocode

```text
score = 100
score -= missing_required_fields_penalty
score -= weak_media_penalty
score -= no_verification_penalty
score -= suspicious_pricing_penalty
score -= duplicate_risk_penalty
score -= report_history_penalty
score -= mismatch_penalty
score += expert_report_bonus
score += verified_seller_bonus
score = clamp(score, 0, 100)
```

---

# 46. Sonuç

Bu platformun teknik başarısı yalnızca “ilan yayınlama” kabiliyetine bağlı değildir. Asıl başarı şunların aynı anda güçlü kurulmasına bağlıdır:

- normalize araç veri modeli
- güçlü arama ve filtreleme
- price intelligence
- trust/fraud katmanı
- event-driven takip ve bildirim sistemi
- operasyonu yönetecek backoffice

Doğru kurulduğunda bu sistem bir marketplace’ten fazlasına dönüşür:

> **Araba satın alma karar altyapısı**  
> yani kullanıcıya sadece ilan değil, güven, bağlam ve karar desteği sunan platform.

---

# 47. Bir Sonraki Doküman İçin Doğal Devam

Bu dokümandan sonra hazırlanması gereken teknik belgeler:
1. **ERD (entity relationship diagram)**
2. **API contract paketi (OpenAPI)**
3. **Search relevance spec**
4. **Moderation operations playbook**
5. **Pricing engine model spec**
6. **Trust/fraud rules matrix**
7. **Mobile app state architecture**
8. **Admin backoffice screen spec**
