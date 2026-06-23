const copyArea = document.querySelector(".content");
const sidebarLinks = document.querySelectorAll(".sidebar .nav-item");

const sections = [
  { id: "main-content", label: "TRIM no SSD" },
  { id: "ativar-timer", label: "Ativar o timer do fstrim" },
  { id: "verificar-timer", label: "Verificar se o timer está ativo" },
  { id: "forcar-manual", label: "Forçar execução manual" },
  { id: "criar-preset", label: "Criar preset personalizado" },
  { id: "checagem-final", label: "Checagem final" },
];

let activeIndex = 0;

function updateNavigation(index) {
  activeIndex = index;
  sidebarLinks.forEach((link) => link.removeAttribute("aria-current"));
  sidebarLinks[index]?.setAttribute("aria-current", "page");
}

const observer = new IntersectionObserver(
  (entries) => {
    let bestIndex = activeIndex;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const idx = sections.findIndex((s) => s.id === entry.target.id);
        if (idx !== -1) {
          bestIndex = idx;
        }
      }
    }
    if (bestIndex !== activeIndex) {
      updateNavigation(bestIndex);
    }
  },
  { threshold: 0.3 }
);

sections.forEach((s) => {
  const el = document.getElementById(s.id);
  if (el) observer.observe(el);
});

updateNavigation(0);

copyArea.addEventListener("click", async (e) => {
  const btn = e.target.closest(".copy");
  if (!btn) return;

  const block = btn.closest(".code-block");
  const text = block.querySelector("pre").innerText;
  const feedback = block.querySelector(".copy-feedback");

  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = "copiado!";
    if (feedback) feedback.textContent = "Código copiado!";
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      btn.textContent = "copiado!";
      if (feedback) feedback.textContent = "Código copiado!";
    } catch {
      if (feedback) feedback.textContent = "Falha ao copiar. Selecione o código manualmente.";
    }
  }

  setTimeout(() => {
    btn.textContent = "copiar";
    if (feedback) feedback.textContent = "";
  }, 1500);
});
