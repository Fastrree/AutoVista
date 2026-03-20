# agent-workflow.md

## Amaç
Bu dosya, AI ile geliştirme sürecinde **nasıl çalışılacağını** tanımlar.  
Kural seti değil, **çalışma protokolüdür**.

---

## 🧭 Genel Yaklaşım

AI her zaman şu sırayla düşünmelidir:

1. Problemi anla
2. Kullanıcı amacını tanımla
3. Minimum çözümü öner (MVP)
4. Gerekirse V2/V3 genişlet
5. Teknik ve UX trade-off’ları belirt

---

## ⚙️ Çalışma Prensipleri

- Önce **basit çözüm**, sonra kompleks çözüm
- Gereksiz özellik ekleme
- Varsayım yapıyorsan açıkça belirt
- Her öneride nedenini yaz
- Alternatif varsa kısa karşılaştırma yap

---

## 🚗 Ürün Odak Kuralları

- Bu bir **genel marketplace değildir**
- Sadece **otomobil odaklı** düşün
- Karar desteği (fiyat, güven, karşılaştırma) her zaman öncelikli
- Filtreleme sistemi kritik, yüzeysel bırakma
- UI sade kalmalı, bilgi çöplüğüne dönüşmemeli

---

## 🧠 Teknik Yaklaşım

- Overengineering yapma
- MVP için gereksiz microservice önerme
- Event-driven mantık varsa sade anlat
- Veri modelini normalize düşün
- Performans ve ölçeklenebilirliği göz önünde bulundur

---

## 🎨 UX / UI Yaklaşımı

- Her ekran tek bir ana amaca hizmet etmeli
- Kullanıcı geri döndüğünde state korunmalı
- Kritik bilgiler ilk bakışta görünmeli
- Gereksiz modal / popup kullanımı azaltılmalı
- Mobil öncelikli düşün

---

## 🔄 Çıktı Formatı

AI mümkün olduğunca şu formatta cevap vermelidir:

1. Amaç
2. Varsayımlar
3. Öneri
4. Gerekçe
5. Risk / Trade-off
6. Sonuç

---

## 🚨 Kaçınılması Gerekenler

- Sahibinden gibi karmaşık yapı önermek
- Her şeyi tek ekrana doldurmak
- AI uydurma özellikler eklemesi
- Kullanıcıyı yoran filtre sistemleri
- Teknik olarak gereksiz ağır çözümler

---

## 🎯 Öncelik Sırası

1. Kullanıcı doğru arabayı daha hızlı buluyor mu?
2. Güven artıyor mu?
3. Karar vermek kolaylaşıyor mu?
4. Arayüz sade mi?
5. Sistem gereksiz karmaşık mı?

---

## 🧩 Çalışma Metodu

Yeni bir şey tasarlanırken:

1. Problem nedir?
2. Kullanıcı ne yapmak istiyor?
3. En basit çözüm nedir?
4. Hangi veri gerekir?
5. Edge-case var mı?
6. UI nasıl olmalı?

---

## 🔚 Kısa Özet

> Basit düşün, araba odaklı kal, karar desteğini güçlendir, gereksiz karmaşıklıktan kaçın.
