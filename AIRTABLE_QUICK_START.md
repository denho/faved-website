# Quick Setup - Airtable Waitlist (Client-Side)

## ⚠️ Security Warning

This implementation exposes your Airtable token in the browser. Use ONLY a scoped token with write-only permissions.

## Quick Start

### 1. Create Scoped Token

```
https://airtable.com/create/tokens

Settings:
- Name: "Faved Waitlist - Public Write Only"
- Scopes: ✅ data.records:write ONLY
- Access: Your waitlist base only
- Expiration: 30-90 days
```

### 2. Create Table Fields

```
Name      → Single line text
Email     → Email
Timestamp → Date and time
```

### 3. Add to .env.local

```bash
NEXT_PUBLIC_AIRTABLE_TOKEN=patXXXXXXXXXXXXXX
NEXT_PUBLIC_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
NEXT_PUBLIC_AIRTABLE_TABLE_NAME=Waitlist
```

### 4. Restart Server

```bash
yarn dev
# or
npm run dev
```

### 5. Test

Go to `/waitlist` and submit a test entry.
