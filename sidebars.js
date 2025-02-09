/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  docs: [
    {
      type: "category",
      label: "Introduction",
      link: {
        type: "doc",
        id: "index",
      },
      items: [
        "articles/what-is-zuplo",
        "articles/who-uses-and-why",
        "articles/zuplo-in-your-stack",
      ],
    },
    {
      type: "category",
      label: "Getting Started",
      items: [
        "articles/step-1-setup-basic-gateway",
        "articles/step-2-add-api-key-auth",
        "articles/step-3-add-rate-limiting",
        "articles/step-4-deploying-to-the-edge",
        // TODO - coming after Open API
        // "articles/step-5-customizing-documentation",
      ],
    },
    // TODO - coming soon
    // {
    //   type: "category",
    //   label: "Popular Use Cases",
    //   items: [
    //     "articles/startup-launching-a-new-api",
    //     "articles/protecting-an-existing-api,
    //     "articles/enterprise-managing-many-apis",
    //     "articles/api-first-with-supabase",
    //     "articles/microservice-gateway",
    //   ],
    // },
    {
      type: "category",
      label: "Getting to Production",
      items: [
        "articles/environments",
        "articles/securing-your-backend",
        "articles/custom-domains",
        "articles/testing",
        // TODO - coming soon
        //"articles/monitoring",
        "articles/zuplo-in-your-stack",
      ],
    },
    {
      type: "category",
      label: "OpenAPI",
      link: {
        type: "doc",
        id: "articles/open-api",
      },
      items: [],
    },
    {
      type: "category",
      label: "How to Guides",
      items: [
        "articles/custom-ci-cd",
        "articles/rename-or-move-project",
        "articles/multiple-auth-policies",
        "articles/archiving-requests-to-storage",
        "articles/per-user-rate-limits-using-db",
        "articles/rick-and-morty-api-developer-portal-example",
        "articles/check-ip-address",
        "articles/custom-logging-example",
        "articles/custom-log-level",
        "articles/advanced-path-matching",
        "articles/lazy-load-configuration-into-cache",
        "articles/handling-form-data",
        "articles/local-development",
      ],
    },
    {
      type: "category",
      label: "Reference",
      items: [
        {
          type: "category",
          label: "Policies",
          link: {
            type: "doc",
            id: "policies/index",
          },
          items: [
            {
              type: "category",
              label: "Authentication",
              items: [
                "policies/api-key-auth-inbound",
                "policies/auth0-jwt-auth-inbound",
                "policies/okta-jwt-auth-inbound",
                "policies/cognito-jwt-auth-inbound",
                "policies/open-id-jwt-auth-inbound",
                "policies/firebase-jwt-inbound",
                "policies/supabase-jwt-auth-inbound",
                "policies/basic-auth-inbound",
                "policies/mtls-auth-inbound",
                "policies/ldap-auth-inbound",
                "policies/hmac-auth-inbound",
              ],
            },
            {
              type: "category",
              label: "Security & Validation",
              items: [
                "policies/rate-limit-inbound",
                "policies/audit-log-inbound",
                "policies/validate-json-schema-inbound",
                "policies/bot-detection-inbound",
                "policies/require-origin-inbound",
              ],
            },
            {
              type: "category",
              label: "Metrics, Billing & Quotas",
              items: [
                "policies/quota-inbound",
                "policies/amberflo-metering-inbound",
                "policies/readme-metrics-inbound",
              ],
            },
            {
              type: "category",
              label: "Testing",
              items: [
                "policies/ab-test-inbound",
                "policies/mock-api-inbound",
                "policies/sleep-inbound",
              ],
            },
            {
              type: "category",
              label: "Request Filtering",
              items: [
                "policies/acl-policy-inbound",
                "policies/geo-location-inbound",
                "policies/ip-restriction-inbound",
                "policies/request-size-limit-inbound",
              ],
            },
            {
              type: "category",
              label: "Request Modification",
              items: [
                "policies/transform-body-inbound",
                "policies/remove-headers-inbound",
                "policies/clear-headers-inbound",
                "policies/change-method-inbound",
                "policies/formdata-to-json-inbound",
                "policies/remove-query-params-inbound",
                "policies/set-headers-inbound",
                "policies/set-body-inbound",
                "policies/set-query-params-inbound",
              ],
            },
            {
              type: "category",
              label: "Response Modification",
              items: [
                "policies/transform-body-outbound",
                "policies/remove-headers-outbound",
                "policies/clear-headers-outbound",
                "policies/set-headers-outbound",
                "policies/set-status-outbound",
              ],
            },
            {
              type: "category",
              label: "Other",
              items: [
                "policies/composite-inbound",
                "policies/caching-inbound",
                "policies/archive-request-inbound",
                "policies/archive-response-outbound",
                "policies/custom-code-inbound",
                "policies/custom-code-outbound",
                "policies/upstream-azure-ad-service-auth-inbound-policy",
                "policies/upstream-gcp-jwt-inbound",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Handlers",
          link: {
            type: "doc",
            id: "handlers/index",
          },
          items: [
            "handlers/url-forward",
            "handlers/url-rewrite",
            "handlers/custom-handler",
            "handlers/redirect",
          ],
        },
        {
          type: "category",
          label: "Developer Portal",
          items: [
            "articles/developer-portal",
            "articles/dev-portal-setup",
            "articles/dev-portal-configuration",
            "articles/dev-portal-auth",
            "articles/dev-portal-theme",
            "articles/dev-portal-adding-pages",
            "articles/dev-portal-configuring-sidebar",
            "articles/dev-portal-json",
          ],
        },
        {
          type: "category",
          label: "Programming API",
          items: [
            "articles/zuplo-request",
            "articles/zuplo-context",
            "articles/web-standard-apis",
            "articles/node-modules",
            "articles/reusing-code",
            "articles/zone-cache",
            "articles/safely-clone-a-request-or-response",
            // Usage discouraged
            // "articles/key-value-store",
            "articles/runtime-behaviors",
            "articles/zp-body-removed",
          ],
        },
      ],
    },
    {
      type: "html",
      value: "<hr />", // The HTML to be rendered
      defaultStyle: false, // Use the default menu item styling
    },
    {
      type: "doc",
      id: "articles/support",
    },
    {
      type: "doc",
      id: "articles/security",
    },
    {
      type: "doc",
      id: "articles/pricing",
    },
  ],
};

module.exports = sidebars;
