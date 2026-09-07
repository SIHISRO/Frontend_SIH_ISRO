import { validateImageFile } from "../imageUtils";

describe("imageUtils", () => {
  describe("validateImageFile", () => {
    it("accepts valid image/jpeg", () => {
      const file = new File(["test-content"], "moon.jpg", { type: "image/jpeg" });
      const res = validateImageFile(file);
      expect(res.valid).toBe(true);
    });

    it("accepts valid image/png", () => {
      const file = new File(["test-content"], "crater.png", { type: "image/png" });
      const res = validateImageFile(file);
      expect(res.valid).toBe(true);
    });

    it("rejects unsupported MIME types like PDF", () => {
      const file = new File(["test-content"], "document.pdf", { type: "application/pdf" });
      const res = validateImageFile(file);
      expect(res.valid).toBe(false);
      expect(res.error).toContain("Unsupported format");
    });
  });
});
