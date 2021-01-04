import React from "react";
import { addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
export const parameters = {
         actions: { argTypesRegex: "^on[A-Z].*" },
         info: {
           inline: false,
          //  propFilter: (prop) => {
          //    if (prop.parent) {
          //      return !prop.parent.fileName.includes("node_modules");
          //    }
          //    return true;
          //  },
           //  propTablesExclude: [],
           //  maxPropArrayLength: 5,
         },
       };
export const decorators = [
  (Story) => (
    <div style={{ margin: "1em"}}>
      <Story />
    </div>
  ),
];
addDecorator(withInfo); 

