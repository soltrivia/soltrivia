import { useState } from "react";
import Layout from "../../layout/index";



function Qualify() {

  return (
    <Layout title="">
<div id="qualify-page">
       
        <main>
            <div className="orderTop animationFadeInDown"></div>
            <section className="orderContainer animationFadeInDown">
                <div className="title">
                    <span className="help">?</span>
                    <span className="mark">s.1</span><span className="strong"></span>
                </div>
                <div className="infoLevel">
                    <span className="level">Lv.2<span className="levelProgress"><i style={{width:'0.2rem'}}></i></span></span>
                    <span className="score"><span className="scoreMark"><img src="/img/score.png" /></span><span className="sNum">1000</span></span>
                </div>
            </section>
            <div style={{width:'100%'}}><div className="orderLine orderGradient animationLeft"></div></div> 
            <div className="content orderContent">
                <section className="levelPanel">
                    <a href="../View/PKPanel.html" className="levelPanel animationRight">
                        <div className="bgGradient">
                            <div className="orderBg firstGradient">
                                <div className="levelImg"><img src="/img/f.png" /></div>
                            </div>
                            <label></label>
                            <span className="underLine"></span>
                            <span className="levelScore"><span className="scoreMark"><img src="/img/score.png" /></span><span className="sNum">20</span></span>
                            <div id="starMark" className="clearFloat">
                                <div className="starDiv"><span className="star small starAct"></span></div>
                            </div>
                        </div>
                    </a>
                    <a href="../View/PKPanel.html" className="levelPanel animationLeft">
                        <div className="bgGradient">
                            <div className="orderBg firstGradient">
                                <div className="levelImg"><img src="/img/s.png" /></div>
                            </div>
                            <label></label>
                            <span className="underLine"></span>
                            <span className="levelScore"><span className="scoreMark"><img src="/img/score.png" /></span><span className="sNum">50</span></span>
                            <div id="starMark" className="clearFloat">
                                <div className="starDiv"><span className="star small"></span></div>
                                <div className="starDiv"><span className="star small"></span></div>
                            </div>
                        </div>
                    </a>
                    <a href="#" className="levelPanel animationRight">
                        <div className="bgGradient">
                            <div className="orderBg firstGradient">
                                <div className="levelImg"><img src="/img/t.png" /></div>
                            </div>
                            <label></label>
                            <span className="underLine"></span>
                            <span className="levelScore"><span className="scoreMark"><img src="/img/score.png" /></span><span className="sNum">70</span></span>
                            <div id="starMark" className="clearFloat">
                                <div className="starDiv"><span className="star small"></span></div>
                                <div className="starDiv"><span className="star small"></span></div>
                                <div className="starDiv"><span className="star small"></span></div>
                            </div>
                        </div>
                    </a>
                </section>
            </div>
            <div className="lockLevel animationFadeInUp" id="maskLayer">
                <div className="lock">
                    <div className="lockTop lightBlueShadow"></div>
                    <div className="lockBottom lightBlueShadow"></div>
                    <div className="lockMiddle"><span className="lockS"></span></div>
                </div>
                <div className="circle lightBlueShadow"></div>
                <div className="circle lightBlueShadow"></div>
                <div className="circle lightBlueShadow"></div>
                <div className="more lightBlueShadowT">?</div>
            </div>
        </main>
    </div>
    </Layout>
    
  );
}

export default Qualify;
