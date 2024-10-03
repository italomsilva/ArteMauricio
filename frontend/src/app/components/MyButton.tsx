import Link from 'next/link'
export default function MyButton({ text, link, classNm }: Input) {
  return (
    <div className={classNm}>
      <Link href={link}>{text}</Link>
    </div>
  );
}

type Input = {
  text: string;
  link: string;
  classNm: any;
};
