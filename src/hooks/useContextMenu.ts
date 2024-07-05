import { useState, useEffect, useCallback, RefObject } from "react";

type AnchorPoint = {
  x: number;
  y: number;
};

type UseContextMenuReturn = {
  anchorPoint: AnchorPoint;
  show: boolean;
};

const useContextMenu = (ref: RefObject<HTMLElement>): UseContextMenuReturn => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault();
    setAnchorPoint({ x: event.screenX, y: event.screenY });
    setShow(true);
  }, []);

  const handleClick = useCallback(() => {
    show && setShow(false);
  }, [show]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("contextmenu", handleContextMenu);
    }
    document.addEventListener("click", handleClick);

    return () => {
      if (element) {
        element.removeEventListener("contextmenu", handleContextMenu);
      }
      document.removeEventListener("click", handleClick);
    };
  }, [ref, handleClick, handleContextMenu]);

  return { anchorPoint, show };
};

export default useContextMenu;
