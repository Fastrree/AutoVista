# Araba Odaklı Yeni Platform – Stratejik Plan ve Referans Notları (V1)

> Amaç: Bu doküman, araba odaklı yeni platform fikrinin ürün yönünü, referanslarını, kullanıcı acı noktalarını ve ilk plan omurgasını tek yerde toplamak için hazırlanmıştır. Kodlamaya başlamadan önce karar kaybını önlemek, bağlamı korumak ve Notion’da takip edilebilir bir ana kaynak oluşturmak için kullanılmalıdır.

---

## 1. Projenin Kısa Tanımı

Hedefimiz, **Sahibinden’den daha temiz, daha güvenilir, daha hızlı ve yalnızca otomobile odaklanan** bir dijital ürün tasarlamaktır.

Bu ürünün farkı sadece “daha güzel görünmek” olmayacak. Asıl farkı şu üç alanda yaratması gerekir:

1. **Doğru arabayı daha hızlı buldurmak**
2. **İlanın ve satıcının güvenilirliğini daha net göstermek**
3. **Alım kararını veriyle kolaylaştırmak**

Bu nedenle ürünün özü bir “ilan listesi” değil, bir **araç keşif + karar destek + güven platformu** olmalıdır.

---

## 2. Ürün Vizyonu

### 2.1 Vizyon Cümlesi
Kullanıcının araba arama sürecini gürültüden arındıran, güveni görünür yapan ve karar verme süresini kısaltan, modern ve otomobil odaklı bir platform oluşturmak.

### 2.2 Ürün Konumlandırması
Bu ürün, genel bir marketplace olmayacak. Yalnızca otomobil odaklı olacağı için aşağıdaki alanlarda derinleşebilir:

- daha güçlü filtreler
- daha iyi ilan standardizasyonu
- daha güçlü satıcı doğrulama
- piyasa değeri / fiyat analizi
- araç karşılaştırma
- daha iyi takip ve favori deneyimi
- ekspertiz / hasar / güven katmanı

### 2.3 Temel Vaat
**“Arabaya bakmayı değil, doğru arabayı bulmayı hızlandırır.”**

---

## 3. Bu Dokümanın Kapsadığı Malzemeler

Bu plan şu kaynaklara dayanmaktadır:

1. Kullanıcı tarafından paylaşılan **Sahibinden Play Store yorumları**
2. Kullanıcı tarafından paylaşılan **Sahibinden, mobile.de, AutoScout24, DubiCars, AutoUncle ekran görüntüleri**
3. Kullanıcı tarafından paylaşılan **örnek ilan detay sayfası linkleri**
4. Bu linklerin ve resmi sayfaların okunmasından çıkan **ürün gözlemleri**

---

## 4. Ana Referanslar

### 4.1 Ana Rakip / Karşıt Referans
- Sahibinden

### 4.2 İlham Alınan Ürünler
- DubiCars
- AutoScout24
- mobile.de
- AutoUncle

### 4.3 İncelenen Linkler
- Sahibinden Play Store: https://play.google.com/store/apps/details?id=com.sahibinden&hl=tr
- Sahibinden ilan örneği: https://www.sahibinden.com/ilan/vasita-otomobil-fiat-2012-model-temiz-ve-bakimli-fiat-linea-emotion-plus-1305906031/detay
- mobile.de ilan örneği: https://suchen.mobile.de/fahrzeuge/details.html?id=439709137&dam=false&isSearchRequest=true&od=up&ref=srp&refId=57862d9e-a008-b765-77e3-4766538f62a3&s=Car&sb=rel&searchId=57862d9e-a008-b765-77e3-4766538f62a3&vc=Car
- AutoScout24 ilan örneği: https://www.autoscout24.com.tr/teklifler/audi-a3-spb-1-6tdi-s-tronic-110cv-e6-garanzia-1-anno-dizel-siyah-e2c37be9-4d5f-4d16-8ce7-14510a2332d7?sort=standard&desc=0&position=17&source_otp=t50&source=listpage_search-results&order_bucket=unknown&boost_level=t50&applied_boost_level=t50&relevance_adjustment=boost&boosting_product=mia
- AutoUncle ekran referansı / resmi giriş noktası: https://www.autouncle.com/
- Kullanıcı tarafından iletilen AutoUncle bağlantısı (not: AutoUncle yerine dealer inventory sayfası açılıyor): https://www.auto-team.de/fahrzeugbestand/#!/fahrzeug/opel/grandland-x/opel-grandland-x-1.5-d-automatik-elegance_00ab892d1470a8a7850dbe2b3af08abd1800d9d6/
- DubiCars ilan örneği: https://www.dubicars.com/2019-toyota-land-cruiser-vxr-57l-4wd-958978.html

---

## 5. Ürünün Çözmesi Gereken Ana Problem

Bugünkü büyük pazaryerlerinde araba aramak çoğu zaman şu hisleri yaratıyor:

- Çok fazla ilan var ama doğru ilanı bulmak zor
- Filtre var ama karar verecek kadar güçlü değil
- Güven sorunları görünür değil
- Satıcı ile alıcı arasında veri standardı yok
- Favori ve takip deneyimi zayıf
- Listeleme çok genel, araba özelinde derin değil
- Platform büyüdükçe ürün mantığı dağılmış durumda

Bu yüzden yeni ürünün görevi sadece “ilan göstermek” değil; **karmaşayı azaltmak ve karar netliği sağlamak** olmalı.

---

## 6. Sahibinden Analizi – Çıkan Ana Acı Noktaları

Sahibinden kullanıcı yorumları dikkatle incelendiğinde tekrar eden problemler net şekilde ortaya çıkıyor.

### 6.1 Filtreleme Yetersizliği
Kullanıcılardan gelen taleplerin büyük kısmı filtreleme ve arama motoruyla ilgili.

Sık tekrar eden istekler:
- aynı anda birden fazla şehir seçebilme
- il/ilçe yerine **yarıçap / km tabanlı arama**
- birden fazla araç tipini birlikte arayabilme
- sedan + SUV gibi kombin arama
- çoklu sıralama (ör. km + fiyat aynı anda)
- detaylı hasar/boya/değişen filtreleri
- taksi çıkması filtresi
- bagaj hacmi filtresi
- araç segmenti filtresi
- WLTP menzil filtresi
- tork filtresi
- boyut / uzunluk / yükseklik / genişlik filtreleri
- tramer / ağır hasar filtresi
- ekipman bazlı detaylı donanım filtreleri
- elektrikli araçlar için marka ve menzil tarafının daha iyi modellenmesi

**Yorumlardan çıkan sonuç:** Kullanıcı ilan çokluğundan değil, “karar filtresi eksikliğinden” yoruluyor.

### 6.2 Performans ve Karmaşıklık
Sık geçen şikayetler:
- uygulama yavaş
- ilk açılışlarda bekletiyor
- sürekli güncelleme geliyor
- güncellemeler deneyimi bozuyor
- geri dönüşlerde state kaybı yaşanıyor
- bildirimler ve mesajlar dağınık
- bazı alanlarda gereksiz menü kalabalığı var
- reklam akışı kullanıcıyı yanlış ekrana taşıyabiliyor

**Yorumlardan çıkan sonuç:** Kullanıcı sadece özellik değil, **stabil ve öngörülebilir deneyim** istiyor.

### 6.3 Güven ve Veri Doğruluğu Problemi
Öne çıkan güven problemleri:
- yanıltıcı ilan başlıkları
- yanlış paket / yanlış kategori / yanlış hasar beyanı
- galerici ile bireysel kullanıcının net ayrılmaması
- gerçek dışı fiyatlar
- km bilgisinin hatalı veya manipüle edilmiş girilmesi
- boyasız / hatasız yazıp ağır hasarlı çıkan ilanlar
- kullanıcı şikayetlerine yetersiz aksiyon algısı

**Yorumlardan çıkan sonuç:** Yeni ürünün en büyük farkı “güzel tasarım” değil, **güven görünürlüğü** olmalı.

### 6.4 Favori ve Takip Deneyimi Sorunları
Tekrarlayan kullanıcı talepleri:
- favorilerde filtreleme
- favori satıcıların ilanlarını tek yerde görebilme
- genel listede favoriye alınan ilanları işaretli görebilme
- “bir daha gösterme” özelliği
- favori klasör paylaşımında notların görünmesi
- fiyat değişimlerini daha iyi takip etme

**Yorumlardan çıkan sonuç:** İnsanlar sadece arama yapmıyor; bir süre **takip ediyor, kıyaslıyor, eliyor, dönüp tekrar bakıyor**.

### 6.5 Ticari ve Fiyatlandırma Tarafı
Sık geçen tepkiler:
- ilan verme ücretleri yüksek
- ek görünürlük / doping / yenileme akışı kullanıcıyı bezdiriyor
- ticari satıcı ile bireysel arasında ayrım beklentisi var

**Not:** Bu nokta doğrudan ürün deneyimi kadar iş modelini de etkiler. Başlangıç aşamasında kullanıcı güveni ve kullanım kolaylığı, agresif monetization’dan daha önemli olmalıdır.

---

## 7. Play Store Yorumlarından Çıkan Net Ürün Dersleri

Bu proje için en kritik dersler şunlardır:

1. **Filtre motoru güçlü değilse kullanıcı uygulamayı sevse bile zamanla yoruluyor.**
2. **Sürekli değişen ama tutarlı olmayan arayüz, güven kaybı yaratıyor.**
3. **İlan sayısı arttıkça veri standardizasyonu şart hale geliyor.**
4. **Güven katmanı görünür değilse kullanıcı platforma değil, şansa güvenmek zorunda kalıyor.**
5. **Favori / takip / karşılaştırma akışı, araba alış sürecinde çok kritik.**
6. **Genel marketplace mantığı, otomobil kategorisinde zamanla yetersiz kalıyor.**

---

## 8. Referans Ürün Analizleri

## 8.1 Sahibinden – Genel Marketplace Gücü, Otomobilde Odak Kaybı

### Güçlü Yönler
- çok büyük hacim
- kullanıcı alışkanlığı çok güçlü
- geniş ilan arzı
- Türkiye’de pazar bilinirliği yüksek
- kullanıcı için “ilk bakılan yer” etkisi var

### Zayıf Yönler
- ürün çok genel, araba özelinde derin değil
- kategori yoğunluğu odak kaybı yaratıyor
- filtre ve karar desteği yetersiz kalıyor
- güven sinyalleri standartlaştırılmamış
- mesaj/bildirim/favori akışı parçalı hissediyor
- reklam ve yoğunluk deneyimi bozabiliyor

### Sahibinden’den Alınacak Ders
Bu ürün, rakipten çok “karşıt referans” gibi düşünülmeli.

**Sahibinden = büyük ve güçlü ama gürültülü**
**Yeni ürün = odaklı, hızlı, güvenli ve karar destekli**

---

## 8.2 mobile.de – Yapısal Veri Sunumu Güçlü

### Detay Sayfasından Çıkan Gözlemler
mobile.de örnek ilan sayfasında şu bilgilerin üst bölümde hızlıca görünmesi dikkat çekicidir:
- kilometre
- güç
- yakıt türü
- şanzıman
- ilk tescil
- öne çıkan özellikler

Detay alanında ayrıca şunlar sistematik biçimde sunuluyor:
- teknik veriler
- donanım listesi
- ekipman detayları
- sürüş destekleri
- multimedya öğeleri

### Güçlü Yönler
- veri yoğunluğunu belli bir sistemle sunuyor
- teknik detay tarafı güçlü
- donanım bilgisi detaylı ve yapısal
- “bu araçta ne var?” sorusuna iyi cevap veriyor

### Zayıf Yönler
- listeleme tarafı bazı ekranlarda çok yoğun hissediliyor
- duygusal / premium tasarım hissi sınırlı kalabiliyor
- portal hissi zaman zaman ağır basıyor

### mobile.de’den Alınacak Ders
**Veriyi katmanlı, sistematik ve net sunmak** gerekir. Ama bunu daha modern, daha temiz ve daha karar odaklı bir UI ile birleştirmeliyiz.

---

## 8.3 AutoScout24 – Temiz Giriş ve Satıcı Güven Sinyalleri

### Detay Sayfasından Çıkan Gözlemler
AutoScout24 örnek ilanında üst blokta şu ana veriler hızlıca okunuyor:
- fiyat
- kilometre
- şanzıman
- ilk kayıt
- yakıt türü
- güç
- satıcı tipi
- satıcı puanı / değerlendirme sayısı

Ayrıca detay sayfasında:
- temel veri
- araç geçmişi
- teknik bilgiler
- enerji tüketimi
- donanım
- satıcı profili
başlıkları altında bilgi gruplaması var.

### Güçlü Yönler
- ana sayfa ve keşif akışı görece sade
- gövde tipi / kullanım senaryosu bazlı girişler iyi
- satıcı güven sinyalleri görünür
- bilgi blokları düzenli

### Zayıf Yönler
- bazı alanlarda hâlâ klasik ilan portalı hissi var
- karar destek katmanı tam derinleşmiyor
- fiyat zekâsı ve güven zekâsı ayrı ürün katmanı olarak öne çıkmıyor

### AutoScout24’ten Alınacak Ders
**Temiz bilgi mimarisi + satıcı güven göstergeleri + sade giriş noktaları** iyi çalışıyor. Bunun üzerine biz daha güçlü bir karar motoru kurabiliriz.

---

## 8.4 DubiCars – Güven ve Satın Alma Akışı Güçlü

### Detay Sayfasından Çıkan Gözlemler
DubiCars ilan örneğinde dikkat çeken şeyler:
- Verified Seller rozeti
- satıcı bilgileri ve güven işaretleri
- detay sayfasında net iletişim seçenekleri
- test drive / trade-in bilgileri
- benzer araç ve değerleme akışları
- ilan çevresinde güvenli iletişim ve işlem tamamlama sinyalleri

### Güçlü Yönler
- satıcı güvenini görünür yapıyor
- ilanı sadece “gösterme” değil, “işleme dönüştürme” mantığı var
- bayi hizmetlerini ürünün bir parçası gibi sunuyor
- satış sonrası ve satın alma yardımcı akışlarını destekliyor

### Zayıf Yönler
- bazı alanlarda ticari / bayi odaklı ton ağır gelebilir
- ikinci el karar desteği tarafı tek başına yeterince derinleşmeyebilir

### DubiCars’tan Alınacak Ders
Yeni platform yalnızca listeleme ürünü olmamalı; aynı zamanda:
- satıcı güveni
- ekspertiz / değerlendirme
- randevu / test sürüşü
- finansman / takas gibi akışlara bağlanabilmeli

---

## 8.5 AutoUncle – Fiyat Zekâsı Konumlandırması Güçlü

### Ana Değer Önerisi
AutoUncle kendini klasik ilan portalı gibi değil, **bağımsız fiyat kontrol katmanı** olarak konumluyor.

### Güçlü Yönler
- net değer önerisi var
- fiyat karşılaştırma dili çok güçlü
- kullanıcıya “pahalı mı, ucuz mu?” sorusuna cevap verme iddiası taşıyor

### Zayıf Yönler
- marka ve otomotiv tutkusu hissi daha zayıf kalabilir
- tek başına yeterli ürün ekosistemi hissi vermezse araç alış sürecinin tamamını kapsamayabilir

### AutoUncle’dan Alınacak Ders
Yeni ürünün merkezinde mutlaka şu katman olmalı:
- fiyat skoru
- piyasa karşılaştırması
- benzer ilan kıyası
- şüpheli fiyat uyarısı

---

## 9. Rakiplerden Çıkan Ortak Sonuç

Bu 5 referansa birlikte bakınca net sonuç şu:

### Sahibinden’in gücü
- hacim
- alışkanlık
- bilinirlik

### mobile.de’nin gücü
- teknik veri ve yapı

### AutoScout24’ün gücü
- temiz keşif ve satıcı güveni

### DubiCars’ın gücü
- verified seller ve işlem tamamlama mantığı

### AutoUncle’ın gücü
- fiyat zekâsı

### Yeni ürünün kurması gereken birleşim
Yeni ürünün ideal kombinasyonu şudur:

- Sahibinden’in erişim hissi
- mobile.de’nin veri sistematiği
- AutoScout24’ün temiz girişleri
- DubiCars’ın güven ve satış tamamlama yaklaşımı
- AutoUncle’ın fiyat analizi mantığı

---

## 10. Yeni Ürünün Temel Sütunları

## 10.1 Süper Filtre Motoru
Bu ürünün en güçlü fark alanlarından biri filtre sistemi olmalıdır.

### Zorunlu Standart Filtreler
- marka
- model
- paket / donanım
- fiyat aralığı
- km aralığı
- yıl aralığı
- yakıt türü
- şanzıman
- kasa tipi
- çekiş tipi
- renk
- satıcı tipi

### Derin Araç Filtreleri
- araç segmenti
- bagaj hacmi
- güç (HP / kW)
- tork
- motor hacmi
- 0-100 hızlanma
- tüketim
- emisyon
- araç boyutları
- ağırlık
- çekme kapasitesi

### Elektrikli Araç Filtreleri
- WLTP menzil
- batarya kapasitesi
- AC şarj gücü
- DC hızlı şarj gücü
- çekiş tipi
- ısı pompası

### Hasar / Sağlık Filtreleri
- taksi çıkması
- ağır hasar kaydı
- tramer tutarı aralığı
- ekspertiz raporu var mı
- boya / değişen panel bazlı filtre
- kaput boyalı mı
- tavan değişenli mi
- şasi işlemli mi
- airbag durumu

### Donanım Filtreleri
- Apple CarPlay
- Android Auto
- ACC / adaptif cruise
- kör nokta uyarı
- şerit takip
- 360 kamera
- sunroof
- ısıtmalı koltuk
- elektrikli koltuk
- head-up display
- radar
- otomatik fren sistemi
- F1 kulakçık

### Lokasyon Filtreleri
- çoklu şehir seçimi
- ilçe bazlı seçim
- harita alanı seçimi
- mevcut konumdan yarıçap (örn. 50 km / 100 km / 200 km)
- “şu iller hariç” mantığı

### Akıllı Sıralama Seçenekleri
- fiyat düşükten yükseğe
- km düşükten yükseğe
- en yeni ilanlar
- en iyi fiyat
- güven skoru yüksek
- fiyat + km dengesi
- yaş + km dengesi
- yeni eklenmiş + iyi fiyatlı

**Karar:** Filtre motoru, sıradan kategori filtresi değil; **araba karar motoru** gibi çalışmalıdır.

---

## 10.2 Güven Katmanı
Güven, bu ürünün merkezinde görünür olmalıdır.

### İlan Güven Öğeleri
- satıcı tipi: bireysel / bayi / kurumsal
- telefon doğrulandı mı
- kimlik doğrulandı mı
- vergi / firma doğrulandı mı
- araç bilgileri doğrulandı mı
- ekspertiz raporu var mı
- hasar beyanı var mı
- ilanın zorunlu alanları tamam mı
- fotoğraf sayısı ve kalitesi yeterli mi
- açıklama yapay / kopya / spam mı

### Güven Skorları
1. **Satıcı Güven Skoru**
2. **İlan Kalite Skoru**
3. **Fiyat Güven Skoru**
4. **Veri Tutarlılık Skoru**

### Ek Güven Mekanizmaları
- yanlış paket / yanlış yakıt / yanlış kategori uyarısı
- “başlık ile ekspertiz uyuşmuyor” alarmı
- gerçek dışı fiyat uyarısı
- km anomali uyarısı
- kullanıcı raporları ve doğrulama geçmişi

**Karar:** Yeni ürün, güveni dip sayfalara gizlemek yerine kartta ve detay sayfasında görünür kılmalıdır.

---

## 10.3 Karar Destek Katmanı
Bu alan, ürünü klasik ilan platformlarından ayıracak en güçlü katmandır.

### Her İlanda Gösterilebilecek Karar Öğeleri
- bu ilan piyasa ortalamasına göre nasıl?
- emsallere göre fiyatı iyi mi?
- benzer araçlar son dönemde kaçtan listelenmiş?
- fiyat trendi nasıl?
- bu ilanın güçlü ve zayıf yönleri neler?
- bu motor / şanzıman kombinasyonu hakkında genel risk notları
- yıllık tahmini yakıt maliyeti
- yıllık tahmini bakım / vergi / sigorta tahmini
- aile kullanımı için uygun mu?
- şehir içi için mantıklı mı?
- uzun yol için uygun mu?

### Olası Etiket Sistemi
- iyi fiyat
- piyasa üstü
- yüksek km ama iyi fiyat
- düşük km premium
- aile dostu
- şehir içi uygun
- uzun yol uygun
- koleksiyonluk değil / koleksiyonluk aday

**Karar:** Kullanıcının sormak istediği “iyi ilan mı?” sorusunu sistem cevaplamalıdır.

---

## 10.4 Takip ve Karşılaştırma Katmanı
Araba alma süreci tek oturumluk değildir. Takip gerekir.

### Zorunlu Takip Özellikleri
- favoriye ekleme
- klasörleme
- favorilerde filtreleme
- favori satıcıları ayrı izleme
- kaydedilmiş aramalar
- yeni ilan bildirimi
- fiyat düşüş bildirimi
- ilan değişikliği bildirimi
- tekrar yayınlanmış ilan uyarısı
- “bir daha gösterme”
- gizlenen ilanlar listesi

### Karşılaştırma Özellikleri
- 2 ila 4 araç yan yana karşılaştırma
- fiyat / km / yıl / yakıt / donanım / hasar / bagaj / boyut / menzil bazlı kıyas
- “hangi araç hangi konuda daha iyi?” özet kutusu

**Karar:** Favori ve karşılaştırma, yan özellik değil; ana karar akışının parçasıdır.

---

## 10.5 Sürtünmesiz UX İlkeleri
Yeni ürün, karmaşık ve dağınık hissettirmemelidir.

### Tasarım İlkeleri
- tek iş = tek odak
- gereksiz kategori kalabalığı yok
- reklam, temel akışı bozamaz
- filtreler kaybolmaz
- geri dönünce kullanıcı state’i korunur
- aynı bilginin birden çok menüye dağılması engellenir
- dark mode ilk günden düşünülür
- performans, görsellik kadar önemlidir

---

## 11. Hedef Kullanıcı Segmentleri

### 11.1 Birincil Kullanıcı – Alıcı
Aradığını bilen ya da seçenek arasında kalan, haftalarca karşılaştırma yapabilen kullanıcı.

#### İhtiyaçları
- doğru filtreleme
- temiz listeleme
- fiyat kıyası
- güven skoru
- benzer araç karşılaştırma
- hızlı karar desteği

### 11.2 İkincil Kullanıcı – Bireysel Satıcı
Aracını düzgün ve kolay şekilde listelemek isteyen kullanıcı.

#### İhtiyaçları
- net ilan girişi
- hatasız kategori seçimi
- güven artıran profil öğeleri
- ekspertiz / hasar verisini kolay girme
- ilan kalitesini yükselten yönlendirmeler

### 11.3 Ticari Kullanıcı – Bayi / Galeri
Çoklu araç satan profesyonel taraf.

#### İhtiyaçları
- güven rozetleri
- bayi profili
- stok yönetimi
- hızlı iletişim
- performans istatistikleri
- toplu ilan süreçleri

---

## 12. Bilgi Mimarisi – Önerilen Ürün İskeleti

### 12.1 Ana Menü / Alt Navigasyon
MVP için önerilen ana alanlar:
- Keşfet
- Ara
- Favoriler
- Karşılaştır
- Profil

### 12.2 Ana Modüller
- Ana sayfa
- Arama / keşif
- Listeleme sonuçları
- Gelişmiş filtreler
- Harita görünümü
- İlan detay sayfası
- Favoriler
- Karşılaştırma
- Kayıtlı aramalar
- Satıcı profili

### 12.3 V2 / Sonraki Faz Modülleri
- İlan verme
- Ekspertiz randevusu
- Kredi / finansman
- Takas akışı
- Satıcı puanlama
- Araç değerleme
- Yapay zekâ destekli öneri sistemi

---

## 13. Listeleme Ekranı İçin Taslak Yaklaşım

### 13.1 Üst Alan
- büyük arama kutusu
- hızlı filtre çipleri
- kayıtlı aramalar
- harita geçişi
- karşılaştırma sepeti

### 13.2 Hızlı Filtre Çipleri
- fiyat
- km
- yıl
- şehir / yakınlık
- satıcı tipi
- hasar durumu
- iyi fiyatlı
- ekspertizli
- taksi çıkması: hayır
- EV menzil
- daha fazla

### 13.3 İlan Kartında Görünmesi Gereken Minimum Bilgiler
- fotoğraf
- fiyat
- fiyat skoru
- güven skoru
- marka / model / paket
- yıl
- km
- yakıt
- şanzıman
- lokasyon + mesafe
- satıcı tipi
- kısa hasar özeti
- ekspertiz var / yok
- favori
- karşılaştır
- gizle
- fiyat düşüş etiketi / yeni ilan etiketi

### 13.4 Kartın Vermesi Gereken Hissiyat
- hızlı taranabilir
- temiz
- güvenli
- çok kalabalık olmayan ama karar verdiren

---

## 14. İlan Detay Sayfası İçin Taslak Yapı

### 14.1 Hero Alanı
- büyük görsel galeri
- video / 360 / ekspertiz / hasar diyagramı sekmeleri
- fiyat
- fiyat skoru
- güven skoru
- satıcı rozetleri
- ara / mesaj / karşılaştır / favori CTA’ları

### 14.2 Hızlı Özet Kutusu
- yıl
- km
- motor
- güç
- yakıt
- şanzıman
- çekiş
- kasa tipi
- renk
- lokasyon

### 14.3 Araç Sağlığı
- tramer özeti
- boya/değişen panel haritası
- ekspertiz özeti
- kritik uyarılar
- veri tutarlılık kontrolü

### 14.4 Piyasa Analizi
- emsal fiyat aralığı
- fiyat skoru
- bu ilanın konumu
- son 30 gün trendi
- benzer ilanlarla kıyas

### 14.5 Donanım ve Teknik Veriler
- güvenlik
- konfor
- sürüş destek
- multimedya
- boyutlar
- performans
- EV ise batarya / menzil / şarj bilgileri

### 14.6 Satıcı Bölümü
- satıcı tipi
- doğrulama durumu
- yanıt hızı
- aktif ilan sayısı
- değerlendirme puanı
- diğer ilanları

### 14.7 Satın Alma Destek Bloku
- kredi hesaplama
- takas uygun mu
- ekspertiz randevusu
- test sürüşü
- teslimat / lojistik

### 14.8 Benzer Araçlar
- benzer ama daha ucuz
- benzer ama daha düşük km
- benzer ama daha yüksek güven skorlu

---

## 15. Tasarım Dili İçin Yön Notları

### 15.1 Genel Hedef
Ürün şu hissi vermeli:
- modern
- premium
- otomotiv odaklı
- teknik ama soğuk olmayan
- sade ama yetersiz olmayan

### 15.2 Rakiplerden Çıkan Tasarım Dersleri
- Sahibinden: erişilebilir ama dağınık
- mobile.de: güçlü veri ama yoğunluk riski var
- AutoScout24: sade giriş iyi
- DubiCars: güven ve satış hissi güçlü
- AutoUncle: değer önerisi net ama görsel duygusu daha zayıf

### 15.3 Tasarımda Kaçınılması Gerekenler
- aşırı kategori kalabalığı
- kalın metin blokları
- aynı bilgiyi tekrar eden modüller
- reklamın akışı bozması
- eski portal hissi
- filtrelerin çok derine gömülmesi

### 15.4 UI Dili İçin İlk Karar Notu
Muhtemel yön:
- koyu tema destekli
- kart bazlı modern arayüz
- otomotiv hissi veren güçlü tipografi
- net ikonografi
- performansı bozmayan mikro animasyonlar

---

## 16. MVP Kapsamı – İlk Sürümde Olması Gerekenler

### 16.1 Öncelik Kararı
İlk sürümde **alıcı tarafı** odakta olmalı.

### 16.2 MVP İçeriği
- ana sayfa
- arama
- listeleme sonuçları
- gelişmiş filtreleme
- ilan detay sayfası
- favoriler
- karşılaştırma
- kayıtlı aramalar
- fiyat skoru
- temel güven skoru
- satıcı profili

### 16.3 MVP’de Olmayabilecek / Sonraya Kalabilecekler
- ilan verme akışının tam sürümü
- gelişmiş bayi paneli
- ödeme / kapora emanet sistemi
- kapsamlı kredi / finansman akışları
- toplu ilan yönetimi
- test sürüşü / lojistik rezervasyonları

**Karar:** İlk sürümün görevi, pazarı “biz daha iyi filtreliyor ve daha güvenli gösteriyoruz” noktasında ikna etmektir.

---

## 17. Sonraki Fazlar (V2 / V3)

### V2
- ilan verme
- ilan kalite asistanı
- ekspertiz dokümanı yükleme
- satıcı rozetleri
- daha güçlü bildirim sistemi
- fiyat geçmişi grafiği
- gizleme / bir daha gösterme

### V3
- finansman entegrasyonları
- ekspertiz randevusu
- güvenli kapora / emanet sistemi
- teslimat / şehirler arası taşıma
- daha gelişmiş satıcı puan sistemi
- araç ömür maliyeti hesaplama

---

## 18. Ürünün Ayırt Edici Çekirdek Fikirleri

Bu projeyi sıradan bir ilan uygulaması olmaktan çıkaracak özellikler:

1. **Panel bazlı hasar filtreleme**
2. **Çoklu şehir + yarıçap bazlı arama**
3. **Gerçek anlamda detaylı araç filtreleri**
4. **İlan / satıcı / fiyat / veri tutarlılık skorları**
5. **Fiyat zekâsı ve piyasa karşılaştırması**
6. **Güçlü favori + karşılaştırma + takip deneyimi**
7. **Bireysel / bayi ayrımını çok net gösterme**
8. **Reklam ve karmaşa yerine karar desteği sunma**

---

## 19. Şu Anda Kaybetmememiz Gereken En Kritik İçgörüler

Bu bölüm, proje ilerlerken unutulmaması gereken çekirdek maddelerdir.

### 19.1 Unutulmaması Gereken Gerçekler
- Kullanıcı çok ilan değil, doğru ilan ister
- Filtre motoru bu ürünün kalbidir
- Güven görünür değilse kullanıcı yorulur
- Favoriler ve karşılaştırma ana akışın parçasıdır
- Piyasa fiyatı ve emsal kıyası karar anında çok değerlidir
- Genel marketplace mantığı otomobil deneyimini bozar
- Performans ve stabilite tasarım kadar önemlidir
- Aşırı özellik kadar, doğru önceliklendirme önemlidir

### 19.2 Ürünün Asla Kaybetmemesi Gereken Karakteri
Bu ürün:
- sade olacak
- güveni gösterecek
- araba odaklı olacak
- karar desteği verecek
- kullanıcıyı yormayacak
- gürültü değil netlik üretecek

---

## 20. Araştırma Notları – İleride Derinleştirilecek Başlıklar

Bu başlıklar sonraki plan sürümünde ayrı araştırma maddesi olabilir:

- Türkiye’de araba alıcısının karar verme akışı
- bireysel satıcı ile bayi arasındaki güven farkı
- ekspertiz verisinin standart gösterimi
- tramer / hasar / değişen veri modeli
- elektrikli araçlar için farklı filtre ihtiyaçları
- fiyat skoru algoritması taslağı
- satıcı güven skoru algoritması taslağı
- ilan kalite puanı algoritması
- liste kartı A/B varyasyonları
- koyu tema / açık tema yönü
- web vs mobil öncelik kararı

---

## 21. Açık Sorular

Henüz kesinleştirilmemiş ama netleştirilmesi gereken sorular:

1. İlk pazar Türkiye mi?
2. İlk sürüm yalnızca ikinci el mi?
3. Bayi ve bireysel aynı anda mı başlayacak?
4. İlk platform mobil mi, web mi, ikisi birden mi?
5. Fiyat zekâsı başlangıçta ne kadar derin olacak?
6. Ekspertiz / tramer gibi dış veri entegrasyonları ilk günden var mı?
7. İlan verme ilk sürüme girecek mi, yoksa alıcı deneyimi ile mi başlanacak?

---

## 22. Sonuç

Bu proje, “Sahibinden’in aynısı ama daha şık” olmamalıdır.

Doğru hedef şudur:

**Sadece otomobile odaklanan, güçlü filtreleri olan, güveni görünür yapan, fiyat ve karar desteği sunan modern bir araç platformu.**

Bu planın şu anki ana sonucu:

- ilk büyük fark alanımız filtreleme
- ikinci büyük fark alanımız güven katmanı
- üçüncü büyük fark alanımız fiyat / karar desteği
- ilk sürüm odağımız alıcı deneyimi

---

## 23. Kısa Eylem Planı – Bir Sonraki Adımda Ne Çıkarılmalı

Bu dokümandan sonra üretilecek en mantıklı belge sırası:

1. Ürün prensipleri (tek sayfa)
2. Bilgi mimarisi ve ekran listesi
3. Filtre sistemi detay taslağı
4. İlan detay veri modeli
5. Güven skoru modeli
6. Fiyat skoru modeli
7. MVP kullanıcı akışları
8. Low-fidelity wireframe planı

---

## 24. Kaynak Özeti (Kısa)

### Kullanıcı İçgörü Kaynağı
- Sahibinden Play Store yorumları (kullanıcı tarafından paylaşılan örnekler)

### Görsel Referans Kaynağı
- Kullanıcı tarafından paylaşılan ekran görüntüleri

### Canlı Sayfa Referansları
- Sahibinden ilan örneği
- mobile.de ilan örneği
- AutoScout24 ilan örneği
- DubiCars ilan örneği
- AutoUncle resmi giriş sayfası

---

## 25. Notion’a Kopyalarken Önerilen Üst Başlık Yapısı

- 01 Vizyon
- 02 Problem Alanı
- 03 Rakip Analizi
- 04 Kullanıcı İçgörüleri
- 05 Ürün Sütunları
- 06 MVP Kapsamı
- 07 Açık Sorular
- 08 Sonraki Adımlar

