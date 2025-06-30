import { AllAgentConfigsType } from "@/app/types";
import frontDeskAuthentication from "./frontDeskAuthentication";
import customerServiceRetail from "./customerServiceRetail";
import simpleExample from "./simpleExample";
import orderCheckSupport from "./orderCheckSupport"; // Neues Agent-Set

export const allAgentSets: AllAgentConfigsType = {
  frontDeskAuthentication,
  customerServiceRetail,
  simpleExample,
  orderCheckSupport, // Hinzugefügt
};

export const defaultAgentSetKey = "simpleExample";