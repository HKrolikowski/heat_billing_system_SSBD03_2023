import * as React from "react";

function IconViewList(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M9 5v4h12V5M9 19h12v-4H9m0-1h12v-4H9M4 9h4V5H4m0 14h4v-4H4m0-1h4v-4H4v4z" />
    </svg>
  );
}

export default IconViewList;