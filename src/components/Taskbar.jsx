"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import StartMenu from "./StartMenu";
import { useXPStore } from "./xpStore";

export default function Taskbar({
  openWindows = [],
  onToggleWindow = () => {},
  onFocusWindow = () => {},
  activeWindowId = null,
  onLaunch = () => {},
  onLogOff = () => {},
  onShutdown = () => {},
}) {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [showStart, setShowStart] = useState(false);
  const startWrapRef = useRef(null);

  // store fallback
  const storeWindows = useXPStore((s) => s.windows);
  const storeActive  = useXPStore((s) => s.activeId);

  const usingProps  = Array.isArray(openWindows) && openWindows.length > 0;
  const effWindows  = usingProps ? openWindows : (storeWindows || []);
  const effActiveId = (activeWindowId ?? storeActive);

  // clock
  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 30000);
    return () => clearInterval(t);
  }, []);

  // Win/ESC for Start
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Meta") setShowStart((s) => !s);
      if (e.key === "Escape") setShowStart(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close Start on outside click
  useEffect(() => {
    const onDown = (e) => {
      if (!startWrapRef.current) return;
      if (!startWrapRef.current.contains(e.target)) setShowStart(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, []);

  // Normalize -> tasks (NO ellipsis here; we’ll show full names)
  const tasks = useMemo(
    () =>
      (effWindows || []).map((w) => ({
        id: w.id,
        title: w.title || w.id,
        icon: w.icon || "/assets/Folder.png",
        minimized: !!w.minimized,
        active: effActiveId === w.id && !w.minimized,
      })),
    [effWindows, effActiveId]
  );

  // XP-like tab clicks
  const onTaskClick = (t) => {
    if (!t?.id) return;
    if (usingProps) {
      if (t.minimized) return onToggleWindow(t.id); // restore
      if (t.active)    return onToggleWindow(t.id); // minimize
      return onFocusWindow(t.id);                   // focus
    }
    // fallback via events
    if (t.minimized || t.active) {
      window.dispatchEvent(new CustomEvent("xp:toggle", { detail: t.id }));
    } else {
      window.dispatchEvent(new CustomEvent("xp:focus", { detail: t.id }));
    }
  };

  /* ---------- PREMIUM TAB STRIP: scroll buttons + auto-scroll active ---------- */
  const tabsRef = useRef(null);
  const [overflowL, setOverflowL] = useState(false);
  const [overflowR, setOverflowR] = useState(false);

  const updateOverflow = () => {
    const el = tabsRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setOverflowL(scrollLeft > 2);
    setOverflowR(scrollLeft + clientWidth < scrollWidth - 2);
  };

  const scrollByAmount = (dx) => {
    const el = tabsRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  // Recompute on resize/scroll/content change
  useEffect(() => {
    updateOverflow();
    const el = tabsRef.current;
    const onScroll = () => updateOverflow();
    el?.addEventListener("scroll", onScroll);
    const ro = new ResizeObserver(updateOverflow);
    if (el) ro.observe(el);
    const onWin = () => updateOverflow();
    window.addEventListener("resize", onWin);
    return () => {
      el?.removeEventListener("scroll", onScroll);
      ro.disconnect();
      window.removeEventListener("resize", onWin);
    };
  }, [tasks.length]);

  // Auto-scroll active into view
  useEffect(() => {
    if (!tabsRef.current || !effActiveId) return;
    const btn = tabsRef.current.querySelector(`[data-task-id="${CSS.escape(effActiveId)}"]`);
    if (btn) btn.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  }, [effActiveId]);

  return (
    <div
      data-role="xp-taskbar"
      className="fixed bottom-0 left-0 w-full h-10 md:h-12 text-white z-50"
      style={{
        background: "linear-gradient(#2b65d9,#1f49a4)",
        borderTop: "1px solid #173b82",
        boxShadow: "0 -1px 0 #0f2b61, inset 0 1px 0 rgba(255,255,255,0.18)",
        fontFamily: "Tahoma, Segoe UI, system-ui, sans-serif",
      }}
    >
      <div className="h-full grid grid-cols-[auto,1fr,auto] items-center gap-2 px-2">
        {/* START button + anchored menu */}
        <div className="relative" ref={startWrapRef}>
          <button
            onClick={() => setShowStart((s) => !s)}
            className={`px-3 py-1 h-8 md:h-9 rounded-md font-bold border select-none transition-transform ${
              showStart ? "translate-y-[1px]" : ""
            }`}
            style={{
              background: showStart
                ? "linear-gradient(#2f991f,#46c13e)"
                : "linear-gradient(#46c13e,#2f991f)",
              borderColor: "#0a5f1a",
              textShadow: "0 1px 0 rgba(0,0,0,0.35)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.35), 0 1px 0 rgba(0,0,0,0.35)",
            }}
            aria-expanded={showStart}
            aria-haspopup="menu"
          >
            Start
          </button>

          {showStart && (
            <div
              className="absolute left-0 z-[2147483646]"
              style={{ bottom: "calc(100% - 1px)" }}
            >
              <StartMenu onLaunch={(id)=>{onLaunch(id);setShowStart(false)}} onLogOff={()=>{onLogOff();setShowStart(false)}} onShutdown={()=>{onShutdown();setShowStart(false)}} />
            </div>
          )}
        </div>

        {/* CENTER: premium tab strip */}
        <div className="relative h-full flex items-center">
          {/* Left scroll btn */}
          {overflowL && (
            <button
              aria-label="Scroll left"
              onClick={() => scrollByAmount(-180)}
              className="absolute left-0 z-10 h-8 w-6 flex items-center justify-center rounded-sm border
                         bg-gradient-to-b from-[#e6eefc] to-[#b9cdf7]
                         shadow-[inset_0_1px_0_#fff,0_1px_0_rgba(0,0,0,0.2)]"
              style={{ borderColor: "#294c99" }}
            >
              ‹
            </button>
          )}

          {/* Tabs container */}
          <div
            ref={tabsRef}
            className="flex items-center gap-2 overflow-x-auto px-2 mx-6 w-full"
            role="tablist"
            aria-label="Open windows"
            style={{ scrollbarWidth: "thin" }}
            onScroll={updateOverflow}
          >
            {tasks.length === 0 ? (
              <div className="opacity-80 italic">No windows</div>
            ) : (
              tasks.map((t) => (
                <button
                  key={t.id}
                  data-task-id={t.id}
                  role="tab"
                  aria-selected={t.active}
                  title={t.title}
                  onClick={() => onTaskClick(t)}
                  className="inline-flex items-center gap-2 h-8 md:h-9 px-3 rounded-[6px] border
                             text-slate-900 whitespace-nowrap
                             focus:outline-none focus:ring-2 focus:ring-blue-300"
                  style={{
                    // XP Luna gradients + bevels
                    background: t.active
                      ? "linear-gradient(#bcd2fb,#eaf0fe)"
                      : "linear-gradient(#eaf0fe,#c7d7fb)",
                    borderColor: t.active ? "#1c3b7f" : "#3157a4",
                    boxShadow: t.active
                      ? "inset 0 2px 4px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.35)"
                      : "inset 0 1px 0 #fff, 0 1px 0 rgba(0,0,0,0.2)",
                    transform: t.active ? "translateY(-1px)" : "none",
                    opacity: t.minimized ? 0.9 : 1,
                    fontWeight: t.active ? 700 : 600,
                  }}
                >
                  <img
                    src={t.icon}
                    alt=""
                    className="w-4 h-4 object-contain shrink-0"
                    draggable="false"
                  />
                  {/* FULL NAME — no ellipsis */}
                  <span className="leading-none">{t.title}</span>
                </button>
              ))
            )}
          </div>

          {/* Right scroll btn */}
          {overflowR && (
            <button
              aria-label="Scroll right"
              onClick={() => scrollByAmount(180)}
              className="absolute right-0 z-10 h-8 w-6 flex items-center justify-center rounded-sm border
                         bg-gradient-to-b from-[#e6eefc] to-[#b9cdf7]
                         shadow-[inset_0_1px_0_#fff,0_1px_0_rgba(0,0,0,0.2)]"
              style={{ borderColor: "#294c99" }}
            >
              ›
            </button>
          )}

          {/* Edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-6"
            style={{ background: "linear-gradient(90deg, rgba(31,73,164,0.9), rgba(31,73,164,0))" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-full w-6"
            style={{ background: "linear-gradient(-90deg, rgba(31,73,164,0.9), rgba(31,73,164,0))" }}
          />
        </div>

        {/* RIGHT: tray + clock */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 pr-1">
            <img src="/assets/Language.png" className="w-4 h-4" alt="" />
            <img src="/assets/FullScreen.png" className="w-4 h-4" alt="" />
            <img src="/assets/Volume.png" className="w-4 h-4" alt="" />
          </div>
          <div
            className="px-2 py-0.5 rounded-sm font-mono"
            style={{
              background: "linear-gradient(#3d74d4,#2a58b7)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
              border: "1px solid rgba(0,0,0,0.25)",
              minWidth: 58,
              textAlign: "center",
            }}
          >
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
