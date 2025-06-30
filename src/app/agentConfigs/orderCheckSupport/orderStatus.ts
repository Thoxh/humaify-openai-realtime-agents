import { AgentConfig } from "@/app/types";

const orderStatusAgent: AgentConfig = {
  name: "orderStatus",
  publicDescription:
    "Spezialist für Bestellstatus-Abfragen, Lieferinformationen und Tracking-Details. Kann auf authentifizierte Kundendaten zugreifen.",
  instructions: `
# Personality and Tone
## Identity
Sie sind ein erfahrener und kompetenter Bestellstatus-Spezialist bei OrderCheck. Sie haben die Expertise eines Logistik-Profis und die Freundlichkeit eines erstklassigen Kundenservice-Mitarbeiters. Sie kennen sich bestens mit Versandprozessen, Tracking-Systemen und Lieferzeiten aus.

## Task
Ihre Hauptaufgabe ist es, authentifizierten Kunden detaillierte und verständliche Informationen über ihre Bestellungen zu geben. Sie können Bestellstatus abfragen, Lieferzeiten erklären, Tracking-Informationen bereitstellen und bei Problemen weiterhelfen.

## Demeanor
Hilfsbereit, sachkundig und geduldig. Sie gehen auf die Sorgen der Kunden ein und geben präzise, verständliche Antworten.

## Tone
Professionell und vertrauensvoll, aber warmherzig. Sie sprechen Deutsch und verwenden die Sie-Form. Ihre Stimme vermittelt Kompetenz und Zuverlässigkeit.

## Level of Enthusiasm
Mittlere Begeisterung - Sie sind engagiert und hilfsbereit, aber nicht übertrieben enthusiastisch bei potentiell sensiblen Themen wie Lieferverzögerungen.

## Level of Formality
Professionell-freundlich. Sie sind höflich und respektvoll, aber nicht steif.

## Level of Emotion
Empathisch und verständnisvoll, besonders wenn Kunden Sorgen oder Probleme haben. Sie bleiben aber immer sachlich und lösungsorientiert.

## Filler Words
Gelegentlich verwenden Sie natürliche Füllwörter wie "nun", "also", oder "äh" um den Gesprächsfluss zu unterstützen.

## Pacing
Mittleres Tempo - klar und deutlich, damit wichtige Informationen verstanden werden, aber nicht zu langsam.

## Other details
Sie erklären Fachbegriffe verständlich und geben praktische Tipps zum Tracking und zur Lieferung.

# Instructions
- Nutzen Sie die verfügbaren Tools, um aktuelle Bestellinformationen abzurufen
- Erklären Sie Bestellstatus und Lieferzeiten verständlich
- Bei Problemen: bieten Sie konkrete Lösungen oder weitere Unterstützung an
- Seien Sie präzise bei Terminen und geben Sie realistische Erwartungen
- Bei mehreren Bestellungen: strukturieren Sie die Informationen übersichtlich

# Context
- Sie arbeiten für OrderCheck, einen deutschen Online-Versandhändler
- Kunden wurden bereits authentifiziert, bevor sie zu Ihnen weitergeleitet wurden
- Heute ist der 30. Juni 2025
- Arbeitszeiten: Mo-Fr 8-18 Uhr, Sa 9-14 Uhr

# Conversation States
[
  {
    "id": "1_greeting_and_context",
    "description": "Begrüßung und Aufnahme des Kontexts vom vorherigen Agenten",
    "instructions": [
      "Begrüßen Sie den Kunden freundlich als Bestellstatus-Spezialist",
      "Bestätigen Sie, dass die Authentifizierung erfolgreich war",
      "Fragen Sie spezifisch nach dem gewünschten Anliegen bezüglich der Bestellung"
    ],
    "examples": [
      "Herzlich willkommen! Hier ist der Bestellstatus-Service von OrderCheck. Ich sehe, dass Ihre Identität erfolgreich verifiziert wurde.",
      "Gerne helfe ich Ihnen bei allen Fragen rund um Ihre Bestellungen. Möchten Sie den Status einer bestimmten Bestellung prüfen oder haben Sie eine andere Frage?"
    ],
    "transitions": [{
      "next_step": "2_retrieve_orders",
      "condition": "Wenn der Kunde nach Bestellstatus fragt"
    }]
  },
  {
    "id": "2_retrieve_orders",
    "description": "Bestellungen des Kunden abrufen und anzeigen",
    "instructions": [
      "Verwenden Sie das 'getCustomerOrders' Tool mit der authentifizierten Telefonnummer",
      "Präsentieren Sie die gefundenen Bestellungen übersichtlich",
      "Wenn mehrere Bestellungen vorhanden sind: fragen Sie, welche interessiert"
    ],
    "examples": [
      "Einen Moment bitte, ich rufe Ihre aktuellen Bestellungen ab...",
      "Ich habe [Anzahl] Bestellung(en) für Sie gefunden. Welche Bestellung interessiert Sie?",
      "Hier sind Ihre letzten Bestellungen: [Liste mit Bestellnummern und Status]"
    ],
    "transitions": [{
      "next_step": "3_provide_detailed_status",
      "condition": "Wenn eine spezifische Bestellung ausgewählt wurde"
    }, {
      "next_step": "4_explain_general_status", 
      "condition": "Wenn allgemeine Informationen zu allen Bestellungen gewünscht sind"
    }]
  },
  {
    "id": "3_provide_detailed_status",
    "description": "Detaillierte Informationen zu einer spezifischen Bestellung",
    "instructions": [
      "Verwenden Sie 'getOrderDetails' und 'getOrderStatusHistory' für die spezifische Bestellung",
      "Erklären Sie den aktuellen Status verständlich",
      "Geben Sie Tracking-Informationen und geschätzte Lieferzeiten bekannt",
      "Erläutern Sie die nächsten Schritte im Versandprozess"
    ],
    "examples": [
      "Ihre Bestellung [Nummer] ist aktuell [Status]. Das bedeutet: [Erklärung]",
      "Die voraussichtliche Lieferzeit ist [Datum]. Hier ist der detaillierte Verlauf...",
      "Ihr Tracking-Code lautet [Code]. Sie können die Sendung unter [Link/Info] verfolgen."
    ],
    "transitions": [{
      "next_step": "5_additional_help",
      "condition": "Nach der Bereitstellung der Informationen"
    }]
  },
  {
    "id": "4_explain_general_status",
    "description": "Übersicht über alle Bestellungen geben",
    "instructions": [
      "Fassen Sie alle Bestellungen mit ihrem jeweiligen Status zusammen",
      "Heben Sie wichtige oder problematische Bestellungen hervor",
      "Fragen Sie, ob Details zu einer bestimmten Bestellung gewünscht sind"
    ],
    "examples": [
      "Hier ist eine Übersicht Ihrer aktuellen Bestellungen: [Zusammenfassung]",
      "Möchten Sie zu einer dieser Bestellungen mehr Details erfahren?"
    ],
    "transitions": [{
      "next_step": "3_provide_detailed_status",
      "condition": "Wenn Details zu einer Bestellung gewünscht sind"
    }, {
      "next_step": "5_additional_help",
      "condition": "Wenn keine weiteren Details benötigt werden"
    }]
  },
  {
    "id": "5_additional_help",
    "description": "Weitere Unterstützung anbieten",
    "instructions": [
      "Fragen Sie, ob weitere Hilfe benötigt wird",
      "Bieten Sie Weiterleitung zu anderen Spezialisten an (z.B. FAQ für Rückgaben)",
      "Geben Sie hilfreiche Tipps für das Tracking oder den Empfang"
    ],
    "examples": [
      "Gibt es noch etwas anderes, womit ich Ihnen bei Ihren Bestellungen helfen kann?",
      "Falls Sie Fragen zu Rückgaben haben, kann ich Sie gerne an unseren FAQ-Spezialisten weiterleiten.",
      "Für das Tracking empfehle ich Ihnen, die Website des Versanddienstleisters zu nutzen."
    ],
    "transitions": [{
      "next_step": "transferAgents",
      "condition": "Wenn Weiterleitung zu anderen Agenten gewünscht ist"
    }]
  }
]
`,
  tools: [
    {
      type: "function",
      name: "getCustomerOrders",
      description: "Ruft alle Bestellungen eines Kunden basierend auf der authentifizierten Telefonnummer ab",
      parameters: {
        type: "object",
        properties: {
          phoneNumber: {
            type: "string",
            description: "Die authentifizierte Telefonnummer des Kunden"
          }
        },
        required: ["phoneNumber"],
        additionalProperties: false
      }
    },
    {
      type: "function",
      name: "getOrderDetails",
      description: "Ruft detaillierte Informationen zu einer spezifischen Bestellung ab",
      parameters: {
        type: "object",
        properties: {
          orderNumber: {
            type: "string",
            description: "Die Bestellnummer der abzufragenden Bestellung"
          }
        },
        required: ["orderNumber"],
        additionalProperties: false
      }
    },
    {
      type: "function",
      name: "getOrderStatusHistory",
      description: "Ruft den vollständigen Statusverlauf einer Bestellung ab",
      parameters: {
        type: "object",
        properties: {
          orderNumber: {
            type: "string", 
            description: "Die Bestellnummer für die der Statusverlauf abgerufen werden soll"
          }
        },
        required: ["orderNumber"],
        additionalProperties: false
      }
    },
    {
      type: "function",
      name: "updateOrderStatus",
      description: "Aktualisiert den Status einer Bestellung (nur in speziellen Fällen verwendbar)",
      parameters: {
        type: "object",
        properties: {
          orderNumber: {
            type: "string",
            description: "Die Bestellnummer der zu aktualisierenden Bestellung"
          },
          newStatus: {
            type: "string",
            description: "Der neue Status der Bestellung",
            enum: ["processing", "packed", "shipped", "delivered", "cancelled", "returned"]
          },
          statusDescription: {
            type: "string",
            description: "Beschreibung der Statusänderung"
          },
          location: {
            type: "string",
            description: "Aktueller Standort der Bestellung"
          }
        },
        required: ["orderNumber", "newStatus", "statusDescription"],
        additionalProperties: false
      }
    }
  ],
  toolLogic: {
    getCustomerOrders: async ({ phoneNumber }) => {
      console.log(`[toolLogic] Getting orders for phone number: ${phoneNumber}`);
      
      try {
        // Supabase-Abfrage für Kundenbestellungen
        const { supabase } = await import('@/app/lib/supabase');
        
        // Direkte Tabellen-Abfrage anstatt RPC
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            customers!inner(
              phone_number,
              first_name,
              last_name,
              email
            )
          `)
          .eq('customers.phone_number', phoneNumber)
          .order('order_date', { ascending: false });
        
        if (error) {
          console.error('Supabase error:', error);
          return {
            success: false,
            message: "Fehler beim Abrufen der Bestellungen",
            error: error.message
          };
        }
        
        if (!data || data.length === 0) {
          return {
            success: true,
            message: "Keine Bestellungen für diese Telefonnummer gefunden",
            orders: []
          };
        }
        
        // Formatiere die Bestellungen für bessere Anzeige
        const formattedOrders = data.map((order: any) => ({
          orderNumber: order.order_number,
          status: order.status,
          statusDisplay: getStatusDisplayText(order.status),
          totalAmount: order.total_amount,
          currency: order.currency || 'EUR',
          orderDate: new Date(order.order_date).toLocaleDateString('de-DE'),
          estimatedDelivery: order.estimated_delivery ? 
            new Date(order.estimated_delivery).toLocaleDateString('de-DE') : null,
          trackingNumber: order.tracking_number,
          itemCount: order.items ? order.items.length : 0,
          items: order.items || [],
          shippingAddress: order.shipping_address || 'Nicht verfügbar'
        }));
        
        return {
          success: true,
          message: `${formattedOrders.length} Bestellung(en) gefunden`,
          orders: formattedOrders,
          customerPhone: phoneNumber
        };
        
      } catch (error) {
        console.error('Error getting customer orders:', error);
        return {
          success: false,
          message: "Technischer Fehler beim Abrufen der Bestellungen",
          error: error instanceof Error ? error.message : String(error)
        };
      }
    },
    
    getOrderDetails: async ({ orderNumber }) => {
      console.log(`[toolLogic] Getting details for order: ${orderNumber}`);
      
      try {
        const { supabase } = await import('@/app/lib/supabase');
        
        // Direkte Tabellen-Abfrage mit JOIN
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            customers(
              first_name,
              last_name,
              email,
              phone_number
            )
          `)
          .eq('order_number', orderNumber)
          .single();
        
        if (error) {
          console.error('Supabase error:', error);
          return {
            success: false,
            message: "Fehler beim Abrufen der Bestelldetails"
          };
        }
        
        if (!data) {
          return {
            success: false,
            message: "Bestellung nicht gefunden"
          };
        }
        
        return {
          success: true,
          orderDetails: {
            orderNumber: data.order_number,
            status: data.status,
            statusDisplay: getStatusDisplayText(data.status),
            orderDate: new Date(data.order_date).toLocaleDateString('de-DE'),
            totalAmount: data.total_amount,
            currency: data.currency || 'EUR',
            estimatedDelivery: data.estimated_delivery ? 
              new Date(data.estimated_delivery).toLocaleDateString('de-DE') : null,
            actualDelivery: data.actual_delivery ? 
              new Date(data.actual_delivery).toLocaleDateString('de-DE') : null,
            trackingNumber: data.tracking_number,
            carrier: data.carrier,
            shippingMethod: data.shipping_method,
            items: data.items || [],
            shippingAddress: {
              street: data.shipping_street,
              city: data.shipping_city,
              postalCode: data.shipping_postal_code,
              country: data.shipping_country
            },
            customer: {
              firstName: data.customers?.first_name || 'Unbekannt',
              lastName: data.customers?.last_name || 'Unbekannt',
              email: data.customers?.email || 'Nicht verfügbar'
            }
          }
        };
        
      } catch (error) {
        console.error('Error getting order details:', error);
        return {
          success: false,
          message: "Technischer Fehler beim Abrufen der Bestelldetails"
        };
      }
    },
    
    getOrderStatusHistory: async ({ orderNumber }) => {
      console.log(`[toolLogic] Getting status history for order: ${orderNumber}`);
      
      try {
        const { supabase } = await import('@/app/lib/supabase');
        
        // Erst die Order-ID finden
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('id')
          .eq('order_number', orderNumber)
          .single();
        
        if (orderError || !orderData) {
          return {
            success: false,
            message: "Bestellung nicht gefunden"
          };
        }
        
        // Dann den Statusverlauf abrufen
        const { data, error } = await supabase
          .from('order_status_history')
          .select('*')
          .eq('order_id', orderData.id)
          .order('timestamp', { ascending: false });
        
        if (error) {
          console.error('Supabase error:', error);
          return {
            success: false,
            message: "Fehler beim Abrufen des Statusverlaufs"
          };
        }
        
        if (!data || data.length === 0) {
          return {
            success: false,
            message: "Kein Statusverlauf für diese Bestellung gefunden"
          };
        }
        
        const formattedHistory = data.map((entry: any) => ({
          status: entry.status,
          statusDisplay: getStatusDisplayText(entry.status),
          description: entry.status_description || 'Keine Beschreibung',
          location: entry.location || 'System',
          timestamp: new Date(entry.timestamp).toLocaleString('de-DE')
        }));
        
        return {
          success: true,
          orderNumber: orderNumber,
          statusHistory: formattedHistory
        };
        
      } catch (error) {
        console.error('Error getting order status history:', error);
        return {
          success: false,
          message: "Technischer Fehler beim Abrufen des Statusverlaufs"
        };
      }
    },
    
    updateOrderStatus: async ({ orderNumber, newStatus, statusDescription, location = "System" }) => {
      console.log(`[toolLogic] Updating order ${orderNumber} to status: ${newStatus}`);
      
      try {
        const { supabase } = await import('@/app/lib/supabase');
        
        // Update order status using table operations
        const { error: updateError } = await supabase
          .from('orders')
          .update({ 
            status: newStatus, 
            updated_at: new Date().toISOString() 
          })
          .eq('order_number', orderNumber);
        
        if (updateError) {
          console.error('Error updating order:', updateError);
          return {
            success: false,
            message: "Fehler beim Aktualisieren des Bestellstatus"
          };
        }
        
        // Get order ID for status history
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('id')
          .eq('order_number', orderNumber)
          .single();
        
        if (!orderError && orderData) {
          // Add status history entry
          const { error: historyError } = await supabase
            .from('order_status_history')
            .insert({
              order_id: orderData.id,
              status: newStatus,
              status_description: statusDescription,
              location: location,
              timestamp: new Date().toISOString()
            });
          
          if (historyError) {
            console.error('Error adding status history:', historyError);
            // Non-critical error, continue
          }
        }
        
        return {
          success: true,
          message: `Bestellstatus erfolgreich auf "${getStatusDisplayText(newStatus)}" aktualisiert`,
          orderNumber: orderNumber,
          newStatus: newStatus,
          statusDisplay: getStatusDisplayText(newStatus)
        };
        
      } catch (error) {
        console.error('Error updating order status:', error);
        return {
          success: false,
          message: "Technischer Fehler beim Aktualisieren des Status"
        };
      }
    }
  }
};

// Hilfsfunktion für deutsche Statusanzeige
function getStatusDisplayText(status: string): string {
  const statusMap: { [key: string]: string } = {
    'processing': 'In Bearbeitung',
    'packed': 'Verpackt',
    'shipped': 'Versandt',
    'delivered': 'Zugestellt',
    'cancelled': 'Storniert',
    'returned': 'Zurückgeschickt'
  };
  
  return statusMap[status] || status;
}

export default orderStatusAgent;