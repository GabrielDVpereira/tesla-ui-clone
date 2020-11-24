import React from "react";
import DefaultOverlayContent from "../DefaultOverlayContent";
import { ModelSection, ModelsWrapper } from "../Model";

import { Container } from "./styles";

const Page: React.FC = () => {
  return (
    <Container>
      <ModelsWrapper>
        <div>
          {[
            "Model One",
            "Model Two",
            "Model Three",
            "Model Four",
            "Model Five",
            "Model Six",
            "Model Seven",
          ].map((modelName) => (
            <ModelSection
              key={modelName}
              className="colored"
              modelName={modelName}
              overLayNode={
                <DefaultOverlayContent
                  label={modelName}
                  description="Order Online for Delivery"
                />
              }
            />
          ))}
        </div>
      </ModelsWrapper>
    </Container>
  );
};

export default Page;
