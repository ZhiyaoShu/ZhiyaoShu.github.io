import { NextRequest, NextResponse } from 'next/server';
import { getMdxContents } from '../../research/utils';

export async function GET(req: NextRequest) {
  try {
    const contents = await getMdxContents();
    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load MDX contents' }, { status: 500 });
  }
}
