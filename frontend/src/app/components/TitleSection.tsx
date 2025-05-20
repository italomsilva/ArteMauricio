import { HTMLAttributes } from "react";

type Props = {
  text: string;
  highLight: string;
  highLightColor: string;
  textColor: string;
  uniqueKey: number;
  size?: string | null;
};

export default function TitleSection({
  text,
  highLight,
  highLightColor,
  textColor,
  uniqueKey,
  size,
}: Props) {
  const styles: HTMLAttributes<HTMLHeadingElement> = {
    style: {
      fontSize: size ?? "1.8rem",
      textAlign: "center",
      color: textColor,
    },
  };
  const regex = new RegExp(`\\b(${highLight})\\b`, "gi");
  const parts = text.split(regex);
  return (
    <div>
      <h1 style={styles.style} key={uniqueKey}>
        {parts.map((part) => {
          if (part.toLowerCase() == highLight.toLowerCase()) {
            return (
              <span key={uniqueKey + 1} style={{ color: highLightColor }}>
                {part}
              </span>
            );
          } else return <span key={uniqueKey + 2}>{part}</span>;
        })}
      </h1>
    </div>
  );
}
