# URL Shortener API

This is a URL shortener API built using Node.js and MongoDB. The API provides features like URL shortening, redirection with tracking, analytics, custom short codes, URL expiration, and more.

## Features
- **Shorten URLs:** Generate unique or custom short codes for URLs.
- **Redirection with Tracking:** Track visits, unique visitors, and devices.
- **URL Analytics:** Retrieve detailed analytics including total visits, unique visitors, and visit breakdown by device type.
- **Custom Short Codes:** Specify custom short codes during URL shortening.
- **URL Expiration:** Expire shortened URLs after a specific timeframe.
- **Rate Limiting:** Implement rate limits to prevent abuse.
- **Background Jobs:** Use background jobs for analytics aggregation.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/sahil078/url-shortener-api.git
cd url-shortener-api
npm install
