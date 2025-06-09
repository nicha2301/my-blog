import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'API端点正常工作',
    timestamp: new Date().toISOString()
  });
} 