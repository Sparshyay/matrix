import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company,
      selectedServices = [],
      engagementModel = "Full-Cycle Product Build",
      timeline = "1 - 2 Months",
      projectScope,
      ticketId = `FS-${Math.floor(100000 + Math.random() * 900000)}`,
    } = body;

    if (!name || !email || !projectScope) {
      return NextResponse.json(
        { success: false, error: "Name, email, and project brief are required." },
        { status: 400 }
      );
    }

    const servicesText =
      Array.isArray(selectedServices) && selectedServices.length > 0
        ? selectedServices.join(", ")
        : "Standard Inquiries";

    const targetEmail = "fullspheregroup@gmail.com";
    const subject = `[Full Sphere Inquiry ${ticketId}] from ${name} (${company || "Individual"})`;

    const plainTextContent = `
=========================================
FULL SPHERE GROUP — NEW INQUIRY TRANSMISSION
=========================================
Dispatch Reference : ${ticketId}
Client Name        : ${name}
Client Email       : ${email}
Company / Org      : ${company || "N/A"}
Selected Services  : ${servicesText}
Engagement Model   : ${engagementModel}
Timeline           : ${timeline}
Timestamp          : ${new Date().toISOString()}

-----------------------------------------
PROJECT SCOPE / SPECIFICATIONS:
-----------------------------------------
${projectScope}

=========================================
Delivered directly to: ${targetEmail}
=========================================
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0b0b; color: #f3f1ec; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background-color: #121111; border: 1px solid #2e2b2a; border-radius: 12px; padding: 32px; font-family: monospace; }
    .header { border-bottom: 2px solid #d7193a; padding-bottom: 16px; margin-bottom: 24px; }
    .tag { display: inline-block; background: #d7193a; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; margin-bottom: 8px; }
    h1 { color: #ffffff; font-size: 22px; margin: 0; font-family: sans-serif; letter-spacing: -0.5px; }
    .field { margin-bottom: 14px; font-size: 13px; }
    .field-label { color: #9c9590; text-transform: uppercase; font-size: 11px; margin-bottom: 4px; }
    .field-value { color: #ffffff; font-weight: bold; background: #181616; padding: 8px 12px; border-radius: 6px; border: 1px solid #282424; }
    .message-box { background: #1c1a1a; border-left: 3px solid #d7193a; padding: 14px; border-radius: 4px; margin-top: 8px; color: #f3f1ec; line-height: 1.6; white-space: pre-wrap; font-size: 13px; }
    .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #282424; font-size: 11px; color: #6b6560; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="tag">NEW TRANSMISSION</span>
      <h1>FULL SPHERE — PROJECT INQUIRY</h1>
      <p style="color: #9c9590; font-size: 12px; margin: 4px 0 0 0;">REF: ${ticketId} · Sent to ${targetEmail}</p>
    </div>

    <div class="field">
      <div class="field-label">Client Name</div>
      <div class="field-value">${name}</div>
    </div>

    <div class="field">
      <div class="field-label">Client Email (Reply-To)</div>
      <div class="field-value"><a href="mailto:${email}" style="color: #d7193a; text-decoration: none;">${email}</a></div>
    </div>

    <div class="field">
      <div class="field-label">Company / URL</div>
      <div class="field-value">${company || "Not provided"}</div>
    </div>

    <div class="field">
      <div class="field-label">Selected Services</div>
      <div class="field-value">${servicesText}</div>
    </div>

    <div class="field">
      <div class="field-label">Engagement Model &amp; Timeline</div>
      <div class="field-value">${engagementModel} · ${timeline}</div>
    </div>

    <div class="field">
      <div class="field-label">Project Scope &amp; Technical Requirements</div>
      <div class="message-box">${projectScope}</div>
    </div>

    <div class="footer">
      Full Sphere Group · India &amp; Global · All Possibilities. One Sphere.<br>
      Direct Response: <a href="mailto:${email}" style="color: #d7193a;">Reply directly to ${name}</a>
    </div>
  </div>
</body>
</html>
`;

    // 1. Try sending via direct SMTP if configured in environment
    const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Full Sphere Transmissions" <${smtpUser}>`,
        to: targetEmail,
        replyTo: email,
        subject,
        text: plainTextContent,
        html: htmlContent,
      });

      return NextResponse.json({
        success: true,
        method: "smtp",
        message: `Inquiry successfully delivered directly to ${targetEmail}`,
        ticketId,
      });
    }

    // 2. Dispatch via FormSubmit directly to fullspheregroup@gmail.com
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "https://fullspheregroup.online",
        Origin: "https://fullspheregroup.online",
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: email,
        _template: "table",
        "Dispatch Reference": ticketId,
        "Client Name": name,
        "Client Email": email,
        "Company / Organization": company || "N/A",
        "Selected Capabilities": servicesText,
        "Engagement Model": engagementModel,
        "Target Timeline": timeline,
        "Project Scope": projectScope,
      }),
    });

    const formSubmitData = await formSubmitRes.json().catch(() => ({}));

    return NextResponse.json({
      success: true,
      method: "formsubmit",
      message: `Inquiry successfully forwarded to ${targetEmail}`,
      ticketId,
      detail: formSubmitData.message || null,
    });
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to transmit inquiry.",
      },
      { status: 500 }
    );
  }
}
