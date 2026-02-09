import { NextRequest, NextResponse } from 'next/server';
import { webhookCallback } from 'grammy';
import { telegramBot } from '@/lib/telegram/bot-client';

const handleUpdate = webhookCallback(telegramBot, 'std/http');

export async function POST(req: NextRequest) {
  try {
    return await handleUpdate(req);
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}