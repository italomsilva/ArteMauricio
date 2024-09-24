import { CSSProperties, useState } from "react";

export default function MyButton({
  text,
  link,
  backgroundColor,
  backgroundColorHover,
  color,
  colorHover,
  blockSize,
  inlineSize,
  margin,
  padding,
}: Input) {
  const [hover, setHover] = useState(false);
  
  var styles: CSSProperties = {
    backgroundColor: hover ? backgroundColorHover : backgroundColor,
    color: hover ? colorHover : color,
    blockSize: blockSize ? blockSize : "auto",
    inlineSize: inlineSize ? inlineSize : "auto",
    margin: margin ? margin : "auto",
    padding: padding ? padding : "auto",
  };

  return (
    <a
      style={styles}
      href={link}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {text}
    </a>
  );
}

type Input = {
  text: string;
  link: string;
  backgroundColor: string;
  backgroundColorHover: string;
  color: string;
  colorHover: string;
  inlineSize?: string;
  blockSize?: string;
  margin?: string;
  padding?: string;
};
