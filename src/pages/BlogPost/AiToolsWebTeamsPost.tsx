import { Seo } from "../../components/common/Seo";
import { BlogArticle } from "../../components/sections/BlogArticle/BlogArticle";
import { blogPost } from "../../data/blog";
import { BODY } from "../../data/blog-posts/aiToolsWebDevelopmentTeam";

export default function AiToolsWebTeamsPost() {
  return (
    <>
      <Seo page="blogAiToolsWebTeams" />
      <BlogArticle post={blogPost("ai-tools-web-development-team")} body={BODY} />
    </>
  );
}
