import Link from 'next/link'
export default function MyButton({ link, classNm, children }: Input) {
  return (
    <div className={classNm}>
      <Link href={link}>{children}</Link>
    </div>
  );
}

type Input = {
  link: string;
  classNm?: any;
  children:any;
};
