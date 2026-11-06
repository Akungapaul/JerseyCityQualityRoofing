import type { LeadNotificationPayload } from "@/types/form";

/**
 * Durable lead storage (CRO Phase 0.3, 2026-11-06).
 *
 * The lead pipeline used to be a single Resend email: if that email was
 * accepted and then bounced or filtered, the lead was unrecoverable and
 * no record existed anywhere. This module makes a stored lead the system
 * of record when a database is configured; the email becomes a
 * notification sent after the store attempt.
 *
 * Activation: set LEAD_DATABASE_URL (e.g. a Neon Postgres connection
 * string) in the deployment environment. When the variable is unset the
 * store is a no-op that reports { stored: false, configured: false } and
 * the caller falls back to the previous email-only behavior, with the
 * lead ID still included in the email and the structured server log.
 *
 * The Neon driver is imported lazily so builds and tests without the
 * env var never load it.
 */

export interface StoreLeadResult {
  stored: boolean;
  configured: boolean;
  error?: string;
}

/** Human-referenceable lead ID, e.g. "JCQR-9F3K2QX7". */
export function generateLeadId(): string {
  const rand = crypto
    .randomUUID()
    .replace(/-/g, "")
    .slice(0, 8)
    .toUpperCase();
  return `JCQR-${rand}`;
}

export function isLeadStoreConfigured(): boolean {
  return Boolean(process.env.LEAD_DATABASE_URL);
}

type NeonSql = (
  strings: TemplateStringsArray,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...params: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any[]>;

let sqlPromise: Promise<NeonSql | null> | null = null;
let tableReadyPromise: Promise<void> | null = null;

async function getSql(): Promise<NeonSql | null> {
  const url = process.env.LEAD_DATABASE_URL;
  if (!url) return null;
  if (!sqlPromise) {
    sqlPromise = (async () => {
      const { neon } = await import("@neondatabase/serverless");
      return neon(url) as unknown as NeonSql;
    })();
  }
  return sqlPromise;
}

async function ensureTable(sql: NeonSql): Promise<void> {
  if (!tableReadyPromise) {
    tableReadyPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT,
          service_type TEXT NOT NULL,
          address TEXT,
          message TEXT,
          source_url TEXT,
          page_title TEXT,
          form_variant TEXT,
          user_agent TEXT
        )
      `;
    })();
  }
  return tableReadyPromise;
}

/**
 * Insert the lead into the durable store. Never throws: a storage
 * failure is reported in the result so the caller can still notify by
 * email and log an operator alert against the lead ID.
 */
export async function storeLead(
  lead: LeadNotificationPayload,
): Promise<StoreLeadResult> {
  if (!isLeadStoreConfigured()) {
    return { stored: false, configured: false };
  }

  try {
    const sql = await getSql();
    if (!sql) return { stored: false, configured: false };

    await ensureTable(sql);
    await sql`
      INSERT INTO leads (
        id, name, phone, email, service_type, address, message,
        source_url, page_title, form_variant, user_agent
      ) VALUES (
        ${lead.leadId}, ${lead.name}, ${lead.phone}, ${lead.email ?? null},
        ${lead.serviceType}, ${lead.address ?? null}, ${lead.message ?? null},
        ${lead.sourceUrl}, ${lead.pageTitle}, ${lead.formVariant},
        ${lead.userAgent ?? null}
      )
    `;
    return { stored: true, configured: true };
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "lead_store_failed",
        leadId: lead.leadId,
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return {
      stored: false,
      configured: true,
      error: error instanceof Error ? error.message : "Lead store failed",
    };
  }
}
