"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          appearance?: "interaction-only" | "always" | "execute";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
      isExpired: (widgetId: string) => boolean;
    };
  }
}

export interface TurnstileWidgetRef {
  reset: () => void;
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

const TurnstileWidget = forwardRef<TurnstileWidgetRef, TurnstileWidgetProps>(
  ({ onVerify, onExpire, onError }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const callbacksRef = useRef({ onVerify, onExpire, onError });

    // Keep callbacks fresh without re-running effect
    callbacksRef.current = { onVerify, onExpire, onError };

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    const renderWidget = useCallback(() => {
      if (!containerRef.current || !window.turnstile || widgetIdRef.current) {
        return;
      }

      const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      if (!sitekey) {
        console.error("[Turnstile] NEXT_PUBLIC_TURNSTILE_SITE_KEY not set");
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey,
        appearance: "interaction-only",
        callback: (token: string) => callbacksRef.current.onVerify(token),
        "expired-callback": () => callbacksRef.current.onExpire?.(),
        "error-callback": () => callbacksRef.current.onError?.(),
      });
    }, []);

    useEffect(() => {
      // If Turnstile script is already loaded, render immediately
      if (window.turnstile) {
        renderWidget();
        return;
      }

      // Poll for Turnstile script to become available
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds at 100ms intervals
      const interval = setInterval(() => {
        attempts++;
        if (window.turnstile) {
          clearInterval(interval);
          renderWidget();
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          console.error("[Turnstile] Script failed to load after 5 seconds");
        }
      }, 100);

      return () => {
        clearInterval(interval);
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, [renderWidget]);

    return (
      <>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />
        <div ref={containerRef} />
      </>
    );
  },
);

TurnstileWidget.displayName = "TurnstileWidget";

export { TurnstileWidget };
