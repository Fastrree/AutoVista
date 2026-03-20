# agent.md

## Proje
Bu proje, **sadece otomobil odaklı** bir ilan ve karar destek platformudur. Hedef, genel pazar yeri mantığından uzak; daha temiz, daha güvenilir, daha hızlı ve karar vermeyi kolaylaştıran bir ürün üretmektir.

## Temel Amaç
Kullanıcının doğru arabayı:
- daha hızlı bulması
- daha güvenle değerlendirmesi
- daha kolay karşılaştırması
- daha az gürültü ile karar vermesi

## Ürün Pozisyonu
Bu ürün bir “ilan sitesi” değil, bir **araba keşif ve karar platformu** olarak düşünülmelidir.

## Ana Ürün Prensipleri
1. **Araba odaklılık**
   - Ürün sadece otomobil use-case’i için optimize edilir.
   - Genel marketplace mantığına kayılmaz.

2. **Sadelik**
   - Her ekran tek bir ana işe hizmet etmelidir.
   - Gereksiz modül, aşırı metin, karmaşık navigasyon eklenmez.

3. **Karar desteği**
   - Sadece ilan göstermek yetmez.
   - Fiyat skoru, güven skoru, karşılaştırma, favori takibi gibi karar destek katmanları önemlidir.

4. **Güven**
   - Satıcı tipi, doğrulama, hasar bilgisi, ekspertiz, ilan tutarlılığı kritik kabul edilir.
   - UI ve veri modeli güveni görünür kılmalıdır.

5. **Filtre gücü**
   - Bu ürünün en önemli farkı filtre kalitesidir.
   - Kullanıcı gerçekten istediği aracı daraltabilmelidir.

6. **Performans**
   - Uygulama hızlı hissettirmelidir.
   - Geri dönünce state kaybolmamalı, filtreler sıfırlanmamalı, liste resetlenmemelidir.

## Hedef Kullanıcılar
### 1. Alıcı
- ikinci el araç arayan
- filtre kullanan
- fiyat karşılaştıran
- favori ve karşılaştırma ile karar veren kullanıcı

### 2. Satıcı
- bireysel satıcı
- galeri / bayi
- aracı güvenli ve net şekilde listelemek isteyen kullanıcı

### 3. Güven odaklı kullanıcı
- hasar, tramer, boya/değişen, ekspertiz ve satıcı doğruluğuna özellikle önem veren kişi

## Çekirdek Özellikler
- ana sayfa
- arama
- listeleme
- güçlü filtre sistemi
- ilan detay sayfası
- favoriler
- karşılaştırma
- kayıtlı arama
- fiyat skoru
- güven skoru
- satıcı doğrulama görünümü

## MVP İçin Zorunlu Modüller
Aşağıdakiler önceliklidir:
1. Ana sayfa
2. Arama / keşfet
3. Listeleme ekranı
4. Filtre paneli
5. İlan detay sayfası
6. Favoriler
7. Karşılaştırma
8. Kayıtlı arama
9. Fiyat skoru v1
10. Güven skoru v1

## Şimdilik Ertelenebilecekler
- gerçek zamanlı gelişmiş chat
- açık sosyal yorum sistemi
- finansman entegrasyonlarının tamamı
- açık artırma
- çok karmaşık bayi paneli
- fazla gamification

## Rakiplerden Alınacak Dersler
### Sahibinden
- güçlü hacim var ama ürün dağınık
- kategori gürültüsü fazla
- filtreleme ve güven katmanı yetersiz
- bizim ürünümüz daha temiz ve daha odaklı olmalı

### mobile.de
- yapısal veri sunumu güçlü
- teknik detay gösterimi iyi
- biz bunu daha modern UI ile birleştirmeliyiz

### AutoScout24
- temiz giriş, sade keşif, güven hissi iyi
- biz bunu daha güçlü karar desteğiyle geliştirmeliyiz

### DubiCars
- verified seller, satış tamamlama hissi güçlü
- güven, bayi, servis katmanları iyi

### AutoUncle
- fiyat analizi ve piyasa değeri yaklaşımı önemli
- fiyat zekâsı ürünün çekirdeğine alınmalı

## Tasarım Dili
- modern
- sade
- premium
- otomotiv odaklı
- veri yoğun ama boğmayan
- kart tabanlı düzen
- güçlü görsel hiyerarşi
- dark mode destekli

## UX Kuralları
- filtreler kullanıcıyı yormamalı
- çoklu şehir seçimi desteklenmeli
- konuma göre yarıçap filtresi düşünülmeli
- panel bazlı hasar filtreleri desteklenmeli
- favoriye alınan ilan listede görünür işaret taşımalı
- “bir daha gösterme” tipi gizleme mantığı düşünülmeli
- karşılaştırma her zaman erişilebilir olmalı
- kullanıcı geri döndüğünde bağlam kaybolmamalı

## İlan Kartında Öncelikli Alanlar
- fotoğraf
- fiyat
- fiyat skoru
- güven skoru
- marka / model / paket
- yıl / km / yakıt / şanzıman
- şehir / mesafe
- satıcı tipi
- hasar özeti
- ekspertiz var/yok
- favori / karşılaştır butonları

## İlan Detay Sayfasında Öncelikli Bölümler
1. Galeri
2. Kısa özet
3. Fiyat analizi
4. Güven / hasar bilgisi
5. Teknik özellikler
6. Donanımlar
7. Satıcı bölümü
8. Benzer araçlar

## Veri Modeli İçin Temel Kurallar
- Araç verisi mümkün olduğunca normalize tutulmalı
- Serbest metne fazla güvenilmemeli
- Marka, model, trim, motor, yakıt, şanzıman ayrıştırılmış olmalı
- Hasar bilgisi panel bazlı tutulmalı
- Search index source of truth olmamalı
- Fiyat skoru ve güven skoru türetilmiş alanlardır
- İlan geçmişi snapshot mantığıyla tutulmalıdır

## Teknik Kurallar
- Hızlı iterasyon ama temiz mimari
- Modüler yapı
- API-first yaklaşım
- Event-driven side effects
- Search projection mantığı
- Audit log düşüncesi
- Idempotent write işlemleri
- Backoffice/moderasyon göz ardı edilmemeli

## AI ile Çalışırken Kurallar
Bu projede AI şu rollerde kullanılabilir:
- ürün planlama
- bilgi mimarisi
- ekran akışları
- UI bileşen tasarımı
- teknik mimari
- veri modeli
- API tasarımı
- frontend component üretimi
- backend boilerplate üretimi

Ama AI şunları yaparken dikkatli olmalıdır:
- gereksiz özellik uydurmamalı
- projeyi genel marketplace’e çevirmemeli
- araba odaklı bağlamı kaybetmemeli
- aşırı kompleks mimari önermemeli
- MVP ile V2’yi karıştırmamalı
- UI’ı bilgi çöplüğüne çevirmemeli

## AI Çıktı Üretim Formatı
AI’den istenen çıktılar mümkün olduğunca şu biçimde olmalıdır:
1. Amaç
2. Varsayımlar
3. Kapsam
4. Öneri
5. Gerekçe
6. Risk / trade-off
7. Sonuç

## Öncelik Sırası
Bir karar verilirken şu sırayla düşün:
1. Kullanıcı doğru arabayı daha hızlı buluyor mu?
2. Güven artıyor mu?
3. Karar verme kolaylaşıyor mu?
4. Arayüz sade kalıyor mu?
5. Teknik karmaşıklık gereğinden fazla artıyor mu?

## Kaçınılacak Hatalar
- sahibinden benzeri kategori kalabalığı
- filtreleri göstermelik yapmak
- güven katmanını yüzeysel bırakmak
- fiyat analizini sonradan düşünmek
- favori / karşılaştırma / takip deneyimini zayıf bırakmak
- gereksiz sayıda ekran ve menü üretmek
- ilanın teknik verisini yalnızca açıklama metnine bırakmak

## Çalışma Şekli
Yeni bir ekran, özellik veya teknik karar tasarlanırken:
1. önce problem tanımlanır
2. sonra kullanıcı amacı yazılır
3. sonra minimum çözüm tasarlanır
4. sonra veri ihtiyacı çıkarılır
5. sonra edge-case’ler düşünülür
6. en son UI detayına geçilir

## Kısa Ürün Tanımı
> Sadece otomobil için tasarlanmış, güven ve karar desteği odaklı, modern bir araç ilan ve keşif platformu.

## Tek Cümlelik Kuzey Yıldızı
> Kullanıcının doğru arabayı daha hızlı ve daha güvenle bulmasını sağla.
