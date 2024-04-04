import { useState } from "react";
import Layout from "../../layout/index";
import { UserOutlined } from "@ant-design/icons";
import "./index.less";
import { formatAddress } from "../../utils";

const list = [
  {
    address: "7rhxnLV8C77o6d8oz26AgK8x8m5ePsdeRawjqvojbjnQ",
    winN: 30,
    failN: 5,
  },
  {
    address: "HFqU5x63VTqvQss8hp11i4wVV8bD44PvwucfZ2bU7gRe",
    winN: 25,
    failN: 5,
  },
  {
    address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    winN: 18,
    failN: 4,
  },
  {
    address: "2g9NLWUM6bPm9xq2FBsb3MT3F3G5HDraGqZQEVzcCWTc",
    winN: 5,
    failN: 2,
  },
];

function Rank() {
  return (
    <Layout title="Rank">
      <div className="rank-page">
        <main>
          {/* <section className="listContainer" id="listContainer">
            <div className="title animationZoomIn" id="title"></div>
          </section> */}
          <div style={{ width: "100%" }}>
            <div className="listLine listGradient"></div>
          </div>
          <div
            className="content"
            id="ListContent"
          >
            <section className="listDiv" id="competList">
              {list.map((e,index) => {
                return (
                  <div key={e.address} className="rank-card listBgGradient animationFlip clearFloat">
                    <div className="num">
                      <i>{index +1}</i>
                    </div>
                    <div className="address-logo">
                      <div className="userImg">
                        <UserOutlined style={{ fontSize: "0.25rem" }} />
                      </div>
                    </div>
                    <div className="info-wrap">
                      <div className="address">
                        {formatAddress(
                          e.address,
                          10
                        )}{" "}
                      </div>
                      <div className="line"></div>
                      <div className="info">
                        <span className="item">
                          <span className="name">Win:</span>
                          <span className="value">{e.winN || 0}</span>
                        </span>
                        <span className="item">
                          <span className="name">Fail:</span>
                          <span className="value">{e.failN || 0}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Rank;
