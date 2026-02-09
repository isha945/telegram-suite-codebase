'use client';

import { useTelegramLink } from '@/hooks/useTelegramLink';
import { Button } from '@/components/ui/button';

export function TelegramLinkButton() {
  const { link, isLoading, isLinked } = useTelegramLink();

  return (
    <Button 
      onClick={link} 
      disabled={isLoading || isLinked}
      variant={isLinked ? "outline" : "default"}
    >
      {isLinked ? "✓ Linked to Telegram" : "Link Telegram Profile"}
    </Button>
  );
}