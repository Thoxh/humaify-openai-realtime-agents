import { injectTransferTools } from "../utils";
import triageAgent from "./triage";
import authenticationAgent from "./authentication";
import orderStatusAgent from "./orderStatus";
import faqAgent from "./faq";

// Konfiguration der Agent-Verbindungen

// Der Triage-Agent kann zur Authentifizierung oder direkt zum FAQ weiterleiten
triageAgent.downstreamAgents = [authenticationAgent, faqAgent];

// Der Authentication-Agent kann zum OrderStatus oder FAQ weiterleiten
authenticationAgent.downstreamAgents = [orderStatusAgent, faqAgent];

// Der OrderStatus-Agent kann zu FAQ oder zurück zur Authentifizierung weiterleiten
orderStatusAgent.downstreamAgents = [
  authenticationAgent,
  faqAgent
];

// Der FAQ-Agent kann zu allen anderen Services weiterleiten
faqAgent.downstreamAgents = [
  authenticationAgent,
  orderStatusAgent,
  {
    name: "triage",
    publicDescription: "Hauptkoordinator für die Weiterleitung an verschiedene Servicebereiche"
  }
];

// Transfer-Tools zu allen Agenten hinzufügen
const agents = injectTransferTools([
  triageAgent,
  authenticationAgent,
  orderStatusAgent,
  faqAgent
]);

export default agents;