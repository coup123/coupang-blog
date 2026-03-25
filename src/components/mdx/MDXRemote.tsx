import { MDXRemote as MDXRemoteBase } from "next-mdx-remote/rsc";
import CoupangBanner from "@/components/CoupangBanner";

const components = {
  CoupangBanner,
};

interface Props {
  source: string;
}

export function MDXRemote({ source }: Props) {
  return <MDXRemoteBase source={source} components={components} />;
}
