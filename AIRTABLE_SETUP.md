# Waitlist Airtable Setup

This guide explains how to set up Airtable for the waitlist feature.

## Step 1: Create an Airtable Account

1. Go to [Airtable](https://airtable.com/) and sign up for a free account
2. Create a new base or use an existing one

## Step 2: Create a Waitlist Table

In your Airtable base, create a table with the following fields:

| Field Name | Field Type       | Description          |
| ---------- | ---------------- | -------------------- |
| Name       | Single line text | User's name          |
| Email      | Email            | User's email address |
| Timestamp  | Date and time    | Submission timestamp |

**Important:** Make sure the field names match exactly (case-sensitive):

- `Name`
- `Email`
- `Timestamp`

You can add additional fields for tracking or organizing, but these three are required.

## Step 3: Get Your Airtable API Key

1. Go to [Airtable Account](https://airtable.com/account)
2. In the "API" section, click "Generate API key" or view your existing key
3. Copy your API key (keep it secure!)

**Note:** Airtable is transitioning to Personal Access Tokens. If you don't see an API key option:

1. Go to [Airtable Tokens](https://airtable.com/create/tokens)
2. Create a new token with the following scopes:
   - `data.records:read`
   - `data.records:write`
3. Add your base to the token's access list
4. Copy the token (this is your API key)

## Step 4: Get Your Base ID

1. Go to [Airtable API Documentation](https://airtable.com/api)
2. Select your base
3. Your Base ID will be shown in the introduction (starts with `app...`)
4. Or find it in your base URL: `https://airtable.com/app[YOUR_BASE_ID]/...`

## Step 5: Configure Environment Variables

Add the following to your `.env.local` file:

```bash
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Waitlist
```

Replace:

- `your_api_key_here` with your actual API key or Personal Access Token
- `appXXXXXXXXXXXXXX` with your actual Base ID
- `Waitlist` with your table name (if different)

## Step 6: Test the Integration

1. Restart your development server
2. Go to `/waitlist` on your site
3. Submit a test entry
4. Check your Airtable base to confirm the record was created

## Troubleshooting

### "Service configuration error"

- Make sure all environment variables are set correctly
- Restart your development server after adding env variables

### "This email is already on the waitlist"

- The system checks for duplicate emails (case-insensitive)
- Check your Airtable table for existing entries

### API errors

- Verify your API key has the correct permissions
- Ensure the field names in Airtable match exactly: `Name`, `Email`, `Timestamp`
- Check that the table name matches the `AIRTABLE_TABLE_NAME` env variable

## Security Notes

- **Never commit your `.env.local` file** to version control
- Keep your API key/token secure and private
- Use environment variables for all sensitive data
- Consider using Airtable's IP allowlisting for production environments

## Additional Features

You can extend the Airtable table with additional fields:

- Status (Single select): `Pending`, `Contacted`, `Converted`
- Source (Single select): Track where users came from
- Notes (Long text): Add internal notes
- Tags (Multiple select): Categorize entries

These additional fields won't affect the form submission - the API only writes to Name, Email, and Timestamp.
