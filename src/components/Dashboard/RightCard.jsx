import { isEmpty } from "lodash";
import React from "react";
import { scanned } from "../../_mock";
import HorizontalLine from "../HorizontalLine";
import Row from "../Row";
import PickUpButton from "./PickUpButton";

function RightCard({ scannedItems }) {
  const totalReturns = scannedItems.length;

  const potentialReturnValue = scannedItems
    .map(({ amount }) => {
      return Number(amount);
    })
    .reduce((acc, curr) => (acc += curr), 0);
  const donations = scannedItems.slice(3, 6).length;

  return (
    <div
      className="col right-card mt-4"
      style={{
        minWidth: "248px",
      }}
    >
      <div className="card shadow-sm">
        <div className="p-0 ml-1 d-inline-flex align-center">
          <h5 className="card-title mb-0 p-3 sofia-pro card-title">
            {scannedItems.length > 0 ? "Total past 90 days" : " No Articles"}
          </h5>
        </div>
        <HorizontalLine width="90%" />
        <div className="card-body p-0">
          <div className="container p-2">
            <Row marginTop={3} marginLeft={2}>
              <div className="col-7 total-returns">
                <div className="row card-text mb-0 sofia-pro card-value">
                  {totalReturns}
                </div>
                <div className="row card-text card-label">Total Returns</div>
              </div>
            </Row>
            <Row marginTop={3} marginLeft={2} className="p-0">
              <div className="col-5">
                <div className="row card-text mb-0 sofia-pro card-value">
                  ${Number(potentialReturnValue).toFixed(2)}
                </div>
                <div className="row small sofia-pro card-label text-potential-value">
                  Potential Return Value
                </div>
              </div>
              {/* <div className="col-6 ml-3">
                <div className="row mb-0 sofia-pro card-value">
                  ${inStoreCredits}
                </div>
                <div className="row card-text small sofia-pro card-label">
                  In Store Credits
                </div>
              </div> */}
            </Row>
            <hr />
            <Row marginTop={3} marginLeft={2} className="p-0">
              <div className="col-12 p-0">
                <div className="col-sm-8">
                  <div className="row mb-0 sofia-pro card-value">
                    {donations}
                  </div>
                  <div className="row card-text small sofia-pro card-label total-donations">
                    Total Donations
                  </div>
                </div>
              </div>
            </Row>
            <div
              className="pr-3 pl-3 mt-3 pickup-value"
              style={{
                opacity: isEmpty(scannedItems) ? 0.37 : 1,
              }}
            >
              <PickUpButton
                leadingText="Pickup now"
                timeWindow="Today"
                price="24.99"
                backgroundColor="#570097"
                textColor="white"
                opacity="0.8"
                onClick={() => {}}
              />
              <PickUpButton
                leadingText="Pickup later"
                price="24.99"
                backgroundColor="#faf5fc"
                textColor="#570097"
                opacity="0.8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightCard;
