import React, { useState, useCallback, useLayoutEffect } from "react";

import { Container } from "./styles";
import useModelScroll from "../useWrapperScroll";
import { CarModel } from "../ModelsContext";

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

  return <Container>{children}</Container>;
};

export default ModelOverlay;
