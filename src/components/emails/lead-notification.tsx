import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components";
import type { LeadNotificationPayload } from "@/types/form";

export function LeadNotification({
  name,
  phone,
  serviceType,
  email,
  address,
  message,
  sourceUrl,
  pageTitle,
  timestamp,
  formVariant,
}: LeadNotificationPayload) {
  return (
    <Html lang="en">
      <Head />
      <Tailwind>
        <Body
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            backgroundColor: "#f5f5f5",
            margin: 0,
            padding: "32px 0",
          }}
        >
          <Container
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "32px",
            }}
          >
            {/* Header */}
            <Heading
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#1a1a1a",
                margin: "0 0 8px",
              }}
            >
              New Lead: {serviceType}
            </Heading>
            <Text
              style={{
                fontSize: "14px",
                color: "#999999",
                margin: "0 0 24px",
              }}
            >
              {formVariant === "compact" ? "Compact form" : "Full form"}{" "}
              submission
            </Text>

            <Hr style={{ borderColor: "#e5e5e5", margin: "0 0 24px" }} />

            {/* Required Fields */}
            <Section style={{ marginBottom: "24px" }}>
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#666666",
                  margin: "0 0 4px",
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  color: "#333333",
                  margin: "0 0 16px",
                }}
              >
                {name}
              </Text>

              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#666666",
                  margin: "0 0 4px",
                }}
              >
                Phone
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  color: "#333333",
                  margin: "0 0 16px",
                }}
              >
                {phone}
              </Text>

              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#666666",
                  margin: "0 0 4px",
                }}
              >
                Service Type
              </Text>
              <Text
                style={{
                  fontSize: "16px",
                  color: "#333333",
                  margin: "0 0 0",
                }}
              >
                {serviceType}
              </Text>
            </Section>

            {/* Optional Fields (only if provided) */}
            {(email || address || message) && (
              <>
                <Hr
                  style={{ borderColor: "#e5e5e5", margin: "0 0 24px" }}
                />
                <Section style={{ marginBottom: "24px" }}>
                  {email && (
                    <>
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#666666",
                          margin: "0 0 4px",
                        }}
                      >
                        Email
                      </Text>
                      <Text
                        style={{
                          fontSize: "16px",
                          color: "#333333",
                          margin: "0 0 16px",
                        }}
                      >
                        {email}
                      </Text>
                    </>
                  )}

                  {address && (
                    <>
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#666666",
                          margin: "0 0 4px",
                        }}
                      >
                        Property Address
                      </Text>
                      <Text
                        style={{
                          fontSize: "16px",
                          color: "#333333",
                          margin: "0 0 16px",
                        }}
                      >
                        {address}
                      </Text>
                    </>
                  )}

                  {message && (
                    <>
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#666666",
                          margin: "0 0 4px",
                        }}
                      >
                        Message
                      </Text>
                      <Text
                        style={{
                          fontSize: "16px",
                          color: "#333333",
                          margin: "0 0 0",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {message}
                      </Text>
                    </>
                  )}
                </Section>
              </>
            )}

            {/* Footer Metadata */}
            <Hr style={{ borderColor: "#e5e5e5", margin: "0 0 24px" }} />
            <Section>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#999999",
                  margin: "0 0 4px",
                }}
              >
                Source: {sourceUrl}
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#999999",
                  margin: "0 0 4px",
                }}
              >
                Page: {pageTitle}
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#999999",
                  margin: "0 0 0",
                }}
              >
                Submitted: {timestamp}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
