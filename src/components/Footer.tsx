import Link from "next/link";
import React from "react";

const socialMedia = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1Hx9fH6jph/?mibextid=wwXIfr",
  },
  {
    name: "Twitter",
    url: "https://x.com/thecatchmeapp?s=21",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/thecatchme_app/profilecard/?igsh=NmRzbmw4aTh6aXA=",
  },
];
const Footer = ({}) => {
  return (
    <div
      className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-evenly bg-[#333] 
    pl-10 sm:pl-0 py-5
    "
    >
      <div className="flex flex-col gap-2">
        <h4 className="font-raleway text-white">Community</h4>
        {socialMedia.map((item, index) => (
          <a
            target="_blank"
            href={item.url}
            key={index}
            // onClick={() => openLinks(item.url)}
            className="text-white font-dmSans cursor-pointer hover:underline"
          >
            {item.name}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-raleway text-white">Safety</h4>
        <Link
          target="_blank"
          href="/support"
          // onClick={moveToFAQS}
          className="text-white font-dmSans cursor-pointer hover:underline"
        >
          Support
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-raleway text-white ">Contact</h4>

        <a
          href="mailto:support@thecatchmeapp.co"
          // onClick={moveToCommunityGuidelines}
          className="text-white font-dmSans cursor-pointer hover:underline"
        >
          CatchMe Info
        </a>
        <a
          href="mailto:support@thecatchmeapp.co"
          // onClick={moveToCommunityGuidelines}
          className="text-white font-dmSans cursor-pointer hover:underline"
        >
          CatchMe support
        </a>
      </div>
    </div>
  );
};

export default Footer;
