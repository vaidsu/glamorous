import * as React from "react";
import glamorous, { withTheme, ThemeProvider } from "../";

// Needed if generating definition files
// https://github.com/Microsoft/TypeScript/issues/5938
import { ExtraGlamorousProps } from "../";

// static styles
const Static = glamorous.div({
  "fontSize": 20,
  "textAlign": "center",
});

// dynamic styles
const Title = glamorous.h1(
  {
    "fontSize": "10px",
    "zIndex": "auto",
  },
  (props: { color: string; }) => ({
    "color": props.color,
  }),
);

// theme styles
const Divider = glamorous.span(
  {
    "fontSize": "10px",
    "zIndex": "auto"
  },
  (props, theme: { main: { color: string; } }) => ({
    "color": theme.main.color,
  }),
);

// n-number of styles
const SpanDivider = glamorous.span(
  {
    "fontSize": "10px",
  },
  (props, theme: { awesome: { color: string } }) => ({
    "color": theme.awesome.color,
  }),
  {
    "fontWeight": 500,
  },
  {
    "fontFamily": "Roboto",
    "fontWeight": 500,
  },
  (props, theme: { main: { color: string; } }) => ({
    "color": theme.main.color,
  }),
);

interface DividerInsideDividerProps {
  color: string;
};

// component styles
const DividerInsideDivider = glamorous(Divider)(
  {
    "fontSize": "10px",
  },
  (props, theme: { main: { color: string; } }) => ({
    "color": theme.main.color,
  }),
);

const theme = {
  "main": {
    "color": "red",
  },
};

export const Balloon = () => (
  <ThemeProvider theme={theme}>
    <Divider color="blue">
      <DividerInsideDivider color="blue">
        <Static>Static</Static>
        <Title color="blue">Hello</Title>
      </DividerInsideDivider>
    </Divider>
  </ThemeProvider>
);

export class AirBalloon extends React.Component<{}, {}> {
  private spanElem: HTMLSpanElement;

  public render() {
    return (
      <Divider innerRef={(
        c: HTMLSpanElement
      ) => { this.spanElem = c; }}>
        Hello
        <SpanDivider>
          Span Divider
        </SpanDivider>
      </Divider>
    );
  }
}

class Test extends React.Component<object, object> {
  private div: HTMLDivElement
  render() {
    return <div ref={(c) => { this.div = c }} />
  }
}

// React Class Wrapped Component

class ClassToWrap extends React.Component<object, object> {
  render() {
    return <div />
  }
}

const ThemedClass = withTheme(ClassToWrap)

const WrappedClass = glamorous(ClassToWrap)({})

// React Stateless Wrapped Component

const StatelessToWrap: React.StatelessComponent<object> = () => (
  <div />
)

const WrappedStateless = glamorous(StatelessToWrap)({})

// Exported Component (for testing declaration generation)
export const ExportTest = glamorous.div({})
