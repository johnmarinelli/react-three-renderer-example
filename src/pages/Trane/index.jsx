import React from 'react';

import './styles.css';

class Trane extends React.Component {
  render() {
    return (
      <div className="trane">
        <svg xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%" height="100%" viewBox="0 0 100 120">
          <defs>
            {/* https://codepen.io/AmeliaBR/pen/IxiCs?editors=1010 */}
            <filter id="paperTexture"
            filterUnits = "objectBoundingBox"
            primitiveUnits = "userSpaceOnUse"
            x="-5%" y="-5%" width="110%" height="110%"  >
              <desc> Creates a coarse paper-like texture
              </desc>
              <feTurbulence xmlns="http://www.w3.org/2000/svg"
              type="fractalNoise" baseFrequency="0.3 0.1"
              numOctaves="4" result="texture" data-filterId="3">
              </feTurbulence>

              <feColorMatrix in="texture" result="desatTexture"
              type="matrix" values="0.3 0.1 0.1 0 0.2
              0.2 0.5 0.2 0 0.5
              0.2 0.2 0.5 0 0.5
              0   0   0   1 0" />

              <feDisplacementMap in="desatTexture" in2="texture" result="shadow"
              xChannelSelector="R" yChannelSelector="B" scale="25"/>
              <feBlend in2="desatTexture" in="shadow" result="texture2" mode="screen"/>

              <feBlend in="SourceGraphic" in2="texture2" mode="multiply" result="colorTexture"/>

              <feConvoleMatrix order="3" edgeMode="wrap"
              kernelMatrix="-5 -2 5
              -2 5 -2
              5 -2 -5"/>

              <feComposite in2="SourceAlpha" operator="in"/>
            </filter>
          </defs>
          {/* SHAPES */}
          {/* first row */}
          <rect filter="url(#paperTexture)" width="13" height="13" x="0" y="0" fill="#aa2726" />
          <rect filter="url(#paperTexture)" width="13" height="5" x="15" y="0" fill="#cc6425" />
          <rect filter="url(#paperTexture)" width="25" height="13" x="42" y="0" fill="#d9a128" />
          <rect filter="url(#paperTexture)" width="28" height="5" x="69" y="0" fill="#efe348" />

          {/* second row */}
          <rect filter="url(#paperTexture)" width="28" height="18" x="69" y="6.5" fill="#e9bd1d" />

          {/* third row */}
          <rect filter="url(#paperTexture)" width="14" height="9" x="16" y="22.5" fill="#a0305d" />

          {/* fourth row */}
          <rect filter="url(#paperTexture)" width="8.5" height="25" x="0" y="43.5" fill="#694f90" />
          <rect filter="url(#paperTexture)" width="52.5" height="8" x="11.5" y="42.5" fill="#9f3e82" />
          <rect filter="url(#paperTexture)" width="9.5" height="9.5" x="67" y="41.5" fill="#b773a2" />
          <rect filter="url(#paperTexture)" width="17" height="100" x="79.5" y="41.5" fill="#5a88a9" />

          {/* fifth row */}
          <rect filter="url(#paperTexture)" width="20" height="6" x="0" y="71" fill="#8293be" />
          <rect filter="url(#paperTexture)" width="55" height="8" x="21" y="69" fill="#495097" />

          {/* sixth row */}
          <rect filter="url(#paperTexture)" width="35" height="17.5" x="0" y="79" fill="#aac6db" />
          <rect filter="url(#paperTexture)" width="26" height="27" x="39" y="80" fill="#535d9b" />

          {/* seventh row */}
          <rect filter="url(#paperTexture)" width="37" height="16.5" x="0" y="105" fill="#70b095" />


        </svg>
      </div>
    );
  }
};

export default Trane;
