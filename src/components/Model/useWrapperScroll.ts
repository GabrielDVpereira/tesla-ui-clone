import { useMotionValue } from "framer-motion";
import { useContext, useEffect } from "react";

import ModelsContext from "./ModelsContext";

export default function useWrapperScroll() {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  const { wrapperRef } = useContext(ModelsContext);

  useEffect(() => {
    scrollY.onChange((scrollY) => {
      console.log({ scrollY });
    });
    scrollYProgress.onChange((scrollYProgress) => {
      console.log({ scrollYProgress });
    });
  }, [scrollYProgress, scrollY]);

  useEffect(() => {
    const element = wrapperRef.current;
    if (element) {
      const updateScrollValue = () => {
        const { scrollTop, scrollHeight, offsetHeight } = element;
        const fullScroll = scrollHeight - offsetHeight;

        scrollY.set(scrollTop);
        scrollYProgress.set(scrollTop / fullScroll);
      };

      element.addEventListener("scroll", updateScrollValue);

      return () => element?.removeEventListener("scroll", updateScrollValue);
    }
  }, [wrapperRef, scrollY, scrollYProgress]);

  return { scrollY, scrollYProgress };
}
