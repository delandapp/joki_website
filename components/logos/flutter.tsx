import { siFlutter } from "simple-icons";

const Flutter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d={siFlutter.path} fill="currentColor" />
  </svg>
);

export default Flutter;

