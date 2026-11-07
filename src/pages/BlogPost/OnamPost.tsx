import { Seo } from "../../components/common/Seo";
import { BlogArticle } from "../../components/sections/BlogArticle/BlogArticle";
import { blogPost } from "../../data/blog";
import { BODY } from "../../data/blog-posts/festiveOnamLadder7";

export default function OnamPost() {
  return (
    <>
      <Seo page="blogOnam" />
      <BlogArticle post={blogPost("festive-onam-ladder7")} body={BODY} />
    </>
  );
}
