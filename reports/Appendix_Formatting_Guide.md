# Appendix & Formatting Guide

This guide covers the placement of the Appendix, References, and Project Screenshots for your final academic or enterprise report.

---

## 1. Where do References & Bibliography Go?
In a standard report, **References & Bibliography** always goes **immediately after your final chapter** and **before the Appendix**.

Here is the exact layout of the back-end of your document:
```markdown
**CHAPTER 8: FUTURE SCOPE OF THE PROJECT** ........................ 69  
8.2 Final Remarks .......................................................................................... 71

**REFERENCES** ........................................................................................ 72

**APPENDIX A: Core System Source Code** ...................................... 73
```
*Note: Your references should include citations for Google Generative AI Docs, React.js, Next.js, Node.js, MongoDB, and any heavily used npm packages (`bcryptjs` or `multer`).*

---

## 2. How to Format the Appendix
An Appendix goes at the **very end** of your report. It is used to present massive walls of text or data that would look messy or overwhelming if placed inside the main reading chapters. 

**What belongs in the Appendix?**
For QuillStack AI, you should include raw structural data:
*   **Appendix A: Core Source Code** (Don't paste the whole project, just the main `docRouter.js` integration and the main React `Editor.jsx` component).
*   **Appendix B: API Payload Examples** (The JSON payload sent to Gemini).
*   **Appendix C: Extensive Test Logs** (Only if you have massive raw outputs of unit tests that don't fit in Chapter 5).

**How to format the actual Appendix Pages:**
1. Start a brand new page at the very end of your Word/PDF document. 
2. Bold the title at the top (e.g., **APPENDIX A: Core System Source Code**).
3. Paste the code or data below it. 
4. If pasting code, use a smaller, monospace font (like Consolas or Courier New at size 9 or 10) so it visually distinguishes itself.

---

## 3. Where to Put Project Screenshots

Screenshots prove your code compiled into a visually stunning, working application. Their placement depends on what the screenshot is showing:

**Primary Location: Chapter 6 (Results Analysis and Discussion)**
The vast majority of your project screenshots belong here to prove the system works.
*   **Section 6.3 (Results Obtained):** Place screenshots of the completely Interactive Side-by-Side Generation Workspace here.
*   **Section 6.5 (Accuracy and Quality of Output):** Place screenshots of the actual generated Markdown documentation or downloaded PDFs here.

**Secondary Location: Chapter 4 (System Design)**
*   **Section 4.7 (User Interface Design):** Place your cosmetic UI screenshots here, such as the Login/Registration Forms, User Dashboard, Interactive Product Tour, or Admin UI.

**Alternative Option: Dedicated Sub-section**
If you have a lot of screenshots (6+ images), you can create a brand new sub-heading inside Chapter 6. For example, add **`6.3 System Interface and Output Modules`** right after `6.2 System Implementation Overview`, and stack your screenshots there. 

*Important Note: If you add screenshots to your chapters, remember to update the **List of Figures** (page `ix`) to index them correctly!*
