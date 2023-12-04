import React from "react";

const Question = () => {
  return (
    <section class="questions">
      <div class="container">
        <div class="title">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div class="questions-txt">
          <h3>What is the currency amount for the Blue Card?</h3>
          <p>
            The minimum amount that can be loaded on the card is $100 or
            equivalent amount in other currency. The maximum amount would be as
            per Banque guidelines applicable from time to time. You can learn
            more about it by contacting our consultants.
          </p>
          <h3>What steps do I take if my card gets lost?</h3>
          <p>
            If you lose your card please immediately contact our customer
            support center. If you are in the USA please call 1-800-22-6999, for
            other countries please call 0091-22- 66937000.
          </p>
          <h3>Do I have to maintain any minimum balance?</h3>
          <p>
            It depends on the card you choose. For example, if you pick an
            Orange Card, you get a special waiver on the minimum balance
            requirement.
          </p>
        </div>
        <div class="questions-txt">
          <h3>What kind of browser do I need for online banking?</h3>
          <p>
            Our Banking System supports all browsers. Some of the most popular
            ones are Chrome, Opera, Firefox, and Safari. If you are using
            Internet Explorer make sure the version of your browser is 9.0 or
            higher.
          </p>
          <h3>Can I make online payments to foreign recipients?</h3>
          <p>
            Yes, you can! Our bank does not limit any payments to a certain
            country so whether you are using our online banking system or an app
            for your device, you can safely transfer any amount of money or
            purchase services and products.
          </p>
          <h3>What security features does the mobile banking have?</h3>
          <p>
            Mobile browser-based banking is very similar to PC based internet
            banking. The respective mobile handset browser replaces a PC browser
            to access the banking services. Some of the important security
            measures in place are 128 bit SSL from VeriSign, https:// based
            access, Intrusion detection system (IDS) etc.
          </p>
        </div>
        {/* <div class="btn"><a href="hh">View All Asked Questions</a></div> */}
      </div>
    </section>
  );
};

export default Question;
