'use client';

import { StaticPageContainer } from '@/ui/layout';
import { useAppSelector } from '@/ecom/store/hooks';
import { POLICY_CONTACT_EMAIL } from './contact';
import { BRAND_NAME } from '@/ecom/constants';

export default function RefundPolicy() {
  const { pageSeoDetails } = useAppSelector((state) => state.layout);

  return (
    <StaticPageContainer title={pageSeoDetails?.pageTitle || 'Refund Policy'}>
      <p><span>Refund Policy</span></p>
      <p>
        <span>
          {BRAND_NAME}
          {' '}
          sells digital courses. Once you have paid, you can download your course
          from your account straight away, so nothing is shipped and there are no returns
          or replacements of physical goods.
        </span>
      </p>
      <br />
      <p>Refunds:</p>
      <p>
        <span>
          Because a course can be downloaded and kept as soon as it is bought, we do not refund
          a course once you have downloaded it. We will refund you, or give you the course
          again, in these cases:
        </span>
      </p>
      <p><span>- You were charged more than once for the same course.</span></p>
      <p><span>- You were charged but the course did not appear in your account.</span></p>
      <p>
        <span>
          - The file is damaged, will not open, or is not the course you bought, and we cannot
          fix it within a reasonable time.
        </span>
      </p>
      <br />
      <p>Cancellation:</p>
      <p>
        <span>
          You can cancel an order before you download the course. After the first download
          the order cannot be cancelled.
        </span>
      </p>
      <br />
      <p>Wrong course ordered:</p>
      <p>
        <span>
          If you ordered the wrong course and have not downloaded it, write to us within
          24 hours of placing the order and we will change it for the one you wanted.
        </span>
      </p>
      <br />
      <p>How to ask for a refund:</p>
      <p>
        <span>
          Email
          {' '}
          <u>{POLICY_CONTACT_EMAIL}</u>
          {' '}
          within 7 days of the purchase with your order number and the email address
          on your account, and tell us what went wrong. We reply within 2 working days.
        </span>
      </p>
      <p>
        <span>
          An approved refund goes back to the payment method you paid with, and reaches
          you in 5 to 7 working days, depending on your bank.
        </span>
      </p>
    </StaticPageContainer>
  );
}
