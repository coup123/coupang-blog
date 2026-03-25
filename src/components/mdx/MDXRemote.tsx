import { MDXRemote as MDXRemoteBase } from "next-mdx-remote/rsc";
import CoupangBanner from "@/components/CoupangBanner";
import CoupangLink from "@/components/CoupangLink";

const components = {
  CoupangBanner,
  CoupangLink,
};

interface Props {
  source: string;
}

export function MDXRemote({ source }: Props) {
  return <MDXRemoteBase source={source} components={components} />;
}
