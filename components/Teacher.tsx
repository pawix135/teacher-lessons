import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  href: string;
  img: string;
  css?: string;
  disabled?: boolean;
}

const Teacher: React.FunctionComponent<Props> = ({
  name,
  href,
  disabled,
  img,
  css,
  ...props
}) => {
  return (
    <Link href={disabled ? "" : href}>
      <a
        {...props}
        className={classNames(
          "flex flex-col flex-shrink gap-3 px-5 text-center shadow-md rounded-md py-2 min-h-[300px] justify-center bg-white",
          css,
          "hover:-translate-y-1 transition duration-150"
        )}
      >
        <div className="w-full">
          <Image
            src={img}
            layout="responsive"
            priority={true}
            width={1478}
            alt={name}
            height={1478}
            className={"w-full object-scale-down hoverek"}
          />
        </div>
        <span className="font-bold text-md">{name}</span>
      </a>
    </Link>
  );
};

export default Teacher;
