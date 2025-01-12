import React, { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useTab } from "../../../context/TabContext";

const AboutMeLocation = React.memo(() => {
  const { setTab } = useTab();

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "-80px 0px 0px 0px", // Account for navbar height
    trackVisibility: true,
    delay: 100, // Debounce the visibility changes
  });

  const handleInView = useCallback(() => {
    if (inView) {
      setTab("about_me_tab");
    }
  }, [inView, setTab]);

  useEffect(() => {
    handleInView();
  }, [handleInView]);

  return <div ref={ref} style={{ transform: "translate3d(0,0,0)" }}></div>;
});

export default AboutMeLocation;
