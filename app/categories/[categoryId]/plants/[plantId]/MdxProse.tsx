import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";

export type MdxProseProps = {
  markdown: string;
};

export const MdxProse = (props: MdxProseProps) => {
  return (
    <article className="prose dark:prose-invert xl:prose-xl m-auto">
      <MDXRemote
        options={{
          mdxOptions: {
            // @ts-expect-error
            rehypePlugins: [rehypePrism],
          },
        }}
        source={props.markdown}
      />
    </article>
  );
};
