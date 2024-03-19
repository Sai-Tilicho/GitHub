import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function TopNav() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const activeRouteIndex = headNavContent.findIndex(
      (data) => data.href === router.pathname
    );
    setActiveIndex(activeRouteIndex);
  }, [router.pathname]);

  return (
    <section className="topNavSection">
      <div className="topNav_section">
        {headNavContent.map((data, index) => {
          return (
            <div
              className="code"
              key={index}
              style={{
                borderBottom:
                  activeIndex === index ? "2px solid #F78166" : "none",
              }}
            >
              <Link href={data.href} className="headingCode">
                <Image src={data.image} width={16} height={16} alt={data.alt} />
                <span className="code_nav" style={{ width: data.width }}>
                  {data.navData}
                </span>
              </Link>
              <div
                className="rectangle"
              ></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const headNavContent = [
  {
    navData: "Code",
    image: "/assets/frame.svg",
    href: "/",
    alt: "Code Icon",
  },
  {
    navData: "Issue",
    image: "/assets/issues.svg",
    href: "/issue",
    alt: "Issue Icon",
  },
  {
    navData: "Pull request",
    image: "/assets/pull requests.svg",
    href: "/pull-request",
    alt: "pull-request Icon",
    width: "85px",
  },
  {
    navData: "Discussions",
    image: "/assets/discussion.svg",
    href: "/discussion",
    alt: "Discussions Icon",
  },
  {
    navData: "Actions",
    image: "/assets/actions.svg",
    href: "/actions",
    alt: "Actions Icon",
  },
  {
    navData: "Projects",
    image: "/assets/projects.svg",
    href: "/projects",
    alt: "Projects Icon",
  },
  {
    navData: "Security",
    image: "/assets/security.svg",
    href: "/security",
    alt: "Security Icon",
  },
  {
    navData: "Insights",
    image: "/assets/insights.svg",
    href: "/insights",
    alt: "Insights Icon",
  },
];
