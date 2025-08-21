import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fid = searchParams.get('fid');

  if (!fid) {
    return NextResponse.json(
      { error: 'FID is required' },
      { status: 400 }
    );
  }

  if (!process.env.API_KEY) {
    return NextResponse.json(
      { error: 'API key is not configured' },
      { status: 500 }
    );
  }

  const url = `https://build.wield.xyz/farcaster/v2/casts?limit=100&fid=${fid}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'API-KEY': process.env.API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching casts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch casts' },
      { status: 500 }
    );
  }
}
