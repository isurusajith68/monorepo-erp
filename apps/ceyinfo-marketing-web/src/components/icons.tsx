interface IconProps {
  className?: string
}

export const Icons = {
  admin: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={`h-6 w-6 ${props.className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4v4M8 4v4M16 4v4M5 11h14M5 19h14M9 15h6"
      />
    </svg>
  ),
  finance: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={`h-6 w-6 ${props.className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v8m4-4H8"
      />
    </svg>
  ),
  authentication: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={`h-6 w-6 ${props.className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 12v4m0 0v4m0-8h4m-4 0H8"
      />
    </svg>
  ),
  booking: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={`h-6 w-6 ${props.className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 12h14M5 12a5 5 0 015-5h4a5 5 0 015 5m-5 4v4M8 16v4m-1-1h10M5 7h14"
      />
    </svg>
  ),
  inventory: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={`h-6 w-6 ${props.className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 12h18M3 6h18M3 18h18M9 6v12m6-12v12"
      />
    </svg>
  ),
  templates: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={`h-6 w-6 ${props.className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7h8M8 11h8m-8 4h8m-9 2h10M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
      />
    </svg>
  ),
  // Add other icons as needed
}
