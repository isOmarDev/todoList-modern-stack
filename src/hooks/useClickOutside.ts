import { useEffect } from 'react';

type EventType =
  | 'mousedown'
  | 'mouseup'
  | 'touchstart'
  | 'touchend'
  | 'focusin'
  | 'focusout';

type Events = MouseEvent | TouchEvent | FocusEvent;

export const useOnClickOutside = <
  T extends HTMLElement = HTMLElement,
>(
  ref: React.RefObject<T> | React.RefObject<T>[],
  handler: (event: Events) => void,
  eventType: EventType = 'mousedown',
  eventListenerOptions: boolean | AddEventListenerOptions = {},
) => {
  useEffect(() => {
    const listener = (e: Events) => {
      const target = e.target as Node;

      // Do nothing if the target is not connected element with document
      if (!target || !target.isConnected) {
        return;
      }

      const isOutside = Array.isArray(ref)
        ? ref
            .filter((r) => Boolean(r.current))
            .every((r) => r.current && !r.current.contains(target))
        : ref.current && !ref.current.contains(target);

      if (isOutside) {
        handler(e);
      }
    };

    document.addEventListener(
      eventType,
      listener,
      eventListenerOptions,
    );

    return () => {
      document.removeEventListener(
        eventType,
        listener,
        eventListenerOptions,
      );
    };
  }, [ref, handler, eventListenerOptions, eventType]);
};
