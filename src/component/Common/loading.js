import React from "react";
import ContentLoader from "react-content-loader"
const Element = (props) => {
    return (
      <ContentLoader
        speed={3}
        backgroundColor="#D4D4D4"
        foregroundColor="#F7F7F7"
        {...props}
      >
    <rect x="972.08" y="56.77" width="97.5" height="17.08"/>
	<rect x="976.32" y="7" width="97.5" height="17.08"/>
	<rect x="34.06" y="59.28" width="97.5" height="17.08"/>
	<rect x="34.06" y="192.72" width="97.5" height="17.08"/>
	<rect x="34.06" y="122.03" width="97.5" height="17.08"/>
	<rect x="221.07" y="122.03" width="97.5" height="17.08"/>
	<rect x="438.34" y="122.03" width="97.5" height="17.08"/>
	<rect x="620.67" y="122.03" width="97.5" height="17.08"/>
	<rect x="777.37" y="122.03" width="97.5" height="17.08"/>
	<rect x="948.26" y="122.03" width="97.5" height="17.08"/>
	<rect x="34.06" y="156.18" width="97.5" height="17.08"/>
	<rect x="221.07" y="156.18" width="97.5" height="17.08"/>
	<rect x="438.34" y="156.18" width="97.5" height="17.08"/>
	<rect x="620.67" y="156.18" width="97.5" height="17.08"/>
	<rect x="777.37" y="156.18" width="97.5" height="17.08"/>
	<rect x="948.26" y="156.18" width="97.5" height="17.08"/>
	<rect x="34.06" y="89.46" width="97.5" height="17.08"/>
	<rect x="221.07" y="89.46" width="97.5" height="17.08"/>
	<rect x="438.34" y="89.46" width="97.5" height="17.08"/>
	<rect x="620.67" y="89.46" width="97.5" height="17.08"/>
	<rect x="777.37" y="89.46" width="97.5" height="17.08"/>
	<rect x="948.26" y="89.46" width="97.5" height="17.08"/>
	<rect x="963.08" y="191.66" width="106.36" height="21.98"/>
	<rect x="28.07" y="149.5" width="1041.68" height="0.6"/>
	<rect x="28.07" y="179.69" width="1041.68" height="0.6"/>
	<rect x="28.07" y="112.97" width="1041.68" height="1.29"/>
	<rect x="28.07" y="80.67" width="1041.68" height="1.29"/>
	<rect x="191.84" y="80.89" width="1.97" height="99.32"/>
	<rect x="405.89" y="80.89" width="1.97" height="99.32"/>
	<rect x="592.54" y="80.89" width="1.97" height="99.32"/>
	<rect x="756.16" y="80.89" width="1.97" height="99.32"/>
	<rect x="911.83" y="80.89" width="1.97" height="99.32"/>
	<rect x="1068.3" y="80.89" width="1.97" height="99.32"/>
	<rect x="27.29" y="80.89" width="1.97" height="99.32"/>
        </ContentLoader>
  );
};

const Loading = () =>{
    return      <div style={{ width: "100%"}}>
    <Element viewBox="0 0 1100 256" />
  </div>
    //  <div className="spinner-border text-primary" role="status">
    // <span className="visually-hidden"></span>
    // </div>
}
export default Loading;
