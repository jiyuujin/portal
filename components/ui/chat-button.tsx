"use client";

import { Button } from "@/components/ui/button";
import { useChatBot } from "@/composables/useChatBot";

export function ChatButton() {
  const { open } = useChatBot();

  return <Button onClick={open}>Contact Me</Button>;
}
