import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-1">
      <p className="text-center mt-1 hover:text-emerald-500">
        <Link href='https://www.glintai.io/'>GlintAI@2024, All Rights Reserved</Link>
        
        {/* <a
          className="ml-4"
          rel="noreferrer"
          target="_blank"
          href="https://storyset.com/people"
        >
          People illustrations by Storyset
        </a> */}
      </p>
    </footer>
  );
};

export default Footer;
