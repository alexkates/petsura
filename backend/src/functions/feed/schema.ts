export default {
  type: "object",
  properties: {
    offset: { type: "number" },
    limit: { type: "number" },
  },
  required: ["offset", "limit"],
} as const;
