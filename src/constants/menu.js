import {
  Home,
  Box,
  DollarSign,
  Tag,
  Clipboard,
  Camera,
  AlignLeft,
  UserPlus,
  Users,
  Chrome,
  BarChart,
  Settings,
  Archive,
  LogIn,
  FileText,
  CreditCard,
} from "react-feather";

const countriesAir = [
  "china",
  "india",
  "thailand",
  "singapore",
  "dubai",
  "hongkong",
  "malaysia",
  "pakistan",
];
const countriesSea = ["china", "thailand", "singapore", "hongkong", "malaysia"];
export const MENUITEMSFORADMIN = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  {
    title: "Booking Request",
    icon: Clipboard,
    type: "sub",
    active: false,
    children: [
      {
        path: "/booking-request/Pending",
        title: "Requested",
        type: "link",
      },
      {
        path: "/booking-request/Success",
        title: "Approved",
        type: "link",
      },
    ],
  },
  {
    title: "Lot",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      {
        path: "/lot/lot-list",
        title: "Create Lot",
        type: "link",
      },
    ],
  },
  {
    title: "Orders",
    icon: DollarSign,
    type: "sub",
    active: false,
    children: [
      { path: "/orders/D2D", title: "Door to Door", type: "link" },
      { path: "/orders/Freight", title: "Freight", type: "link" },
      { path: "/orders/express", title: "Express", type: "link" },
    ],
  },

  {
    title: "Invoice",
    icon: Archive,
    type: "sub",
    active: false,
    children: [
      {
        path: "/invoice-d2d-freight",
        title: "D2D/Freight",
        type: "link",
      },
      {
        path: "/invoice-express",
        title: "Express",
        type: "link",
      },
    ],
  },
  {
    title: "Recharge",
    icon: Tag,
    type: "sub",
    active: false,
    children: [
      {
        path: "/recharge/recharge-request",
        title: "Recharge Request",
        type: "link",
      },
      {
        path: "/recharge/recharge-wallet",
        title: "Recharge Wallet",
        type: "link",
      },
      {
        path: "/recharge/recharge-history",
        title: "Recharge History",
        type: "link",
      },
    ],
  },
  {
    title: "Payments",
    icon: BarChart,
    type: "sub",
    active: false,
    children: [
      {
        path: "/payments",
        title: "Payments History",
        type: "link",
      },
    ],
  },
  {
    title: "Delivery",
    icon: FileText,
    type: "sub",
    active: false,
    children: [
      {
        path: "/delivery/D2D",
        title: "D2D",
        type: "link",
      },
      {
        path: "/delivery/Freight",
        title: "Freight",
        type: "link",
      },
      {
        path: "/delivery-express",
        title: "Express",
        type: "link",
      },
    ],
  },
  {
    title: "Refunds",
    icon: CreditCard,
    type: "sub",
    active: false,
    children: [
      {
        path: "/refund/refund-request",
        title: "Refund Request",
        type: "link",
      },
      {
        path: "/refund/all-refunds",
        title: "All Refunds",
        type: "link",
      },
    ],
  },
  {
    title: "Calculation",
    icon: DollarSign,
    type: "sub",
    active: false,
    children: [
      { path: "/calculation/D2D", title: "Door to Door", type: "link" },
      { path: "/calculation/Freight", title: "Freight", type: "link" },
      { path: "/calculation/express", title: "Express", type: "link" },
    ],
  },

  {
    title: "Express Rates",
    icon: Clipboard,
    type: "sub",
    active: false,
    children: [
      {
        path: "/express-rates/document",
        title: "Document",
        type: "link",
      },
      {
        path: "/express-rates/parcel",
        title: "Parcel",
        type: "link",
      },
    ],
  },
  {
    title: "D2D Rates",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      {
        title: "Air",
        type: "sub",
        active: false,
        children: countriesAir.map((country) => {
          return {
            path: `/d2d-rates/air-${country}`,
            title: country,
            type: "link",
          };
        }),
      },
      {
        title: "Sea",
        type: "sub",
        active: false,
        children: countriesSea.map((country) => {
          return {
            path: `/d2d-rates/sea-${country}`,
            title: country,
            type: "link",
          };
        }),
      },
    ],
  },
  {
    title: "Users",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: "/users/list-user", title: "User List", type: "link" },
      // { path: '/users/create-user', title: 'Create User', type: 'link' },
    ],
  },

  {
    title: "Communication",
    icon: Users,
    type: "sub",
    active: false,
    children: [
      {
        path: "/communication/lots",
        title: "Lots",
        type: "link",
      },
      {
        path: "/communication/customers",
        title: "Customers",
        type: "link",
      },
      {
        path: "/communication/notice",
        title: "Notice",
        type: "link",
      },
      {
        path: "/communication/intro-modal",
        title: "Intro Modal",
        type: "link",
      },
    ],
  },

  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    active: false,
    children: [{ path: "/settings/profile", title: "Profile", type: "link" }],
  },

  {
    title: "Admins",
    icon: UserPlus,
    type: "sub",
    active: false,
    children: [
      { path: "/admins/list-admin", title: "All Admins", type: "link" },
      // { path: '/users/create-user', title: 'Create User', type: 'link' },
    ],
  },

  {
    title: "Register a manager",
    path: "/",
    icon: LogIn,
    type: "link",
    active: false,
  },
];
export const MENUITEMSFORACCOUNTS = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  {
    title: "Booking Request",
    icon: Clipboard,
    type: "sub",
    active: false,
    children: [
      {
        path: "/booking-request/Pending",
        title: "Requested",
        type: "link",
      },
      {
        path: "/booking-request/Success",
        title: "Approved",
        type: "link",
      },
    ],
  },

  {
    title: "Invoice",
    icon: Archive,
    type: "sub",
    active: false,
    children: [
      {
        path: "/invoice-d2d-freight",
        title: "D2D/Freight",
        type: "link",
      },
      {
        path: "/invoice-express",
        title: "Express",
        type: "link",
      },
    ],
  },
  {
    title: "Recharge",
    icon: Tag,
    type: "sub",
    active: false,
    children: [
      {
        path: "/recharge/recharge-request",
        title: "Recharge Request",
        type: "link",
      },
      {
        path: "/recharge/recharge-wallet",
        title: "Recharge Wallet",
        type: "link",
      },
      {
        path: "/recharge/recharge-history",
        title: "Recharge History",
        type: "link",
      },
    ],
  },
  {
    title: "Payments",
    icon: BarChart,
    type: "sub",
    active: false,
    children: [
      {
        path: "/payments",
        title: "Payments History",
        type: "link",
      },
    ],
  },

  {
    title: "Refunds",
    icon: CreditCard,
    type: "sub",
    active: false,
    children: [
      {
        path: "/refund/refund-request",
        title: "Refund Request",
        type: "link",
      },
      {
        path: "/refund/all-refunds",
        title: "All Refunds",
        type: "link",
      },
    ],
  },

  {
    title: "Communication",
    icon: Users,
    type: "sub",
    active: false,
    children: [
      {
        path: "/communication/lots",
        title: "Lots",
        type: "link",
      },
      {
        path: "/communication/customers",
        title: "Customers",
        type: "link",
      },
      {
        path: "/communication/notice",
        title: "Notice",
        type: "link",
      },
      {
        path: "/communication/intro-modal",
        title: "Intro Modal",
        type: "link",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    active: false,
    children: [{ path: "/settings/profile", title: "Profile", type: "link" }],
  },
];

export const MENUITEMSFOREMPLOYEE = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  {
    title: "Booking Request",
    icon: Clipboard,
    type: "sub",
    active: false,
    children: [
      {
        path: "/booking-request/Pending",
        title: "Requested",
        type: "link",
      },
      {
        path: "/booking-request/Success",
        title: "Approved",
        type: "link",
      },
    ],
  },
  {
    title: "Orders",
    icon: DollarSign,
    type: "sub",
    active: false,
    children: [
      { path: "/orders/D2D", title: "Door to Door", type: "link" },
      { path: "/orders/Freight", title: "Freight", type: "link" },
      { path: "/orders/express", title: "Express", type: "link" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    active: false,
    children: [{ path: "/settings/profile", title: "Profile", type: "link" }],
  },
];

export const MENUITEMSFOROFFICER = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  {
    title: "Lot",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      {
        path: "/lot/lot-list",
        title: "Create Lot",
        type: "link",
      },
    ],
  },
  {
    title: "Orders",
    icon: DollarSign,
    type: "sub",
    active: false,
    children: [
      { path: "/orders/D2D", title: "Door to Door", type: "link" },
      { path: "/orders/Freight", title: "Freight", type: "link" },
      { path: "/orders/express", title: "Express", type: "link" },
    ],
  },

  {
    title: "Delivery",
    icon: FileText,
    type: "sub",
    active: false,
    children: [
      {
        path: "/delivery/D2D",
        title: "D2D",
        type: "link",
      },
      {
        path: "/delivery/Freight",
        title: "Freight",
        type: "link",
      },
      {
        path: "/delivery-express",
        title: "Express",
        type: "link",
      },
    ],
  },

  {
    title: "Express Rates",
    icon: Clipboard,
    type: "sub",
    active: false,
    children: [
      {
        path: "/express-rates/document",
        title: "Document",
        type: "link",
      },
      {
        path: "/express-rates/parcel",
        title: "Parcel",
        type: "link",
      },
    ],
  },
  {
    title: "D2D Rates",
    icon: Box,
    type: "sub",
    active: false,
    children: [
      {
        title: "Air",
        type: "sub",
        active: false,
        children: countriesAir.map((country) => {
          return {
            path: `/d2d-rates/air-${country}`,
            title: country,
            type: "link",
          };
        }),
      },
      {
        title: "Sea",
        type: "sub",
        active: false,
        children: countriesSea.map((country) => {
          return {
            path: `/d2d-rates/sea-${country}`,
            title: country,
            type: "link",
          };
        }),
      },
    ],
  },
  {
    title: "Communication",
    icon: Users,
    type: "sub",
    active: false,
    children: [
      {
        path: "/communication/lots",
        title: "Lots",
        type: "link",
      },
      {
        path: "/communication/customers",
        title: "Customers",
        type: "link",
      },
      {
        path: "/communication/notice",
        title: "Notice",
        type: "link",
      },
      {
        path: "/communication/intro-modal",
        title: "Intro Modal",
        type: "link",
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    type: "sub",
    active: false,
    children: [{ path: "/settings/profile", title: "Profile", type: "link" }],
  },
];
