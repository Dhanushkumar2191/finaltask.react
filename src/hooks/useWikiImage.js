import { useEffect, useState } from "react";

const KEY = "wikiImg_v1";
const cache = (() => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } })();
const pending = {};

const load = (title) => {
  if (pending[title]) return pending[title];
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`;
  pending[title] = fetch(url)
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((d) => {
      const thumb = d.thumbnail?.source;
      if (!thumb) throw new Error("no image");
      const w = d.originalimage?.width || 0;
      const src = w >= 960 ? thumb.replace(/\/\d+px-/, "/960px-") : d.originalimage?.source || thumb;
      cache[title] = src;
      try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch {}
      return src;
    });
  return pending[title];
};


export function useWikiImage(title) {
  const [state, setState] = useState({ src: cache[title] || null, loading: !cache[title] && !!title, failed: false });
  useEffect(() => {
    if (!title) { setState({ src: null, loading: false, failed: true }); return; }
    if (cache[title]) { setState({ src: cache[title], loading: false, failed: false }); return; }
    let alive = true;
    setState({ src: null, loading: true, failed: false });
    load(title)
      .then((src) => alive && setState({ src, loading: false, failed: false }))
      .catch(() => alive && setState({ src: null, loading: false, failed: true }));
    return () => { alive = false; };
  }, [title]);
  return state;
}