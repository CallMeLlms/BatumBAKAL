import type { Href } from "expo-router";
import type { ComponentProps } from "react";
import type FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type IconName = ComponentProps<typeof FontAwesome5>["name"];

export type ProfileMenuItem =
  | {
      id: "personal-details";
      title: string;
      detail: string;
      icon: IconName;
      type: "route";
      href: Href;
    }
  | {
      id: "logout";
      title: string;
      detail: string;
      icon: IconName;
      type: "action";
      action: "logout";
    };

export const PROFILE_MENU: ProfileMenuItem[] = [
  {
    id: "personal-details",
    title: "Personal details",
    detail: "Name, email, and account basics",
    icon: "user-alt",
    type: "route",
    href: "/profile/account",
  },
  {
    id: "logout",
    title: "Log out",
    detail: "End this device session",
    icon: "sign-out-alt",
    type: "action",
    action: "logout",
  },
];