import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-8 pb-16 sm:pb-20 border-t border-[var(--border)] mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500">
      {/* Left: @Minn Thant Hmue. All rights reserved. */}
      <div className="flex items-center gap-2 select-none">
        <span className="font-normal text-zinc-500">&copy; Minn Thant Hmue. All rights reserved.</span>
      </div>

      {/* Right: text links for email, github, linkedin */}
      <div className="flex items-center gap-5">
        <a
          href="mailto:minnthanthmue04@gmail.com"
          className="animated-link text-zinc-600 hover:text-[#2F4BFF] font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BFF] rounded-sm py-0.5 px-1"
        >
          Email
        </a>
        <a
          href="https://github.com/minnthanthmue"
          target="_blank"
          rel="noopener noreferrer"
          className="animated-link text-zinc-600 hover:text-[#2F4BFF] font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BFF] rounded-sm py-0.5 px-1"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/minn-thant-hmue"
          target="_blank"
          rel="noopener noreferrer"
          className="animated-link text-zinc-600 hover:text-[#2F4BFF] font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#2F4BFF] rounded-sm py-0.5 px-1"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
