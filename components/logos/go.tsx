import { siGo } from "simple-icons";

const Go = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d={siGo.path} fill="currentColor" />
  </svg>
);

export default Go;

