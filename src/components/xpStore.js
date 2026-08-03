// Minimal global store for windows/taskbar using useSyncExternalStore (React 18+)
import { useSyncExternalStore } from "react";

const _store = {
  state: { windows: [], activeId: null },
  listeners: new Set(),
};

function getSnapshot() {
  return _store.state;
}
function subscribe(listener) {
  _store.listeners.add(listener);
  return () => _store.listeners.delete(listener);
}

export function xpGet() {
  return _store.state;
}
export function xpSet(partial) {
  _store.state = { ..._store.state, ...partial };
  _store.listeners.forEach((fn) => fn());
}

// Hook with selector
export function useXPStore(selector = (s) => s) {
  return useSyncExternalStore(
    subscribe,
    () => selector(getSnapshot()),
    () => selector(getSnapshot())
  );
}
