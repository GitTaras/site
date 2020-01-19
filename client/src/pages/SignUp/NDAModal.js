import React from 'react';

const NDAModal = () => {
  return(
   <>
      <h2>NON DISCLOSURE AGREEMENT</h2>
      <h3>An agreement by you to not reveal details of this contest to others</h3>
      <p>
        This Nondisclosure Agreement (the "Agreement") is entered into by and between Contest Holder ("Disclosing
        Party") and You, the Contestant ("Receiving Party") for the purpose of preventing the unauthorized
        disclosure of Confidential Information as defined below. The parties agree to enter into a confidential
        relationship with respect to the disclosure of certain proprietary and confidential information
        ("Confidential Information").
      </p>
      <h3>1. Definition of Confidential Information</h3>
      <p>
        For purposes of this Agreement, "Confidential Information" shall include all information or material that
        has or could have commercial value or other utility in the business in which Disclosing Party is engaged.
      </p>
      <h3>2. Exclusions from Confidential Information</h3>
      <p>
        Receiving Party's obligations under this Agreement do not extend to information that is:

        <li>
          publicly known at the time of disclosure or subsequently becomes publicly known through no fault of the
          Receiving Party;
        </li>
        <li>discovered or created by the Receiving Party before disclosure by Disclosing Party;</li>
        <li>
          learned by the Receiving Party through legitimate means other than from the Disclosing Party or
          Disclosing Party's representatives; or
          {' '}
        </li>
        <li>is disclosed by Receiving Party with Disclosing Party's prior written approval</li>
      </p>
      <h3>3. Obligations of Receiving Party</h3>
      <p>
        Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole
        and exclusive benefit of the Disclosing Party. Receiving Party shall not, without prior written approval
        of Disclosing Party, use for Receiving Party's own benefit, publish, copy, or otherwise disclose to
        others, or permit the use by others for their benefit or to the detriment of Disclosing Party, any
        Confidential Information.
      </p>
      <h3>4. Time Periods</h3>
      <p>
        The nondisclosure provisions of this Agreement shall survive the termination of this Agreement and
        Receiving Party's duty to hold Confidential Information in confidence shall remain in effect until the
        Confidential Information no longer qualifies as a trade secret or until Disclosing Party sends Receiving
        Party written notice releasing Receiving Party from this Agreement, whichever occurs first.
      </p>
      <h3>5. Relationships</h3>
      <p>
        Nothing contained in this Agreement shall be deemed to constitute either party a partner, joint venturer
        or employee of the other party for any purpose.
      </p>
      <h3>6. Severability</h3>
      <p>
        If a court finds any provision of this Agreement invalid or unenforceable, the remainder of this
        Agreement shall be interpreted so as best to effect the intent of the parties.
      </p>
      <h3>7. Integration</h3>
      <p>
        This Agreement expresses the complete understanding of the parties with respect to the subject matter
        and supersedes all prior proposals, agreements, representations, and understandings. This Agreement may
        not be amended except in a writing signed by both parties.
      </p>
      <h3>8. Waiver</h3>
      <p>
        The failure to exercise any right provided in this Agreement shall not be a waiver of prior or
        subsequent rights.
      </p>
      <p>
        This Agreement and each party's obligations shall be binding on the representatives, assigns, and
        successors of such party. Each party has signed this Agreement through its authorized representative.
      </p>
    </>
  )
};

export default NDAModal;