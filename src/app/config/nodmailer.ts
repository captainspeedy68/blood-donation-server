import express, { Request, Response } from "express";
import nodemailer from "nodemailer";

const router = express.Router(); // Configure Nodemailer with SMTP (e.g., Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // Use environment variables for sensitive information
    pass: process.env.EMAIL_PASS,
  },
});

// API to send email
router.post("/send", async (req: Request, res: Response) => {
    try {
      const { recipients } = req.body;
      if (!recipients || !Array.isArray(recipients)) {
        return res.status(400).json({ success: false, error: "Invalid recipients" });
      }
  
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipients.join(", "),
        subject: "You have a job",
        text: "From BloodLine. Hello Donor! Can you help?",
      });
  
      res.status(200).json({ success: true, info });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  

export const MailRouter = router;