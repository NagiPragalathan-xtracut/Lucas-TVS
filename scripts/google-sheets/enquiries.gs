/**
 * Lucas TVS website — enquiry forms → Google Sheet.
 *
 * Both enquiry forms on the site (the Contact page and the homepage
 * "Let's Get Started" popup) POST here; each submission becomes one row
 * in the enquiries sheet. The site side is src/lib/useEnquiry.ts.
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
 * → Version: New version, so the /exec URL stays the same.
 */

const SHEET_ID = '13eL9yGKPZcvFsfJ_l4jzrYp03V_id39XhIie6KcjZNM'

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
  return json({ ok: true })
}

// Opening the /exec URL in a browser shows this — a quick deployment check.
function doGet() {
  return json({ ok: true, service: 'Lucas TVS enquiries' })
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
