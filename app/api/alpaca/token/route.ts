import { NextRequest, NextResponse } from 'next/server';

/**
 * Alpaca OAuth Token Exchange Endpoint
 *
 * This endpoint exchanges an authorization code for an access token.
 * The client_secret is kept secure on the server side.
 *
 * POST /api/alpaca/token
 * Body: { code: string, redirect_uri: string }
 * Returns: { access_token: string, token_type: string, scope: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, redirect_uri } = body;

    // Validate required fields
    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      );
    }

    if (!redirect_uri) {
      return NextResponse.json(
        { error: 'Redirect URI is required' },
        { status: 400 }
      );
    }

    // Validate environment variables
    const clientId = process.env.ALPACA_CLIENT_ID;
    const clientSecret = process.env.ALPACA_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error('Missing Alpaca OAuth credentials in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://api.alpaca.markets/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri,
      }),
    });

    const tokenData = await tokenResponse.json();

    // Forward Alpaca's response status
    if (!tokenResponse.ok) {
      console.error('Alpaca token exchange failed:', tokenData);
      return NextResponse.json(tokenData, { status: tokenResponse.status });
    }

    // Return the access token to the client
    return NextResponse.json({
      access_token: tokenData.access_token,
      token_type: tokenData.token_type,
      scope: tokenData.scope,
    });

  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
