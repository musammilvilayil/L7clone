import { Seo } from "../../components/common/Seo";
import { ArticleColumn } from "../../components/sections/BlogArticle/BlogArticle";
import { ContactSection } from "../../components/sections/Contact/ContactSection";
import { DetailList } from "../../components/sections/DetailSection/DetailSection";
import { LandingHero } from "../../components/sections/LandingHero/LandingHero";

const INTRO =
  "Ladder7 Nextstep Solutions (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information in connection with our use of Facebook Ads and related services.";

/** Privacy policy — rebuilt from privacy.html (text-only hero + reading column). */
export default function PrivacyPage() {
  return (
    <>
      <Seo page="privacy" />
      <LandingHero eyebrow="Privacy policy" title="Your privacy. In clear terms" description={INTRO} />
      <ArticleColumn>
        <p className="blog-article__lead">
          This policy describes Ladder7’s handling of information collected through Facebook Ads, as published on the live Ladder7 website.
        </p>
        <h2>Privacy Policy</h2>
        <p>{INTRO} By interacting with our ads or engaging with our business, you agree to the practices described in this policy.</p>
        <h2>1. Information We Collect</h2>
        <p>When you interact with our Facebook Ads, we may collect the following types of information:</p>
        <DetailList items={["Personal Information: Name, email address, phone number, or other contact details you voluntarily provide through ad forms."]} />
        <h2>2. How We Use Your Information</h2>
        <p>The information we collect through Facebook Ads is used to:</p>
        <DetailList
          items={[
            "Deliver and optimize advertisements tailored to your interests.",
            "Respond to your inquiries or requests made through lead forms.",
            "Analyze campaign performance and improve our marketing efforts.",
            "Comply with applicable laws, regulations, or legal obligations.",
          ]}
        />
        <h2>3. How We Share Your Information</h2>
        <p>We do not sell your personal information. However, we may share your information with:</p>
        <DetailList
          items={[
            "Service Providers: Third-party vendors that assist with data analysis, ad delivery, or customer support.",
            "Facebook: To facilitate ad targeting and measurement, per Facebook's privacy and data-sharing policies.",
            "Legal Authorities: When required by law or to protect our rights and interests.",
          ]}
        />
        <h2>4. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your information from unauthorized access, disclosure, or misuse. However, no
          system is entirely secure, and we cannot guarantee the absolute security of your data.
        </p>
        <h2>5. Data Retention</h2>
        <p>
          We retain your information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. After
          this period, your data will be securely deleted or anonymized.
        </p>
        <h2>6. Children's Privacy</h2>
        <p>Our Facebook Ads are not directed at individuals under the age of 18. We do not knowingly collect personal information from children.</p>
        <h2>7. Policy Updates</h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in our practices or applicable regulations. We encourage you to
          review this policy regularly.
        </p>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:{" "}
          <a href="mailto:info@ladder7.in">info@ladder7.in</a>
        </p>
      </ArticleColumn>
      <ContactSection headingLevel="h2" />
    </>
  );
}
