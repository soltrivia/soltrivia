import { useState } from "react";
import "./index.less";
import Layout from "../../layout/index";
import { Link } from "react-router-dom";
import {
  AreaChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useAddress from '../../hook/useAddress';
import { formatAddress } from '../../utils';


function Index() {

  const address = useAddress();

  return (
    <Layout title="Soltrivia" headerClass="gradient" showBack={false}>
      <div className="home-page">
        <main>
          <div className="content">
            <section className="infoPanel">
              <div className="info-img">
                <div className="info-wrap">
                  <span className="uimg">
                    <UserOutlined style={{ fontSize: "0.25rem" }} />
                  </span>
                  <span className="address">{
                    address ? formatAddress(address): '--'
                  }</span>
                </div>
              </div>
              <div className="info">
                <span className="item">
                  <span className="name">Balance:</span>
                  <span className="value">{ address ? '2 SOL':'--'}</span>
                </span>
                <span className="item">
                  <span className="name">Win:</span>
                  <span className="value">{ address ? '10':'--'}</span>
                </span>
                <span className="item">
                  <span className="name">Fail:</span>
                  <span className="value">{ address ? '5':'--'}</span>
                </span>
              </div>
            </section>
            <section className="gamePanel list">
              <Link to={"../pk"} className="panel">
                <div
                  className="panel-content  animationLeft"
                  style={{ background: "#1885ed", borderColor: "#1885ed" }}
                >
                  <span>PK</span>
                  <TeamOutlined style={{ fontSize: "0.4rem" }} />
                </div>
              </Link>
              <Link to={"../rank"} className="panel">
                <div
                  className="panel-content animationRight"
                  style={{ background: "#ef6f9a", borderColor: "#ef6f9a" }}
                >
                  <span>Rank</span>
                  <AreaChartOutlined style={{ fontSize: "0.4rem" }} />
                </div>
              </Link>

              {/* <Link to={"../rank"} className="panel">
                <div
                  className="panel-content animationRight"
                  style={{ background: "#07a4d6", borderColor: "#07a4d6" }}
                >
                </div>
              </Link> */}
            </section>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Index;
