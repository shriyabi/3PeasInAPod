import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
    useEffect(() => {
        function animateWithRandomNumber(myClass, from, to) {
            gsap.fromTo(myClass, Math.floor(Math.random() * 20 + 1), { y: from }, {
                y: to,
                onComplete: animateWithRandomNumber,
                onCompleteParams: [myClass, from, to],
                ease: "none"
            });
        }

        const itemsDown = [".light4", ".light5", ".light6", ".light7", ".light8", ".light11", ".light12", ".light13", ".light14", ".light15", ".light16"];
        itemsDown.forEach(e => animateWithRandomNumber(e, -1080, 1080));

        const itemsUp = [".light1", ".light2", ".light3", ".light9", ".light10", ".light17"];
        itemsUp.forEach(e => animateWithRandomNumber(e, 1080, -1080));
    }, []);

    return (
        <div className="container">
            <svg id="lines" className="background__lights" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1920 1080" xmlSpace="preserve" preserveAspectRatio="none">
                <g className="lines">
                    <rect className="line" x="1253.6" width="4.5" height="1080" />
                    <rect className="line" x="873.3" width="1.8" height="1080" />
                    <rect className="line" x="1100" width="1.8" height="1080" />
                    <rect className="line" x="1547.1" width="4.5" height="1080" />
                    <rect className="line" x="615" width="4.5" height="1080" />
                    <rect className="line" x="684.6" width="1.8" height="1080" />
                    <rect className="line" x="1369.4" width="1.8" height="1080" />
                    <rect className="line" x="1310.2" width="0.9" height="1080" />
                    <rect className="line" x="1233.4" width="0.9" height="1080" />
                    <rect className="line" x="124.2" width="0.9" height="1080" />
                    <rect className="line" x="1818.4" width="4.5" height="1080" />
                    <rect className="line" x="70.3" width="4.5" height="1080" />
                    <rect className="line" x="1618.6" width="1.8" height="1080" />
                    <rect className="line" x="455.9" width="1.8" height="1080" />
                    <rect className="line" x="328.7" width="1.8" height="1080" />
                    <rect className="line" x="300.8" width="4.6" height="1080" />
                    <rect className="line" x="1666.4" width="0.9" height="1080" />
                </g>
                <g className="lights">
                    <path className="light4 light" d="M1345,400h-4v20h4V400z M1345,600h-4v30h4V600z M1345,50h-4v40h4V50z" />
                    <path className="light5 light" d="M970,150h-3v10h3V150z M970,300h-3v20h3V300z M970,500h-3v15h3V500z M970,0h-3v40h3V0z" />
                    <path className="light6 light" d="M1500,550h-4.5v15h4.5V550z M1500,700h-4.5v10h4.5V700z M1500,200h-4.5v25h4.5V200z M1500,0h-4.5v50h4.5V0z" />
                    <path className="light7 light" d="M700,250h-2.5v12h2.5V250z M700,500h-2.5v18h2.5V500z M700,100h-2.5v20h2.5V100z M700,0h-2.5v50h2.5V0z" />
                    <path className="light8 light" d="M1400,350h-5v20h5V350z M1400,550h-5v30h5V550z M1400,150h-5v40h5V150z" />

                    <path className="light11 light" d="M1100,400h-3v15h3V400z M1100,600h-3v25h3V600z M1100,100h-3v35h3V100z" />
                    <path className="light12 light" d="M500,200h-2v20h2V200z M500,400h-2v30h2V400z M500,0h-2v45h2V0z" />
                    <path className="light13 light" d="M1200,450h-3v20h3V450z M1200,650h-3v25h3V650z M1200,50h-3v40h3V50z" />
                    <path className="light14 light" d="M800,350h-2.5v15h2.5V350z M800,550h-2.5v20h2.5V550z M800,100h-2.5v30h2.5V100z" />
                    <path className="light15 light" d="M1600,250h-5v10h5V250z M1600,450h-5v15h5V450z M1600,0h-5v35h5V0z" />
                    <path className="light16 light" d="M600,300h-4v18h4V300z M600,500h-4v25h4V500z M600,0h-4v40h4V0z" />

                </g>
            </svg>
        </div>
    );
};

export default AnimatedBackground;
