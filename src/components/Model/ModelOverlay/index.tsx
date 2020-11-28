import React, { useState, useCallback, useLayoutEffect } from "react";

import { Container } from "./styles";
import useModelScroll from "../useWrapperScroll";
import { CarModel } from "../ModelsContext";
import { useTransform, motionValue } from "framer-motion";

interface Props {
  model: CarModel;
}

type sectionDimensions = Pick<HTMLDivElement, "offsetTop" | "offsetHeight">;

const ModelOverlay: React.FC<Props> = ({ children, model }) => {
  const { scrollY } = useModelScroll();

  const getSectionDimensions = useCallback(() => {
    return {
      offsetTop: model.sectionRef.current?.offsetTop,
      offsetHeight: model.sectionRef.current?.offsetHeight,
    } as sectionDimensions;
  }, [model.sectionRef]);

  const [dimension, setDimensions] = useState<sectionDimensions>(
    getSectionDimensions()
  );

  useLayoutEffect(() => {
    function onResize() {
      window.requestAnimationFrame(() => setDimensions(getSectionDimensions()));
    }
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [getSectionDimensions]);

  const sectionScrollProgress = useTransform(
    scrollY,
    (y) => (y - dimension.offsetTop) / dimension.offsetHeight
  );

  const opacity = useTransform(
    sectionScrollProgress,
    [-0.42, -0.05, 0.05, 0.42],
    [0, 1, 1, 0]
  );

  const pointerEvents = useTransform(opacity, (value) =>
    value > 0 ? "auto" : "none"
  );
  return <Container style={{ opacity, pointerEvents }}>{children}</Container>;
};

export default ModelOverlay;
