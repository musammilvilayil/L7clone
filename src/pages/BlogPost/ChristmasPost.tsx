import { Seo } from "../../components/common/Seo";
import { BlogArticle } from "../../components/sections/BlogArticle/BlogArticle";
import { blogPost } from "../../data/blog";
import { BODY } from "../../data/blog-posts/magicalChristmasCelebration";

export default function ChristmasPost() {
  return (
    <>
      <Seo page="blogChristmas" />
      <BlogArticle post={blogPost("magical-christmas-celebration")} body={BODY} />
    </>
  );
}
