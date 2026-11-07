import { Seo } from "../../components/common/Seo";
import { BlogArticle } from "../../components/sections/BlogArticle/BlogArticle";
import { blogPost } from "../../data/blog";
import { BODY } from "../../data/blog-posts/aiPersonalizeWebExperince";

export default function AiPersonalizationPost() {
  return (
    <>
      <Seo page="blogAiPersonalization" />
      <BlogArticle post={blogPost("ai-personalize-web-experince")} body={BODY} />
    </>
  );
}
