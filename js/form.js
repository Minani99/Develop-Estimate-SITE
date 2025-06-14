console.log("Form page loaded");

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const site = params.get("site") || "Not specified";
  const pages = params.get("pages") || "Not specified";
  const features = params.get("features") || "None";
  const design = params.get("design") || "None";
  const hosting = params.get("hosting") || "None";
  const total = params.get("total") || "$0";

  // 1. 요약 박스 생성
  const summaryBox = document.createElement("div");
  summaryBox.innerHTML = `
    <h3 style="margin-top: 30px;">Your Estimate Summary</h3>
    <ul style="line-height: 1.8;">
      <li><strong>Website Type:</strong> ${site}</li>
      <li><strong>Number of Pages:</strong> ${pages}</li>
      <li><strong>Features:</strong> ${features}</li>
      <li><strong>Design:</strong> ${design}</li>
      <li><strong>Hosting & Maintenance:</strong> ${hosting}</li>
      <li><strong>Total Estimate:</strong> <span style="color:green; font-weight:bold;">${total}</span></li>
    </ul>
    <hr style="margin: 20px 0;">
  `;

  const formCard = document.querySelector(".form-card");
  if (formCard) {
    formCard.insertBefore(summaryBox, formCard.firstChild);
  }

  // 2. 구글폼 자동 입력용 URL 구성
  const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLScZxyJPNstQXHSxVKucyf2y2j1DRXEFhB96__vRidIzW9hHdw/viewform";

  const fullUrl = `${formBaseUrl}?entry.766746574=${encodeURIComponent(total)}
&entry.1944631379=${encodeURIComponent(`${site}, ${pages} pages, ${features}, ${design}, ${hosting}`)}`.replace(/\s+/g, '+');

  // 3. iframe에 src 주입
  const iframe = document.getElementById("google-form-frame");
  if (iframe) {
    iframe.src = fullUrl;
  }
});
