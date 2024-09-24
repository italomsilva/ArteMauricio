
export default function MyButton({ text, link, classNm }: Input) {

  return (
    <div className={classNm}>
      <a href={link}>{text}</a>
    </div>
  );
}

type Input = {
  text: string;
  link: string;
  classNm: any;
};
