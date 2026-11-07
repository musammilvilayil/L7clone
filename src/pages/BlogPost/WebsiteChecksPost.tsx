import { Seo } from "../../components/common/Seo";
import { BlogArticle } from "../../components/sections/BlogArticle/BlogArticle";
import { blogPost } from "../../data/blog";
import { BODY } from "../../data/blog-posts/whyWebsiteChecksNeedToGoBeyondPerformanceScores";

export default function WebsiteChecksPost() {
  return (
    <>
      <Seo page="blogWebsiteChecks" />
      <BlogArticle post={blogPost("why-website-checks-need-to-go-beyond-performance-scores")} body={BODY} />
    </>
  );
}
