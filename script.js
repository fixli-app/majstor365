"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", window.majstorI18n.getText("aria.openMenu"));
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", window.majstorI18n.getText(isExpanded ? "aria.openMenu" : "aria.closeMenu"));
  navigation.classList.toggle("is-open", !isExpanded);
  document.body.classList.toggle("menu-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) closeMenu();
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

const inquiryForm = document.querySelector("#inquiry-form");
const formStatus = document.querySelector("#form-status");
const contactEmail = "info.majstor365@gmail.com";

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.classList.remove("is-error");
  formStatus.textContent = "";

  if (!inquiryForm.reportValidity()) return;

  const data = new FormData(inquiryForm);
  const translate = window.majstorI18n.getText;
  const lines = [
  translate("email.greeting"),
  "",
  translate("email.request"),
  String(data.get("project")),
  "",
  `${translate("email.name")}: ${data.get("name")}`,
  `${translate("email.contact")}: ${data.get("contact")}`,
  `${translate("email.location")}: ${data.get("location") || translate("email.locationFallback")}`,
  ];
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(translate("email.subject"))}&body=${encodeURIComponent(lines.join("\n"))}`;
  const emailLink = document.createElement("a");
  emailLink.href = mailto;
  emailLink.hidden = true;
  document.body.append(emailLink);
  emailLink.click();
  emailLink.remove();
  formStatus.textContent = translate("form.status");
});
