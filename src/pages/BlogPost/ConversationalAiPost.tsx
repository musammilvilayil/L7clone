import { Seo } from "../../components/common/Seo";
import { BlogArticle } from "../../components/sections/BlogArticle/BlogArticle";
import { blogPost } from "../../data/blog";
import { BODY } from "../../data/blog-posts/conversationalAiCustomerExperience";

export default function ConversationalAiPost() {
  return (
    <>
      <Seo page="blogConversationalAi" />
      <BlogArticle post={blogPost("conversational-ai-customer-experience")} body={BODY} />
    </>
  );
}
