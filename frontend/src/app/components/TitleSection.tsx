import { HTMLAttributes } from "react";

type Props = {
  text: string;
  highLight: string;
  highLightColor: string;
  textColor:string;
  key:number;
};


export default function TitleSection({
  text,
  highLight,
  highLightColor,
  textColor,
  key
}: Props) {
    const styles:HTMLAttributes<HTMLHeadingElement> = {
        style:{
            fontSize: '1.8rem',
            textAlign: 'center',
            color: textColor,  
        }
    };    
    const regex = new RegExp(`\\b(${highLight})\\b`, 'gi');
    const parts = text.split(regex);
    return (
    <div>
      <h1 style={styles.style} key={key}>
        {parts.map((part) => {
          if (part.toLowerCase() == highLight.toLowerCase()) {
            return <span key={key+1} style={{ color: highLightColor }}>{part}</span>;
          } else return <span key={key=2}>{part}</span>;
        })}
      </h1>
    </div>
  );
}
