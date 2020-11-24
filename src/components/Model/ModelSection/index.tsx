import React from "react";

import { Container } from "./styles";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  modelName: string;
  overLayNode: React.ReactNode;
}

const ModelSection: React.FC<Props> = ({
  modelName,
  overLayNode,
  children,
  ...props
}) => {
  return <Container {...props}>{children}</Container>;
};

export default ModelSection;
