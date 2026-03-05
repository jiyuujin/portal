import { useEffect, useCallback } from "react";
import { surveyBotId, surveyBotUrl } from "@/lib/constants";

declare global {
  interface Window {
    ChatBot: any;
  }
}

export function useChatBot() {
  const scriptSrc = `${surveyBotUrl}?id=${surveyBotId}`;

  const open = useCallback(() => {
    const checkAndOpen = () => {
      if (window.ChatBot && typeof window.ChatBot.toggle === "function") {
        window.ChatBot.toggle();
      } else {
        setTimeout(checkAndOpen, 100);
      }
    };
    checkAndOpen();
  }, []);

  useEffect(() => {
    if (document.querySelector(`script[src^="${scriptSrc}"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);
  }, [scriptSrc]);

  return { open };
}
