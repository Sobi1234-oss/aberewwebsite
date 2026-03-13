import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "instant" is usually better for page transitions 
    // to avoid a weird sliding effect while the new page loads
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", 
    });
  }, [pathname]); // This triggers every time the URL path changes

  return null;
};

export default ScrollToTop;