'use client';

import { StaticPageContainer } from '@/ui/layout';
import { useAppSelector } from '@/ecom/store/hooks';
import { POLICY_CONTACT_EMAIL } from './contact';
import { BRAND_NAME } from '@/ecom/constants';

export default function TermsOfService() {
  const { pageSeoDetails } = useAppSelector((state) => state.layout);

  return (
    <StaticPageContainer title={pageSeoDetails?.pageTitle || 'Terms of Service'}>
      <p><span>Terms and conditions</span></p>
      <p>
        <span>
          This website is operated by
          {' '}
          {BRAND_NAME}
          . Throughout the site, the terms “we”, “us” and “our”
          refer to
          {' '}
          {BRAND_NAME}
          .
          {' '}
          {BRAND_NAME}
          {' '}
          offers this website, including all information, courses,
          tools, and services available from this site to you, the user, conditioned upon your
          acceptance of all terms, conditions, policies, and notices stated here.
        </span>
      </p>
      <br />
      <p>
        <span>
          By visiting our site and/ or purchasing something from us, you engage in our “Service” and
          agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”),
          including those additional terms and conditions and policies referenced herein and/or
          available by hyperlink. These Terms of Service apply to all users of the site, including
          without limitation users who are browsers, customers, and/ or contributors of content.
        </span>
      </p>
      <br />
      <p>
        <span>
          Please read these Terms of Service carefully before accessing or using our website. By
          accessing or using any part of the site, you agree to be bound by these Terms of Service.
          If you do not agree to all the terms and conditions of this agreement, then you may not
          access the website or use any services.
        </span>
      </p>
      <br />
      <p>
        <span>
          Any new features or tools that are added to the current store shall also be subject to the
          Terms of Service. We reserve the right to update, change, or replace any part of these
          Terms of Service by posting updates and/or changes to our website. Your continued use of
          or access to the website following the posting of any changes constitutes acceptance of
          those changes.
        </span>
      </p>
      <br />
      <p><b>SECTION 1 – ONLINE STORE TERMS</b></p>
      <p>
        <span>
          By agreeing to these Terms of Service, you represent that you are at least the age of
          majority in your state or province of residence, or that you have given us your consent to
          allow any of your minor dependents to use this site.
        </span>
      </p>
      <br />
      <p>
        <span>
          You may not use our courses for any illegal or unauthorized purpose nor may you, in the
          use of the Service, violate any laws in your jurisdiction (including but not limited to
          copyright laws).
        </span>
      </p>
      <br />
      <p>
        <span>
          You must not transmit any worms or viruses or any code of a destructive nature. A breach
          or violation of any of the Terms will result in an immediate termination of your Services.
        </span>
      </p>
      <br />
      <p><b>SECTION 2 – GENERAL CONDITIONS</b></p>
      <p>
        <span>
          We reserve the right to refuse service to anyone for any reason at any time.
        </span>
      </p>
      <br />
      <p>
        <span>
          You understand that your content (not including payment information), may be transferred
          unencrypted and involve (a) transmissions over various networks; and (b) changes to
          conform and adapt to the technical requirements of connecting networks or devices. Payment
          information is always encrypted during transfer over networks.
        </span>
      </p>
      <br />
      <p>
        <span>
          The headings used in this agreement are included for convenience only and will not limit
          or otherwise affect these Terms.
        </span>
      </p>
      <br />
      <p><b>SECTION 3 – COURSES AND LICENSE</b></p>
      <p>
        <span>
          {BRAND_NAME}
          {' '}
          sells digital courses. When you buy a course you get a personal, non-exclusive,
          non-transferable license to download it and use it for your own learning.
        </span>
      </p>
      <br />
      <p>
        <span>
          You agree not to reproduce, duplicate, copy, share, sell, resell, upload, or otherwise
          exploit a course or any part of it, or give anyone else access to your account or your
          download links, without our express written permission. The course remains the property of
          {' '}
          {BRAND_NAME}
          {' '}
          and its authors.
        </span>
      </p>
      <br />
      <p>
        <span>
          We do not guarantee any particular result, such as a job, income, or exam outcome, from
          completing a course.
        </span>
      </p>
      <br />
      <p><b>SECTION 4 – ORDERS, ACCESS AND DOWNLOADS</b></p>
      <p>
        <span>
          Courses are delivered digitally. Nothing is shipped. After your order is placed, the
          course appears in your account and you can download it by choosing the download option on
          the course.
        </span>
      </p>
      <br />
      <p>
        <span>
          The download link is created when you ask for it and works for a short time only (5
          minutes). If it expires, ask for a new one from your account. You can download a course
          you have bought again whenever you need to.
        </span>
      </p>
      <br />
      <p>
        <span>
          You are responsible for having a device and an internet connection that can download and
          open the course files.
        </span>
      </p>
      <br />
      <p><b>SECTION 5 – PRICES AND PAYMENT</b></p>
      <p>
        <span>
          Prices for our courses are subject to change without notice. The price you pay is the
          price shown when you place the order.
        </span>
      </p>
      <br />
      <p>
        <span>
          We reserve the right at any time to modify or discontinue the Service (or any part or
          content thereof) without notice. We shall not be liable to you or to any third party for
          any modification, price change, suspension, or discontinuance of the Service.
        </span>
      </p>
      <br />
      <p>
        <span>
          You agree to provide current, complete, and accurate purchase and account information for
          all purchases made at our store, and to promptly update your account and other
          information, including your email address, so that we can complete your transactions and
          contact you as needed.
        </span>
      </p>
      <br />
      <p>
        <span>
          We reserve the right to refuse or cancel any order, for example if the price or course
          information shown was wrong, or if we suspect misuse. If we cancel an order after you
          paid, you will get your money back.
        </span>
      </p>
      <br />
      <p>
        <span>
          For refunds, please review our Refund Policy.
        </span>
      </p>
      <br />
      <p><b>SECTION 6 – ACCURACY OF INFORMATION</b></p>
      <p>
        <span>
          We are not responsible if the information made available on this site is not accurate,
          complete, or current. We try to describe each course correctly, but descriptions,
          previews, and images are for general information, and we reserve the right to correct
          errors or omissions at any time without prior notice.
        </span>
      </p>
      <br />
      <p>
        <span>
          We do not warrant that a course will meet your expectations, or that every error in the
          Service will be corrected.
        </span>
      </p>
      <br />
      <p><b>SECTION 7 – THIRD-PARTY TOOLS AND LINKS</b></p>
      <p>
        <span>
          We may provide access to third-party tools, and the site may link to third-party websites
          that are not affiliated with us, over which we neither monitor nor have any control. We
          provide access to such tools ”as is” and “as available”, and we are not responsible for
          the content or practices of third parties. Please review their policies before you engage
          in any transaction with them.
        </span>
      </p>
      <br />
      <p><b>SECTION 8 – USER COMMENTS, REVIEWS AND OTHER SUBMISSIONS</b></p>
      <p>
        <span>
          If you send us comments, reviews, suggestions, or other materials, online, by email, or
          otherwise (collectively, ‘comments’), you agree that we may, at any time, without
          restriction, edit, copy, publish, distribute, translate and otherwise use in any medium
          any comments that you forward to us. We are under no obligation (1) to maintain any
          comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any
          comments.
        </span>
      </p>
      <br />
      <p>
        <span>
          We may, but have no obligation to, monitor, edit, or remove content that we determine in
          our sole discretion is unlawful, offensive, threatening, libelous, defamatory,
          pornographic, obscene, or otherwise objectionable or violates any party’s intellectual
          property or these Terms of Service.
        </span>
      </p>
      <br />
      <p>
        <span>
          You agree that your comments will not violate any right of any third party, will not
          contain unlawful, abusive, or obscene material or any malware, and that you will not use a
          false email address or pretend to be someone other than yourself. You are solely
          responsible for any comments you make and their accuracy.
        </span>
      </p>
      <br />
      <p><b>SECTION 9 – PERSONAL INFORMATION</b></p>
      <p>
        <span>
          Your submission of personal information through the store is governed by our Privacy Policy.
        </span>
      </p>
      <br />
      <p><b>SECTION 10 – PROHIBITED USES</b></p>
      <p>
        <span>
          In addition to other prohibitions as set forth in the Terms of Service, you are prohibited
          from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to
          perform or participate in any unlawful acts; (c) to infringe upon or violate our
          intellectual property rights or the intellectual property rights of others; (d) to share,
          resell, or publish the courses you buy; (e) to harass, abuse, insult, harm, defame, or
          discriminate against anyone; (f) to submit false or misleading information; (g) to upload
          or transmit viruses or any other type of malicious code; (h) to collect or track the
          personal information of others; (i) to spam, phish, spider, crawl, or scrape; or (j) to
          interfere with or circumvent the security features of the Service, including the download
          protection of the courses. We reserve the right to terminate your use of the Service for
          violating any of the prohibited uses.
        </span>
      </p>
      <br />
      <p><b>SECTION 11 – DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</b></p>
      <p>
        <span>
          We do not guarantee, represent, or warrant that your use of our service will be
          uninterrupted, timely, secure, or error-free, or that the results that may be obtained
          from the use of the service will be accurate or reliable.
        </span>
      </p>
      <br />
      <p>
        <span>
          You agree that from time to time we may remove the service for indefinite periods of time
          or cancel the service at any time, without notice to you. You expressly agree that your
          use of, or inability to use, the service is at your sole risk. The service and all courses
          delivered to you through the service are (except as expressly stated by us) provided ‘as
          is’ and ‘as available’, without any representation, warranties, or conditions of any kind,
          either express or implied.
        </span>
      </p>
      <br />
      <p>
        <span>
          In no case shall
          {' '}
          {BRAND_NAME}
          , our directors, officers, employees, affiliates, agents,
          contractors, suppliers, service providers or licensors be liable for any injury, loss,
          claim, or any direct, indirect, incidental, punitive, special, or consequential damages of
          any kind, including, without limitation lost profits, lost revenue, lost savings, loss of
          data, or any similar damages, whether based in contract, tort (including negligence),
          strict liability or otherwise, arising from your use of the service or any course, even if
          advised of their possibility. Our liability shall be limited to the maximum extent
          permitted by law, and in any case to the amount you paid for the course concerned.
        </span>
      </p>
      <br />
      <p><b>SECTION 12 – INDEMNIFICATION</b></p>
      <p>
        <span>
          You agree to indemnify, defend and hold harmless
          {' '}
          {BRAND_NAME}
          {' '}
          and our parent, subsidiaries,
          affiliates, partners, officers, directors, agents, contractors, licensors, service
          providers, suppliers, and employees, from any claim or demand, including reasonable
          attorneys’ fees, made by any third-party due to or arising out of your breach of these
          Terms of Service or the documents they incorporate by reference, or your violation of any
          law or the rights of a third-party.
        </span>
      </p>
      <br />
      <p><b>SECTION 13 – SEVERABILITY AND ENTIRE AGREEMENT</b></p>
      <p>
        <span>
          In the event that any provision of these Terms of Service is determined to be unlawful,
          void, or unenforceable, such provision shall nonetheless be enforceable to the fullest
          extent permitted by applicable law, and the unenforceable portion shall be deemed to be
          severed from these Terms of Service; such determination shall not affect the validity and
          enforceability of any other remaining provisions.
        </span>
      </p>
      <br />
      <p>
        <span>
          The failure of us to exercise or enforce any right or provision of these Terms of Service
          shall not constitute a waiver of such right or provision. These Terms of Service and any
          policies posted by us on this site constitute the entire agreement between you and us and
          govern your use of the Service, superseding any prior agreements, communications, and
          proposals, whether oral or written.
        </span>
      </p>
      <br />
      <p><b>SECTION 14 – TERMINATION</b></p>
      <p>
        <span>
          These Terms of Service are effective unless and until terminated by either you or us. You
          may terminate them at any time by notifying us that you no longer wish to use our
          Services, or when you cease using our site.
        </span>
      </p>
      <br />
      <p>
        <span>
          If in our sole judgment, you fail, or we suspect that you have failed, to comply with any
          term of these Terms of Service, we may terminate this agreement at any time without notice
          and deny you access to our Services (or any part thereof), including the download of
          courses you bought. The obligations and liabilities of the parties incurred prior to the
          termination date shall survive the termination.
        </span>
      </p>
      <br />
      <p><b>SECTION 15 – GOVERNING LAW</b></p>
      <p>
        <span>
          These Terms of Service and any separate agreements whereby we provide you Services shall
          be governed by and construed in accordance with the laws of India and jurisdiction of
          Mumbai, Maharashtra.
        </span>
      </p>
      <br />
      <p><b>SECTION 16 – CHANGES TO TERMS OF SERVICE</b></p>
      <p>
        <span>
          You can review the most current version of the Terms of Service at any time on this page.
          We reserve the right, at our sole discretion, to update, change, or replace any part of
          these Terms of Service by posting updates and changes to our website. It is your
          responsibility to check our website periodically for changes. Your continued use of or
          access to our website or the Service following the posting of any changes constitutes
          acceptance of those changes.
        </span>
      </p>
      <br />
      <p><b>SECTION 17 – CONTACT INFORMATION</b></p>
      <p>
        <span>
          Questions about the Terms of Service should be sent to us at
          {' '}
          <u>{POLICY_CONTACT_EMAIL}</u>
        </span>
      </p>
    </StaticPageContainer>
  );
}
