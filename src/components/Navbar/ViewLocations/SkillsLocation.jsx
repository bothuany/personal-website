import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTab } from "../../../context/TabContext";

function SkillsLocation() {
  const { setTab } = useTab();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setTab("skills_tab");
    }
  }, [inView, setTab]);
  return <div ref={ref}></div>;
}

export default SkillsLocation;
