'use client';

import { StaticPageContainer } from '@/ui/layout';
import { useAppSelector } from '@/ecom/store/hooks';
import { POLICY_CONTACT_EMAIL } from './contact';

export default function PrivacyPolicy() {
  const { pageSeoDetails } = useAppSelector((state) => state.layout);

  return (
    <StaticPageContainer title={pageSeoDetails?.pageTitle || 'Privacy Policy'}>
      <p><span>Privacy Policy</span></p>
      <p>
        <span>
          This website is operated by Digital Courses. Throughout the site,
          the terms “Company”, “we”, “us” and “our” refer to
          Digital Courses. Digital Courses offers this website, including all
          information, tools, and services available from this site
          to you, the user, conditioned upon your acceptance of all
          terms, conditions, policies, and notices stated here.
        </span>
      </p>
      <br />
      <p><span>Privacy Policy</span></p>
      <p>
        <span>
          Digital Courses DOES NOT trade or sell your personal information in any manner,
          except as specified herein or if you express your consent towards the same.
        </span>
      </p>
      <p>
        <span>
          Personal Information provided by you is used only:
        </span>
      </p>
      <br />
      <p>
        <span>
          (a) To facilitate your use of the website;
        </span>
      </p>
      <br />
      <p>
        <span>
          (b) To respond to your concerns, and inquiries or address
          your requests for information about the various services we offer;
        </span>
      </p>
      <br />
      <p>
        <span>
          (c) To provide you with information about the Company’s courses
          and send you information, materials, and offers from the Company;
        </span>
      </p>
      <br />
      <p>
        <span>
          (d) To send you important information regarding the website, changes to the
          Company’s Terms of Service and various policies and/or other miscellaneous
          information;
        </span>
      </p>
      <br />
      <p>
        <span>
          (e) To send you surveys and marketing communications that the Company
          believes may be of interest to you;
        </span>
      </p>
      <br />
      <p>
        <span>
          (f) To personalize your experience on our website;
        </span>
      </p>
      <br />
      <p>
        <span>
          (g) If you purchase any course or avail of any service from the website,
          to complete Your purchase, for example, to have your payments processed,
          give you access to the course you bought, communicate with you regarding
          Your purchase, and provide you with related customer service;
        </span>
      </p>
      <br />
      <p>
        <span>
          (h) To give you the download link of the courses you have bought, and to check
          that you have bought a course before it is downloaded;
        </span>
      </p>
      <br />
      <p>
        <span>
          (i) To conduct internal reviews and data analysis for the Website
          (e.g., to determine the number of visitors to specific pages
          within the website);

        </span>
      </p>
      <br />
      <p>
        <span>
          (j) To improve the services, content, and advertising on the website;
        </span>
      </p>
      <br />
      <p>
        <span>
          (k) To protect the integrity of the website; and
        </span>
      </p>
      <br />
      <p>
        <span>
          (l) To comply with legal requirements and disclosures provided under the laws of India.
        </span>
      </p>
      <br />
      <p><span>Security</span></p>
      <p>
        <span>
          The security of your personal information is very important to the Company.
          We have aligned physical, administrative, and technical safeguards designed
          to protect your personal information from unauthorized access. In addition,
          the Company uses standard security protocols and mechanisms to exchange the
          transmission of sensitive data such as credit card details. In the event of
          any breach of your personal information, the Company will notify you of it
          by email and will restore the integrity of the data system.
        </span>
      </p>
      <br />
      <p><span>User Discretion</span></p>
      <p>
        <span>
          You can always choose not to provide information and in such cases, if the
          information required is mandatory, you will not be able to avail of those
          services, features, or contents.
        </span>
      </p>
      <p>
        <span>
          You can add or update your personal information regularly. When you update information,
          the Company will keep a copy of the prior version for its records.
        </span>
      </p>
      <br />
      <p>
        <span>
          The Company may, if you prefer, send direct advertisement emails
          to you at the email address given by you. You have the option
          to opt out of this direct mail by clicking on the unsubscribe link
          option attached to the e-mail. The Company respects your privacy
          and if you do not want to receive any kind of communication from
          Digital Courses. If you have any grievances to share, please report
          them to
          {' '}
          <u>{POLICY_CONTACT_EMAIL}</u>
        </span>
      </p>
      <br />
      <p><span>Important Disclaimer</span></p>
      <p>
        <span>
          Although the Company provides full security and secrecy to your personal information,
          we urge you to be careful with very sensitive information and do not share it with
          any third party claiming to be related to the Company on separate emails/phone calls
          Etc. The Company disclaims any liabilities towards any such claims that have arisen
          due to your own negligence or willful misconduct and the Company takes no
          responsibility for the same.
        </span>
      </p>
      <p><span>Contact Us</span></p>
      <p>
        <span>
          If you have any questions or suggestions about our Privacy Policy, do not hesitate
          to contact us at
          {' '}
          <u>{POLICY_CONTACT_EMAIL}</u>
        </span>
      </p>
      <br />
    </StaticPageContainer>
  );
}
