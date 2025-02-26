import React from 'react';
import advid from '../assets/images/cbpwervid.mp4';

function AdStrip() {
    return (
        <div className="bg--400 h-[6rem] w-full  p-0">
            <video src={advid} autoPlay loop muted className="w-full h-full object-cover block" />
        </div>
    );
}

export default AdStrip;
