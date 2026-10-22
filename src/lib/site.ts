/** URL pública. Defina NEXT_PUBLIC_SITE_URL quando tiver domínio próprio. */
export const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || undefined;
export const siteUrl = configuredSiteUrl ?? "http://localhost:3000";
