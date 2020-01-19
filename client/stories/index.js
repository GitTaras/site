import React from "react";
import {storiesOf} from "@storybook/react";
import Button from "../src/components/Button/Button";

storiesOf("Squadhelp", module)
  .add("Login", () => <Button content="Login" btnStyle={`create`}/> )
  .add("Next Disable", () => <Button content="Next" btnStyle={`next`} disabled/> )
  .add("Back", () => <Button content="Back" btnStyle={`back`}/> );
