import { useState } from "react";

export default function MyButtonInput(input: Input) {
  return (
    <div className={input.classNm}>
        <input type="submit" value={input.value} />
    </div>
  );
}

type Input = {
  id: string;
  handleValue?:(event: React.ChangeEvent<HTMLInputElement>) => void;
  classNm?:any;
  value: string;
};
