import { useState } from "react";

export default function MyInputAndLabel(input: Input) {
  return (
    <div className={input.classNm}>
      <label htmlFor={`i${input.id}`}>{input.labelText}</label>
      <input
        type={input.type}
        id={`i${input.id}`}
        name={input.id}
        placeholder={input.placeHoldertext}
        value={input.text}
        onChange={input.handleValue}
      />
    </div>
  );
}

type Input = {
  id: string;
  labelText?: string;
  placeHoldertext?: string;
  type: string;
  text?:string;
  handleValue?:(event: React.ChangeEvent<HTMLInputElement>) => void;
  classNm?:any;
};
