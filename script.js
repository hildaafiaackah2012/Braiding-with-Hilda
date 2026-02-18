// --- Mobile nav toggle ---
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close nav when clicking a link
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "☰";
    });
  });
}

// --- Footer year ---
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Booking form -> mailto (no backend needed) ---
// IMPORTANT: change this email to Hilda's real email address
const BUSINESS_EMAIL = "braidingwithhilda@gmail.com";

function formToMailto(form, subjectPrefix) {
  const data = new FormData(form);
  const name = data.get("name") || "";
  const phone = data.get("phone") || "";
  const email = data.get("email") || "";
  const service = data.get("service") || "";
  const date = data.get("date") || "";
  const time = data.get("time") || "";
  const notes = data.get("notes") || "";

  const lines = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    `Service: ${service}`,
    date ? `Preferred Date: ${date}` : null,
    time ? `Preferred Time: ${time}` : null,
    notes ? `Notes: ${notes}` : null,
    "",
    "Sent from Braiding with Hilda website."
  ].filter(Boolean);

  const subject = `${subjectPrefix} - ${service || "Booking"} (${name})`;
  const body = lines.join("\n");

  const mailto = `mailto:${encodeURIComponent(BUSINESS_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

const quickBookingForm = document.getElementById("quickBookingForm");
if (quickBookingForm) {
  quickBookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formToMailto(quickBookingForm, "Quick Booking Request");
  });
}

const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formToMailto(bookingForm, "Booking Request");
  });
}
