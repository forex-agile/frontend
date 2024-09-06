import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Trade",
  },
  {
    id: uniqueId(),
    title: "Make Spot Order",
    icon: IconTypography,
    href: "/trade/makeOrder",
  },
  {
    id: uniqueId(),
    title: "Create contract",
    icon: IconCopy,
    href: "/trade/makeContract",
  },
  {
    navlabel: true,
    subheader: "User Account",
  },

  {
    id: uniqueId(),
    title: "My Portfolio",
    icon: IconLogin,
    href: "/userAccount/myPortfolio",
  },
  {
    id: uniqueId(),
    title: "Transactions",
    icon: IconLogin,
    href: "/userAccount/transactions",
  },

  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  {
    navlabel: true,
    subheader: "OTHERS",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;
