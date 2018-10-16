open Rebolt;
Storybook.(
  storiesOf("Test", module_)
  |> add("default", () => <Test />)
);