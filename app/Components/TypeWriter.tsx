import { FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { StyledText, TextProps } from "./Text";






// A restrictive text component that only allows strings as children
type TWTextProps = TextProps & {
  children: string;
};
export const TWText: FunctionComponent<TWTextProps> = (props) => {
  return <StyledText {...props} />;
};

// A component that makes it look like a typewriter typing out text on the screen
// currently assumes that the children wont change
export type TypewriterProps = TextProps & {
  // all children are either strings or TWText components
  children:
    | string
    | ReactElement<TWTextProps>
    | (string | ReactElement<TWTextProps>)[];
  // will pause after typing out the text and then delete it one letter at a time
  deleteAfter?: boolean;
  // how many milliseconds to wait before each letter
  speed?: number;
  // how many milliseconds to wait before deleting each letter. defaults to speed if not provided
  deleteSpeed?: number;
  // how many milliseconds to wait before deleting the text
  pauseTime?: number;
  // called when the typewriter is done animating
  onFinish?: Function;
  // if true, will not animate in the text
  startFull?: boolean;
  // center horizontally
  centered?: boolean;
};
export const Typewriter: FunctionComponent<TypewriterProps> = (props) => {
  const {
    children,
    deleteAfter = false,
    speed = 30,
    deleteSpeed = speed,
    startFull = false,
    pauseTime = 1000,
    onFinish = () => {},
    centered = false,
  } = props;

  const lastChildren = useRef(children);

  useEffect(() => {
    if (lastChildren.current !== children) {
      lastChildren.current = children;
      finalText.current = children as string//parseSubText(children);
      setIndex(0);
      setText("");
    }
  }, [children])

  // text visible on screen
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  // what our final text will look like, represented as an array of single-charcter TWText components
  const finalText = useRef<string>(children as string)
  /*useRef<ReactElement<TWTextProps>[]>(
    parseSubText(children)
  );*/

  // type characters one at a time
  useEffect(() => {
    // if we are starting with the text fully typed out, skip the animation
    if (startFull) {
      setText(finalText.current);
      if (deleteAfter) {
        setTimeout(() => {
          setIsDone(true);
        }, pauseTime);
      } else {
        onFinish();
      }
      return;
    }
    // type characters one at a time
    if (index <= finalText.current.length) {
      setTimeout(() => {
        setText(finalText.current.slice(0, index));
        setIndex(index + 1);
      }, speed);
    }
    // done typing, wait for a bit and then delete the text
    else if (deleteAfter) {
      setTimeout(() => {
        setIsDone(true);
      }, pauseTime);
    } else {
      onFinish();
    }
  }, [index]);

  // delete characters one at a time if deleteAfter is true
  useEffect(() => {
    if (isDone) {
      setTimeout(() => {
        setText(text.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDone(false);
          onFinish();
        }
      }, deleteSpeed);
    }
  }, [isDone, text]);

  // if deleteAfter is changed to true after the text is fully typed out, start deleting it
  useEffect(() => {
    if (deleteAfter && text.length === finalText.current.length) {
      setIsDone(true);
    }
  }, [deleteAfter]);

  return <Text {...props} style={{textAlign: centered ? 'center' : undefined}}>{text}</Text>;
};

// turns the children of Typewriter into an array of single-character TWText components
// updates to this should also update ./ScatteredText.tsx parseSubText
const parseSubText = (
  text:
    | string
    | ReactElement<TWTextProps>
    | (string | ReactElement<TWTextProps>)[]
): ReactElement<TWTextProps>[] => {
  if (typeof text === "string") {
    return text.split("").map((char) => <TWText key={Math.random()}>{char}</TWText>);
  } else if (Array.isArray(text)) {
    return text.map((subText) => parseSubText(subText)).flat();
  } else {
    const slimmedProps = { ...text.props, children: undefined };
    return text.props.children.split("").map((char) => (
      <TWText {...slimmedProps} key={Math.random()}>
        {char}
      </TWText>
    ));
  }
};