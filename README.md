# 🌐 MetaFetch API

MetaFetch is a lightweight and efficient REST API built with NestJS that allows developers to extract metadata from any public web page using a single URL. It also provides an advanced `/metascore` endpoint to evaluate the quality of metadata for SEO and social sharing purposes.

---

## 🚀 Endpoints

### `GET /metafetch?url=https://example.com`

Returns all available meta tags from the provided URL.

#### ✅ Sample Response:
```json
{
  "title": "Example Domain",
  "meta": {
    "description": "This domain is for use in illustrative examples.",
    "og:title": "Example Domain",
    "og:description": "An example site",
    "twitter:card": "summary",
    "twitter:title": "Example Domain"
  },
  "favicon": "https://example.com/favicon.ico",
  "canonical": "https://example.com"
}
```
### `GET /metascore?url=https://example.com`

Returns an analysis of the URL's metadata quality, including score, missing tags, and improvement tips.

#### ✅ Sample Response:
```json
{
  "url": "https://example.com",
  "score": 72,
  "present": [
    "title",
    "meta.description",
    "og:title",
    "og:description"
  ],
  "missing": [
    "meta.keywords",
    "og:image",
    "twitter:card"
  ],
  "recommendations": [
    "Add a Twitter Card to improve link sharing.",
    "Include an OpenGraph image for better previews."
  ]
}
```
## 🛠️ Tech Stack
- Framework: NestJS
- HTML Parsing: Cheerio
- Validation: Zod (optional)
- HTTP Client: Axios

## 💡 Use Cases
- Generating link previews
- Lightweight SEO audits
- Enriching content with social metadata
- Integrating into CMS or newsletter systems
 
## 📦 Installation
```bash
git clone https://github.com/your-username/metafetch-api.git
cd metafetch-api
npm install
npm run start:dev
```
## 📄 License
This project is licensed under the MIT License.
Feel free to use, modify, and contribute!

## 🔗 About
Maintained by Atelier Busco — bridging code and purpose with passion.