import React, { FunctionComponent } from "react";
import { Flex  } from "./Components";
import { QuestionGame } from "./Games";

export const Home: FunctionComponent<{}> = () => {
  return (
    <Flex full style={{ backgroundColor: "#000000" }}>
      <QuestionGame />
    </Flex>
  )
};
