# 🚗 CAR MARKETPLACE PLATFORM – SYSTEM DESIGN DOCUMENT (V2)
**Level:** Senior Product Designer + Senior Backend Engineer  
**Goal:** Build a scalable, data-driven, trust-first automotive marketplace

---

# 1. 🎯 PRODUCT CORE PRINCIPLES

## 1.1 North Star
> “Help users find the right car faster with confidence.”

## 1.2 Core Differentiators
- Decision support (not just listing)
- Deep filtering system
- Trust & verification layer
- Price intelligence engine

---

# 2. 🧱 SYSTEM ARCHITECTURE (HIGH LEVEL)

## 2.1 Frontend
- Mobile App (React Native / Flutter)
- Web App (Next.js)

## 2.2 Backend Services
- API Gateway
- Auth Service
- Listing Service
- Search Service (ElasticSearch)
- Pricing Engine
- Trust & Verification Service
- Notification Service

## 2.3 Data Layer
- PostgreSQL (relational data)
- ElasticSearch (search/filter)
- Redis (cache)
- S3 (images/videos)

---

# 3. 🗂️ CORE DATA MODELS

## 3.1 Car Listing (Simplified JSON)
```json
{
  "id": "uuid",
  "title": "BMW 320i M Sport",
  "price": 950000,
  "year": 2020,
  "km": 45000,
  "fuel": "Petrol",
  "transmission": "Automatic",
  "location": {
    "city": "Istanbul",
    "lat": 41.0,
    "lng": 29.0
  },
  "features": ["CarPlay", "Sunroof"],
  "damage": {
    "painted_parts": ["hood"],
    "changed_parts": [],
    "tramer": 0
  },
  "seller": {
    "type": "dealer",
    "score": 4.6
  },
  "price_score": 82,
  "trust_score": 91
}
```

---

# 4. 🔍 SEARCH & FILTER SYSTEM

## 4.1 Filter Structure
```json
{
  "price_range": [500000, 1000000],
  "km_range": [0, 100000],
  "city": ["Istanbul", "Bursa"],
  "radius_km": 200,
  "fuel": ["Petrol", "Diesel"],
  "features": ["CarPlay"],
  "damage": {
    "max_tramer": 0,
    "no_painted_roof": true
  }
}
```

## 4.2 Sorting Logic
- price asc
- km asc
- price/km ratio
- newest
- best deal score

---

# 5. 💰 PRICE INTELLIGENCE ENGINE

## 5.1 Inputs
- Similar listings
- Historical price data
- Region-based averages

## 5.2 Output
```json
{
  "price_score": 85,
  "label": "Good Price",
  "market_range": [900000, 1000000]
}
```

---

# 6. 🔐 TRUST SCORE ENGINE

## 6.1 Inputs
- Seller verification
- Listing completeness
- Price deviation
- User reports

## 6.2 Output
```json
{
  "trust_score": 92,
  "level": "High"
}
```

---

# 7. 🧩 UI COMPONENT SYSTEM

## 7.1 Listing Card
- Image
- Price
- Price Score Badge
- Trust Badge
- Key specs
- Favorite / Compare buttons

## 7.2 Detail Page Sections
1. Gallery
2. Summary
3. Price Analysis
4. Trust & Damage
5. Features
6. Seller Info
7. Similar Cars

---

# 8. 🔄 USER FLOWS (ADVANCED)

## 8.1 Smart Search Flow
- User selects filters
- System suggests refinements
- Shows “best matches first”

## 8.2 Decision Flow
- Compare vehicles
- View price analysis
- Check trust score
- Contact seller

---

# 9. ⚙️ EDGE CASES

- No results → suggest alternatives
- Suspicious price → warning banner
- Missing data → reduce trust score

---

# 10. 🚀 SCALABILITY

- Microservice architecture
- Horizontal scaling (Kubernetes)
- CDN for media

---

# 11. 🔮 FUTURE EXTENSIONS

- AI car recommendation
- Chat-based search
- Image recognition (upload car photo → find similar)
- Fraud detection ML

---

# 12. 📌 FINAL NOTE

This system is not a listing platform.  
It is a **decision engine for buying cars**.
