const GATEWAY_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

// Querystring a partir de { k: v }
const toQuery = (params = {}) =>
  Object.entries(params)
    .filter(([, v]) => v != null && v !== "")
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
    )
    .join("&");

// Wrapper de fetch → devuelve JSON; adjunta status en errores
async function DoRequest(
  path,
  method = "GET",
  body = null,
  { params, signal, headers } = {}
) {
  const qs = params && Object.keys(params).length ? `?${toQuery(params)}` : "";
  const url = `${GATEWAY_BASE}${path}${qs}`;

  const opts = {
    method,
    headers: { "Content-Type": "application/json", ...(headers ?? {}) },
    credentials: "include",
    signal,
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const text = await res.text().catch(() => "");
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {}

  if (!res.ok) {
    const err = new Error(
      `[${res.status}] ${
        json?.message || res.statusText || text || "HTTP error"
      }`
    );
    err.status = res.status; // ← importante para decidir fallbacks
    err.body = json ?? text;
    throw err;
  }
  return json;
}

/** -------- Endpoints Search (vía Gateway) -------- **/

// GET /v1/items (búsqueda básica original)
export const getItemsBasic = (params, opts) =>
  DoRequest("/ms-search/v1/items", "GET", null, { ...(opts ?? {}), params });

// GET /v1/search (full-text simple)
export const searchSimple = (params, opts) =>
  DoRequest("/ms-search/v1/search", "GET", null, {
    ...(opts ?? {}),
    params: {
      q: params?.q || "",
      fuzziness: params?.fuzziness ?? "AUTO",
      page: params?.page || 1,
    },
  });

// GET /v1/search/advanced (con fallback → /search → /items)
export const searchAdvanced = async (params = {}, opts) => {
  try {
    return await DoRequest("/ms-search/v1/search/advanced", "GET", null, {
      ...(opts ?? {}),
      params: {
        q: params.q || "",
        category: params.category || "",
        manufacturer: params.manufacturer || "",
        minPrice: params.minPrice ?? "",
        maxPrice: params.maxPrice ?? "",
        page: params.page || 1,
      },
    });
  } catch (e) {
    if ([400, 404, 405, 501].includes(e.status)) {
      // cae a /search
      try {
        return await searchSimple(params, opts);
      } catch {
        // último fallback: /items
        return await getItemsBasic(
          {
            category: params.category || "",
            manufacturer: params.manufacturer || "",
            product: params.q || "",
            page: params.page || 1,
          },
          opts
        );
      }
    }
    throw e;
  }
};

// GET /v1/suggest
export const suggest = (term, opts) =>
  DoRequest("/ms-search/v1/suggest", "GET", null, {
    ...(opts ?? {}),
    params: { q: term, limit: opts?.limit ?? 5 },
  });

// GET /v1/facets
export const getFacets = (filters = {}, opts) =>
  DoRequest("/ms-search/v1/facets", "GET", null, {
    ...(opts ?? {}),
    params: {
      q: filters.q || "",
      category: filters.category || "",
      manufacturer: filters.manufacturer || "",
    },
  });

export const newAbort = () => new AbortController();

export default DoRequest;
