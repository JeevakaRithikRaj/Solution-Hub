import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.09 16.34c-2.45.6-5.1-.6-6.19-2.81" />
      <path d="M12 22a7.02 7.02 0 0 1-4.95-11.95C7.93 7.6 10.97 6 12 6c.07 0 .13.01.2.01" />
      <path d="M18 10c0-1.77-1.12-3.28-2.69-3.81" />
      <path d="m18 10-2.3-2.3" />
      <path d="M13.59 7.91 12 6v2" />
      <path d="M11 14v-2" />
      <path d="M15 13h-2" />
      <path d="M12 18a4 4 0 0 0 4-4h-4v4Z" />
    </svg>
  ),
  spinner: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
};
