import Image from "next/image";
import { PostCopyURL } from "./post-copy-url";

const getAuthor = (id: string) =>
  ({
    pontus: {
      name: "CEO",
      src: "https://avatars.githubusercontent.com/u/74680137?v=4&size=64",
      tagline: "founder-mode",
    },
  })[id];

type Props = {
  author: string;
};

export function PostAuthor({ author }: Props) {
  const authorData = getAuthor(author);

  if (!authorData) return null;

  return (
    <div className="flex items-center pt-4 border-t-[1px] border-border w-full">
      <div className="flex items-center space-x-2">
        <Image
          src={authorData.src}
          width={24}
          height={24}
          alt={authorData.name}
          className="rounded-full overflow-hidden"
          quality={90}
        />
        <span className="font-medium text-xs">{authorData.name}</span>
        <span className="text-xs text-[#878787]">{authorData.tagline}</span>
      </div>
      <div className="ml-auto">
        <PostCopyURL slug={author} />
      </div>
    </div>
  );
}