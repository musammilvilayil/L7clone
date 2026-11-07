import { Seo } from "../../components/common/Seo";
import { BlogArticle } from "../../components/sections/BlogArticle/BlogArticle";
import { blogPost } from "../../data/blog";
import { BODY } from "../../data/blog-posts/independenceDayLadder7";

export default function IndependenceDayPost() {
  return (
    <>
      <Seo page="blogIndependenceDay" />
      <BlogArticle post={blogPost("independence-day-ladder7")} body={BODY} />
    </>
  );
}
