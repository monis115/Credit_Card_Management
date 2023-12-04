import React from "react";

const Statistical = () => {
  return (
    <section style={{ backgroundColor: "black" }} class="info">
      <div class="container">
        <div class="title">
          <h2>Latest Statistical Information</h2>
          <p>
            Our Bank regularly compiles and publishes a range of monetary and
            financial statistics. These include domestic banking statistics,
            external finance statistics, and international banking statistics.
          </p>
        </div>
        <div class="info-txt">
          <div class="data">
            <p>
              With the development of online banking, our number of customers
              increased up to 6 million worldwide.
            </p>
          </div>
          <div class="data">
            <div class="data-box">
              <div class="data-item">
                <span>25%</span>
              </div>
              <div class="data-item">
                <span>50%</span>
              </div>
            </div>
            <div class="data-box">
              <div class="data-item">
                <span>75%</span>
              </div>
              <div class="data-item">
                <span>100%</span>
              </div>
            </div>
          </div>
          <div class="data">
            <p>
              Our financial services deeply rely on certain banking procedures
              that have been perfected over the years and helped us get
              prestigious awards.
            </p>
            <div class="data-block">
              <div class="data-boxs">
                <p>Financial Consulting</p>
                <div>75%</div>
              </div>
              <div class="data-boxs">
                <p>Online Reporting</p>
                <div>50%</div>
              </div>
              <div class="data-boxs">
                <p>Online Banking</p>
                <div>80%</div>
              </div>
              <div class="data-boxs">
                <p>24/7 Support</p>
                <div>75%</div>
              </div>
            </div>
          </div>
        </div>
        {/* <div class="btn">
          <a href="#">View All Statistics</a>
        </div> */}
      </div>
    </section>
  );
};

export default Statistical;
