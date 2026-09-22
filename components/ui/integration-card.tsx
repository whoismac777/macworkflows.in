"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

interface VisualContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface TeamCardProps {
  visual: React.ReactNode;
  title: string;
  description: string;
  url: string;
}

interface IntegrationItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  path: string;
  delay: number;
}

const ClaudeLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      fill="none"
      className={className}
    >
      <path
        d="M5.488 18.62L11.004 15.54L11.088 15.26L11.004 15.12H10.724L9.8 15.064L6.664 14.98L3.92 14.84L1.26 14.7L0.588 14.56L0 13.72L0.056 13.3L0.616 12.936L1.428 12.992L3.192 13.132L5.852 13.3L7.784 13.412L10.64 13.748H11.088L11.144 13.552L11.004 13.44L10.892 13.328L8.12 11.48L5.152 9.52L3.584 8.372L2.744 7.812L2.324 7.252L2.156 6.076L2.912 5.236L3.948 5.32L4.2 5.376L5.236 6.188L7.476 7.896L10.36 10.08L10.78 10.416L10.948 10.304L10.976 10.22L10.78 9.912L9.24 7L7.56 4.088L6.804 2.884L6.608 2.156C6.524 1.876 6.496 1.596 6.496 1.316L7.336 0.14L7.84 0L9.016 0.168L9.464 0.56L10.192 2.24L11.34 4.844L13.16 8.372L13.72 9.436L14 10.388L14.084 10.668H14.28V10.528L14.42 8.512L14.7 6.076L14.98 2.94L15.064 2.044L15.512 0.98L16.352 0.42L17.08 0.728L17.64 1.54L17.556 2.044L17.248 4.2L16.52 7.588L16.1 9.884H16.352L16.632 9.576L17.78 8.064L19.712 5.656L20.552 4.676L21.56 3.64L22.204 3.136H23.408L24.276 4.452L23.884 5.824L22.652 7.392L21.616 8.708L20.132 10.696L19.236 12.292L19.32 12.404H19.516L22.876 11.676L24.668 11.368L26.796 11.004L27.776 11.452L27.888 11.9L27.496 12.852L25.2 13.412L22.512 13.972L18.508 14.896L18.452 14.924L18.508 15.008L20.3 15.176L21.084 15.232H22.988L26.516 15.512L27.44 16.072L27.972 16.828L27.888 17.388L26.46 18.116L24.556 17.668L20.076 16.604L18.564 16.24H18.34V16.352L19.628 17.612L21.952 19.712L24.92 22.428L25.06 23.1L24.696 23.66L24.304 23.604L21.728 21.644L20.72 20.804L18.48 18.9H18.34V19.096L18.844 19.852L21.588 23.968L21.728 25.228L21.532 25.62L20.804 25.9L20.048 25.732L18.424 23.492L16.744 20.972L15.428 18.676L15.288 18.788L14.476 27.244L14.112 27.664L13.272 28L12.572 27.44L12.18 26.6L12.572 24.864L13.02 22.624L13.384 20.832L13.72 18.62L13.916 17.892V17.836H13.72L12.04 20.16L9.52 23.604L7.504 25.732L7.028 25.928L6.188 25.508L6.272 24.724L6.72 24.08L9.52 20.496L11.2 18.284L12.32 16.996L12.292 16.856H12.208L4.816 21.672L3.5 21.84L2.94 21.28L2.996 20.44L3.276 20.16L5.516 18.62H5.488Z"
        fill="currentColor"
      />
    </svg>
  );
};

const GitHubLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
};

const WhatsAppLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
};

const GmailLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
};

const SlackLogo = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <rect x="6" y="3.5" width="12" height="4.6" rx="2.3" fill="currentColor" />
      <rect x="16.4" y="6" width="4.6" height="12" rx="2.3" fill="currentColor" />
      <rect x="6" y="15.9" width="12" height="4.6" rx="2.3" fill="currentColor" />
      <rect x="3" y="6" width="4.6" height="12" rx="2.3" fill="currentColor" />
    </svg>
  );
};

const ManusLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      fill="currentColor"
      className={className}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M9.40053 8.55807C8.88268 9.62143 9.31868 10.9063 10.3744 11.4279C11.8907 12.1771 13.2065 12.9159 14.5094 14.3954C15.2896 15.2815 16.6353 15.3627 17.515 14.5768C18.3947 13.7909 18.4753 12.4354 17.695 11.5493C15.8385 9.441 13.9275 8.40615 12.2497 7.57715C11.194 7.05554 9.91838 7.49471 9.40053 8.55807Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20.9079 2.31393C19.7672 2.60119 19.0736 3.76554 19.3588 4.91457C19.558 5.71734 19.7438 6.40375 19.9139 7.03212C20.2395 8.2348 20.5075 9.22481 20.7019 10.4109C20.8934 11.5795 21.9892 12.3704 23.1493 12.1775C24.3095 11.9846 25.0947 10.8809 24.9032 9.71228C24.6735 8.31044 24.3157 6.98407 23.9566 5.65277C23.7976 5.06324 23.6383 4.47275 23.4898 3.87432C23.2046 2.72528 22.0487 2.02667 20.9079 2.31393Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M33.0786 3.63329C32.0734 3.01888 30.7639 3.34167 30.154 4.35425C29.0225 6.23259 28.4277 8.08208 27.8752 10.308C27.59 11.457 28.2836 12.6213 29.4244 12.9086C30.5651 13.1959 31.7211 12.4973 32.0063 11.3482C32.5183 9.28501 32.9881 7.91768 33.7944 6.5792C34.4044 5.56662 34.0839 4.24769 33.0786 3.63329Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M43.9331 56.6106C48.0617 53.9722 50.9164 39.8218 50.2884 35.6081C50.2884 35.6081 49.634 33.3459 48.0372 33.3459C46.8137 33.3458 46.1377 34.3405 45.8884 34.8057C45.6728 34.7259 45.4533 34.6537 45.2792 34.5975C45.1853 34.5672 45.0537 34.5253 44.9304 34.4861L44.6964 34.4115C44.5053 34.3503 44.3255 34.2913 44.1561 34.2328L44.1566 34.1728C44.164 32.8051 44.025 30.6709 42.6083 28.4471C42.3816 28.0912 42.1677 27.7731 41.9848 27.5032L41.8701 27.3342C41.734 27.1338 41.6272 26.9765 41.5245 26.8195C41.2723 26.4345 41.2034 26.2861 41.1767 26.2177L41.1755 26.2146C41.1651 26.1881 41.1438 26.1341 41.138 25.9694C41.1309 25.7671 41.1481 25.3842 41.2793 24.7145L41.9612 21.9896L41.9637 21.9756C42.0087 21.7255 42.0491 21.5007 42.0711 21.1346C42.0914 20.7976 42.0956 20.3078 42.01 19.7398C41.8478 18.6638 41.2257 16.6243 39.0332 15.442C38.4974 15.153 37.8556 14.9801 37.2229 14.8974C36.7976 14.8417 36.229 14.8037 35.5687 14.8547C34.2216 14.9587 32.4539 15.4438 30.8803 16.8865L30.4884 17.2987C29.5737 18.4035 28.6076 19.7714 27.8747 20.9819C25.6495 19.9345 23.0302 18.732 21.2001 18.0855C19.1915 17.3759 16.9497 16.7821 14.843 16.8585C12.5099 16.9431 9.88675 17.9212 8.51344 20.6897C7.94928 21.8269 7.70856 23.1551 7.99827 24.5393C8.27511 25.8621 8.95981 26.8738 9.61373 27.5797C10.8279 28.8904 12.4542 29.7023 13.6004 30.1944C14.478 30.5712 15.3797 30.8848 16.178 31.1385C16.0937 31.2911 16.0092 31.4491 15.9278 31.6094C15.6864 32.0841 15.3976 32.7191 15.2075 33.4457C15.0179 34.1702 14.8684 35.2025 15.1387 36.367C15.4161 37.5623 15.965 38.4957 16.6189 39.2096C16.5941 39.5809 16.5848 39.9722 16.5986 40.3769C16.6906 43.0808 18.3417 44.8835 19.7939 45.9057C21.1776 46.8796 22.8071 47.4773 24.1246 47.8792C25.3968 48.2673 26.7402 48.5753 27.8317 48.8255L28.0653 48.8791C29.2286 49.1463 30.3783 49.4555 31.5285 49.7647C32.833 50.1155 34.1381 50.4664 35.4641 50.7565C35.8978 50.8514 36.3192 50.9422 36.7069 51.0249L36.8481 51.393C38.5683 55.7887 40.8651 58.5713 43.9331 56.6106ZM28.2156 38.6193C27.9801 38.5236 27.845 38.4602 27.7251 38.3997C26.6832 37.8576 25.4015 38.2663 24.8596 39.3147C24.3165 40.3653 24.723 41.6609 25.7659 42.2079C25.8514 42.2525 25.9381 42.2945 26.0253 42.3356C26.1714 42.4046 26.3749 42.4963 26.6227 42.597C27.1114 42.7955 27.8062 43.0427 28.5938 43.211C29.9917 43.5097 32.5756 43.7375 34.3274 41.715C35.1684 40.7441 35.5727 39.4684 35.7263 38.2756C35.8845 37.0467 35.8056 35.6985 35.4968 34.3864C34.8887 31.8017 33.2785 28.9733 30.272 27.6319C27.6959 26.4825 25.1502 26.2123 23.0033 26.4547C21.57 26.6166 20.2006 27.0229 19.1006 27.6421V27.5944C16.4105 26.8207 11.0571 25.2808 12.3754 22.6232C13.3748 20.6086 16.1129 20.7751 19.8267 22.0871C21.3351 22.62 23.4312 23.5696 25.4084 24.4956C26.0213 24.7827 26.6228 25.0674 27.1918 25.3369C28.0211 25.7295 29.4076 26.3762 29.4076 26.3762C30.9845 24.47 31.5968 23.42 32.1372 22.4931C32.5089 21.8557 32.8466 21.2765 33.4408 20.5172C34.2818 19.4424 35.6412 18.7782 37.0357 19.1671C38.0076 19.6912 37.7607 21.015 37.7607 21.015L37.0852 23.7141C36.4404 26.8905 37.1541 27.9417 38.3305 29.6741C38.5371 29.9784 38.7581 30.3038 38.9884 30.6653C39.9266 32.1381 39.8833 33.5542 39.8479 34.71C39.8251 35.4534 39.8057 36.0891 40.0528 36.5629C40.5618 37.5387 42.4666 38.1438 43.7154 38.5405C44.0155 38.6358 44.2777 38.7191 44.4736 38.7927L44.6074 38.8457C44.4314 39.3955 44.2715 39.9646 44.1117 40.5332C43.4013 43.0618 42.6941 45.5791 40.5854 46.3334C37.9241 47.2853 35.2627 46.3846 35.2627 46.3846C34.783 46.2434 34.2945 46.1341 33.806 46.0247C33.1971 45.8885 32.588 45.7521 31.9952 45.554C31.1691 45.2451 30.0119 44.9796 28.7543 44.691C25.7598 44.004 22.1958 43.1863 21.1752 41.3406C21.0033 41.0297 20.9035 40.6896 20.8908 40.316C20.8331 38.6187 21.4235 37.099 21.4235 37.099C21.4235 37.099 20.5079 37.1028 19.8658 36.4806C19.6264 36.2487 19.4251 35.9298 19.3233 35.4913C19.12 34.6153 19.2946 33.3456 20.3591 32.2733L20.8926 31.7374C21.1621 31.466 21.961 30.8884 23.4778 30.7171C24.9176 30.5545 26.7 30.7292 28.5474 31.5535C29.9644 32.1857 30.9442 33.6362 31.3534 35.3755C31.5534 36.2255 31.5901 37.0507 31.5034 37.724C31.4121 38.4334 31.211 38.7887 31.1188 38.8952C31.0042 39.0275 30.6006 39.2553 29.4775 39.0153C29.0047 38.9142 28.5556 38.7574 28.2156 38.6193Z" />
    </svg>
  );
};

const N8nLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" />
    </svg>
  );
};

const SheetsLogo = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4.5 8.5h15M4.5 13h15M4.5 17.5h15M10 8.5V21M15 8.5V21"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
};

// Octagon around center 282, 205 — Mac Work Flows is the hub
const integrations: IntegrationItem[] = [
  {
    id: "claude", // Left
    icon: ClaudeLogo,
    x: 142,
    y: 205,
    path: "M 282 205 H 142",
    delay: 0.1,
  },
  {
    id: "sheets", // Top-Left
    icon: SheetsLogo,
    x: 183,
    y: 106,
    path: "M 270 205 V 121 Q 270 106 255 106 H 183",
    delay: 0.2,
  },
  {
    id: "github", // Top
    icon: GitHubLogo,
    x: 282,
    y: 65,
    path: "M 282 205 V 65",
    delay: 0.3,
  },
  {
    id: "gmail", // Top-Right
    icon: GmailLogo,
    x: 381,
    y: 106,
    path: "M 294 205 V 121 Q 294 106 309 106 H 381",
    delay: 0.4,
  },
  {
    id: "manus", // Right
    icon: ManusLogo,
    x: 422,
    y: 205,
    path: "M 282 205 H 422",
    delay: 0.5,
  },
  {
    id: "slack", // Bottom-Right
    icon: SlackLogo,
    x: 381,
    y: 304,
    path: "M 294 205 V 289 Q 294 304 309 304 H 381",
    delay: 0.6,
  },
  {
    id: "n8n", // Bottom
    icon: N8nLogo,
    x: 282,
    y: 345,
    path: "M 282 205 V 345",
    delay: 0.7,
  },
  {
    id: "whatsapp", // Bottom-Left
    icon: WhatsAppLogo,
    x: 183,
    y: 304,
    path: "M 270 205 V 289 Q 270 304 255 304 H 183",
    delay: 0.8,
  },
];

const AnimatedPath = ({ d, id }: { d: string; id: string }) => {
  return (
    <>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-border"
      />
      <motion.path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth="2"
        fill="none"
        strokeDasharray="40 160"
        initial={{ strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: -200 }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2,
        }}
      />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="transparent" />
          <stop
            offset="50%"
            stopColor="var(--color-primary)"
            stopOpacity="0.5"
          />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </>
  );
};

export function Integration() {
  const containerId = useId();

  return (
    <div className="relative h-full w-full">
      {/* SVG Lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 564 410"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {integrations.map((integration) => (
          <AnimatedPath
            key={integration.id}
            d={integration.path}
            id={`${containerId}-${integration.id}`}
          />
        ))}
      </svg>

      {/* Center Logo — Mac Work Flows hub */}
      <div className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg border border-white/25 bg-foreground px-3 py-2 text-background shadow-md sm:rounded-2xl sm:px-3.5 sm:py-2.5 sm:shadow-xl">
        <span className="grid size-6 place-items-center rounded-md bg-background text-xs font-extrabold text-foreground sm:size-7 sm:text-sm">
          M
        </span>
        <span className="text-sm font-extrabold tracking-tight whitespace-nowrap sm:text-base">
          Mac Work Flows
        </span>
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-foreground/30 sm:rounded-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Peripheral Icons */}
      {integrations.map((integration) => {
        const Icon = integration.icon;
        return (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: integration.delay }}
            style={{
              left: `${(integration.x / 564) * 100}%`,
              top: `${(integration.y / 410) * 100}%`,
            }}
            className="absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-background shadow-sm sm:h-12 sm:w-12 md:h-13.5 md:w-13.5 sm:rounded-xl text-foreground"
          >
            <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-foreground" />
          </motion.div>
        );
      })}
    </div>
  );
}

export function VisualContainer({ children, className }: VisualContainerProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-564/460 w-full items-center justify-center overflow-hidden rounded-none bg-muted p-8 sm:aspect-564/410 dark:bg-muted/50",
        className,
      )}
    >
      {/* Dots Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/60 from-10% via-transparent to-90% to-background/60" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

const IntegrationCard = ({
  visual,
  title,
  description,
  url,
}: TeamCardProps) => {
  return (
    <Card className="mx-auto flex w-full flex-col sm:max-w-141 rounded-2xl overflow-hidden p-0 ring-0 border gap-0">
      <VisualContainer>{visual}</VisualContainer>

      <CardContent className="p-6 sm:p-8 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight">
            {title}
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <Button
          nativeButton={false}
          className="h-10 w-fit rounded-full px-5 hover:bg-primary/80 cursor-pointer"
          render={<a href={url} />}
        >
          Learn more
        </Button>
      </CardContent>
    </Card>
  );
};

export function IntegrationCardDemo() {
  return (
    <div className="flex items-center justify-center w-full min-h-96 p-4 sm:p-6">
      <IntegrationCard
        visual={<Integration />}
        title="Seamless Integrations"
        description="Connect your favorite tools and keep your workflows unified without switching between platforms."
        url="#"
      />
    </div>
  );
}

export default IntegrationCardDemo;
