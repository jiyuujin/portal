"use client";

import { Button } from "@/components/ui/button";
import { useChatBot } from "@/composables/useChatBot";

export function ChatButton() {
  const { open } = useChatBot();

  return (
    <Button
      onClick={open}
      className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-zinc-950 hover:from-amber-400 hover:to-orange-400 font-semibold shadow-lg shadow-orange-500/20 transition-all"
    >
      Contact Me
    </Button>
  );
}
