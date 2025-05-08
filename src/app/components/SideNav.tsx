'use client';

import { useState } from 'react';
import Image from 'next/image';

const SideNav = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`bg-black transition-all duration-300 flex flex-col ${
        expanded ? 'w-64' : 'w-16'
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="p-2 cursor-pointer"
      >
        <Image src="/menu-svg.svg" alt="Menu button" width={30} height={30} />
      </button>
      <div className="text-white p-2">
        {expanded ? (
          <Image
            src="/project_mork.svg"
            alt="Mork SVG"
            width={70}
            height={70}
          />
        ) : (
          <Image
            src="/project_mork_icon.png"
            alt="Mork SVG"
            width={70}
            height={70}
          />
        )}
      </div>
      <div className="text-white p-2">
        {expanded ? 'WIP: expanded content' : 'WIP: collapse content'}
      </div>
    </div>
  );
};

export default SideNav;
