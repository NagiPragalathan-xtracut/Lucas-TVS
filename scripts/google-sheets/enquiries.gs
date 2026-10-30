/**
 * Lucas TVS website — enquiry forms → Google Sheet.
 *
 * Both enquiry forms on the site (the Contact page and the homepage
 * "Let's Get Started" popup) POST here; each submission becomes one row
 * in the enquiries sheet, and an email to NOTIFY_TO. The site side is
 * src/lib/useEnquiry.ts.
 *
 * The email goes out through Google's MailApp as the account that
 * deployed this script: no mail password or third-party service. Free
 * Gmail accounts can send to 100 recipients a day (Workspace: 1,500).
 *
 * This file is not built or deployed with the site. It lives in the sheet:
 *
 *   1. Open the sheet → Extensions → Apps Script.
 *   2. Replace the editor's contents with this file and save.
 *   3. Deploy → New deployment → type "Web app".
 *        Execute as:     Me
 *        Who has access: Anyone
 *   4. Authorise when asked, then copy the Web app URL (ends in /exec)
 *      into ENQUIRY_ENDPOINT in src/lib/useEnquiry.ts.
 *
 * After editing this script later, use Deploy → Manage deployments → edit
 * → Version: New version, so the /exec URL stays the same. If the edit
 * needs a new permission (sending email did), run sendTestEmail once from
 * the editor first so Google asks for it.
 */

const SHEET_ID = '13eL9yGKPZcvFsfJ_l4jzrYp03V_id39XhIie6KcjZNM'

// Who is told about each enquiry. Several addresses: separate with commas.
// First is the site's published enquiry contact (COMPANY.email in
// src/lib/routes.ts); second is the Xtracut team.
const NOTIFY_TO = 'shrihari.km@lucastvs.co.in, raghul@xtracut.com'
const SENDER_NAME = 'Lucas TVS Website'

// Bump with every change: doGet reports it, so whether the latest copy is
// the one deployed can be checked from outside the editor.
const SCRIPT_VERSION = 4

// Column order in the sheet. `key` is the form field name the site sends.
const COLUMNS = [
  { header: 'Submitted at', key: null },
  { header: 'Form', key: 'source' },
  { header: 'Name', key: 'name' },
  { header: 'Email', key: 'email' },
  { header: 'Phone', key: 'phone' },
  { header: 'Company', key: 'company' },
  { header: 'Industry', key: 'industry' },
  { header: 'Solution', key: 'solution' },
  { header: 'Requirement', key: 'requirement' },
  { header: 'Message', key: 'message' },
  { header: 'Page', key: 'page' },
]

function doPost(e) {
  const p = (e && e.parameter) || {}

  // Honeypot: a field hidden from people. Only bots fill it, so their
  // submissions are dropped while still looking accepted.
  if (p.website) return json({ ok: true })
  if (!p.name || !p.email) return json({ ok: false, error: 'Name and email are required.' })

  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const sheet = enquirySheet()
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS.map((c) => c.header))
      sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold')
      sheet.setFrozenRows(1)
    }
    sheet.appendRow(COLUMNS.map((c) => (c.key ? clean(p[c.key]) : new Date())))
  } finally {
    lock.releaseLock()
  }

  // The row is the record. If the email fails (no permission yet, quota, a
  // bad address), the enquiry is still saved and the visitor still gets
  // their thank-you. `emailed` / `emailError` let a test submission see
  // whether the email went out without opening the Executions log.
  let emailed = false
  let emailError
  try {
    notify(p, NOTIFY_TO)
    emailed = true
  } catch (err) {
    emailError = String(err)
    console.error('Enquiry email not sent: ' + emailError)
  }
  return json({ ok: true, emailed: emailed, emailError: emailError })
}

/**
 * Run this once from the Apps Script editor (select it, then Run). It makes
 * Google ask for the "send email" permission, then sends a sample enquiry
 * to your own address, so nothing reaches NOTIFY_TO while you test.
 */
function sendTestEmail() {
  notify(
    {
      source: 'Test from the Apps Script editor',
      name: 'Test Person',
      email: Session.getEffectiveUser().getEmail(),
      phone: '+91 00000 00000',
      company: 'Test Company',
      industry: 'Automotive',
      message: 'This is a test of the enquiry email.\nIt has two lines.',
      page: 'https://example.com/contact',
    },
    Session.getEffectiveUser().getEmail(),
  )
}

// One email per enquiry: every filled-in field, "Reply" goes to the
// visitor, and a link to the sheet.
function notify(p, to) {
  const fields = COLUMNS.filter((c) => c.key && text(p[c.key]))
  const when = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'd MMM yyyy, h:mm a') + ' IST'
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit'
  const visitor = text(p.email)
  const subject =
    'New website enquiry: ' + text(p.name) + (text(p.company) ? ' (' + text(p.company) + ')' : '')

  const body =
    'New enquiry from the Lucas TVS website, ' + when + '\n\n' +
    fields.map((c) => c.header + ': ' + text(p[c.key])).join('\n') +
    '\n\nAll enquiries: ' + sheetUrl

  const rows = fields
    .map(
      (c) =>
        '<tr><td style="padding:6px 16px 6px 0;color:#555;vertical-align:top;white-space:nowrap">' +
        c.header +
        '</td><td style="padding:6px 0;color:#111">' +
        html(text(p[c.key])).replace(/\n/g, '<br>') +
        '</td></tr>',
    )
    .join('')
  const htmlBody =
    '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5">' +
    '<p style="margin:0 0 12px">New enquiry from the Lucas TVS website, ' + when + '</p>' +
    '<table style="border-collapse:collapse">' + rows + '</table>' +
    '<p style="margin:16px 0 0">Reply to this email to answer ' + html(text(p.name)) + ' directly. ' +
    '<a href="' + sheetUrl + '">All enquiries</a></p></div>'

  const message = { to: to, subject: subject, body: body, htmlBody: htmlBody, name: SENDER_NAME }
  // Only a plausible address becomes Reply-To; a malformed one would make
  // MailApp reject the whole email.
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitor)) message.replyTo = visitor
  MailApp.sendEmail(message)
}

// Form text for the email (unlike clean(), no formula guard: it isn't a cell).
function text(value) {
  return String(value == null ? '' : value).trim().slice(0, 5000)
}

function html(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Opening the /exec URL in a browser shows this — a quick deployment check.
function doGet() {
  return json({ ok: true, service: 'Lucas TVS enquiries', version: SCRIPT_VERSION })
}

// The tab the client linked (gid=0), falling back to the first tab.
function enquirySheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID)
  return ss.getSheets().find((s) => s.getSheetId() === 0) || ss.getSheets()[0]
}

// Text from the public internet: cap its length, and stop anything that
// starts like a formula (= + - @) from being run as one by Sheets.
function clean(value) {
  const s = String(value == null ? '' : value).trim().slice(0, 5000)
  return /^[=+\-@]/.test(s) ? "'" + s : s
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON)
}
