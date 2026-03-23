const STORAGE_KEY = "meu-financeiro-state-v3";
const THEME_KEY = "meu-financeiro-theme";

const tipsBank = [
  "Seu dinheiro cresce quando suas escolhas param de ser automáticas e passam a ser conscientes.",
  "Cada gasto alinhado com sua prioridade fortalece a vida que você quer construir.",
  "Organizar as finanças não limita sonhos; organiza o caminho para eles.",
  "O valor da disciplina diaria aparece nos resultados que o impulso nunca sustentaria.",
  "Poupar não é se privar de viver; é garantir que o futuro também tenha espaço para você.",
  "Toda meta financeira começa pequena, mas amadurece com constância.",
  "Prosperidade também é paz ao olhar suas contas sem medo.",
  "Cuidar do seu dinheiro é uma forma de cuidar da sua liberdade.",
  "Quando você dá nome ao seu objetivo, fica mais fácil dizer não ao excesso.",
  "Renda bem distribuída cria estabilidade mesmo em fases incertas.",
  "A clareza financeira reduz ansiedade e aumenta o poder de decisão.",
  "O controle financeiro certo não aperta sua vida; ele devolve direção.",
  "Seu futuro não precisa ser improvável quando seu presente é organizado.",
  "Pequenas escolhas consistentes vencem grandes promessas sem plano.",
  "Toda reserva começa com a coragem de priorizar o que realmente importa.",
  "Dinheiro bem cuidado amplia possibilidades, não apenas números.",
  "Seu crescimento financeiro merece rotina, método e orgulho.",
  "Não espere sobrar para guardar; decida guardar para aprender a gerir.",
  "A tranquilidade de amanhã nasce da intenção que você coloca hoje.",
  "Uma vida financeira forte não exige perfeição, exige continuidade.",
  "Quem revisa seus gastos com honestidade encontra espaço para crescer.",
  "Seu progresso financeiro merece ser visto, medido e celebrado.",
  "Planejamento e o ponto onde o sonho deixa de ser abstrato.",
  "A firmeza no essencial sustenta a leveza no restante.",
  "Seu dinheiro pode contar a história da pessoa que você escolheu ser.",
  "Toda virada financeira começa quando você assume o comando.",
  "Organizar contas é um gesto de respeito com seu trabalho e seu tempo.",
  "Metas claras transformam sacrificios temporarios em escolhas cheias de sentido.",
  "Comparacao atrasa. Consistencia acelera.",
  "Você não precisa fazer tudo hoje, mas precisa continuar todo dia.",
  "Liberdade financeira começa com pequenas decisões repetidas com intenção.",
  "Dinheiro sem direção se perde; dinheiro com propósito constrói.",
  "Organização financeira é autocuidado em forma de números.",
  "Resultados financeiros são construídos na rotina, não no acaso."
];

const tipBackgrounds = [
  ["#6da0ff", "#88f0e1"],
  ["#2b7fff", "#8ecaff"],
  ["#7f84ff", "#b4d0ff"],
  ["#5f9dff", "#ffc56c"],
  ["#61a1ff", "#79f2d9"]
];

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const dayLabel = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const monthLabel = new Intl.DateTimeFormat("pt-BR", { month: "short" });

const defaultAvatar =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#7EA8FF"/><stop offset="1" stop-color="#80F0E2"/></linearGradient></defs><rect width="160" height="160" rx="80" fill="url(#g)"/><circle cx="80" cy="58" r="30" fill="rgba(255,255,255,0.88)"/><path d="M30 136c10-25 29-38 50-38s40 13 50 38" fill="rgba(255,255,255,0.88)"/></svg>'
  );

const seedState = { users: [], currentUserId: null };

const ui = {
  authShell: document.querySelector("#auth-shell"),
  dashboard: document.querySelector("#dashboard"),
  authTabs: document.querySelectorAll("[data-auth-view]"),
  loginForm: document.querySelector("#login-form"),
  registerForm: document.querySelector("#register-form"),
  loginFeedback: document.querySelector("#login-feedback"),
  registerFeedback: document.querySelector("#register-feedback"),
  navItems: document.querySelectorAll(".nav-item"),
  screens: document.querySelectorAll(".screen"),
  screenTitle: document.querySelector("#screen-title"),
  topbarName: document.querySelector("#topbar-name"),
  topbarIncome: document.querySelector("#topbar-income"),
  topbarAvatar: document.querySelector("#topbar-avatar"),
  themeToggle: document.querySelector("#theme-toggle"),
  logoutButton: document.querySelector("#logout-button"),
  accountForm: document.querySelector("#account-form"),
  accountsList: document.querySelector("#accounts-list"),
  incomeForm: document.querySelector("#income-form"),
  incomeAccountSelect: document.querySelector("#income-account-select"),
  incomeTable: document.querySelector("#income-table"),
  incomeFilterType: document.querySelector("#income-filter-type"),
  expenseForm: document.querySelector("#expense-form"),
  expenseAccountSelect: document.querySelector("#expense-account-select"),
  expenseTable: document.querySelector("#expense-table"),
  expenseSearch: document.querySelector("#expense-search"),
  expenseCategoryFilter: document.querySelector("#expense-filter-category"),
  expenseFrequencyFilter: document.querySelector("#expense-filter-frequency"),
  profileForm: document.querySelector("#profile-form"),
  profileFeedback: document.querySelector("#profile-feedback"),
  profileNameInput: document.querySelector("#profile-name-input"),
  profileIncomeInput: document.querySelector("#profile-income-input"),
  profilePhoneInput: document.querySelector("#profile-phone-input"),
  profileSocialInput: document.querySelector("#profile-social-input"),
  profileAvatarInput: document.querySelector("#profile-avatar-input"),
  profileName: document.querySelector("#profile-name"),
  profileIncome: document.querySelector("#profile-income"),
  profilePhone: document.querySelector("#profile-phone"),
  profileSocialLink: document.querySelector("#profile-social-link"),
  profileAvatarPreview: document.querySelector("#profile-avatar-preview"),
  profileAccountCount: document.querySelector("#profile-account-count"),
  profileIncomeCount: document.querySelector("#profile-income-count"),
  profileExpenseCount: document.querySelector("#profile-expense-count"),
  shareProfileButton: document.querySelector("#share-profile-button"),
  shareFeedback: document.querySelector("#share-feedback"),
  homeBalance: document.querySelector("#home-balance"),
  homeBalanceNote: document.querySelector("#home-balance-note"),
  homeIncomeTotal: document.querySelector("#home-income-total"),
  homeExpenseTotal: document.querySelector("#home-expense-total"),
  homeWeekly: document.querySelector("#home-weekly"),
  homeWeeklyNote: document.querySelector("#home-weekly-note"),
  homeSummaryList: document.querySelector("#home-summary-list"),
  homeAlerts: document.querySelector("#home-alerts"),
  monthlyChart: document.querySelector("#monthly-chart"),
  categoryChart: document.querySelector("#category-chart"),
  weeklyChart: document.querySelector("#weekly-chart"),
  trendChart: document.querySelector("#trend-chart"),
  reportStats: document.querySelector("#report-stats"),
  reportInsights: document.querySelector("#report-insights"),
  homeTransactions: document.querySelector("#home-transactions"),
  dailyTipText: document.querySelector("#daily-tip-text"),
  sidebarTip: document.querySelector("#sidebar-tip"),
  tipRefresh: document.querySelector("#tip-refresh"),
  tipDownload: document.querySelector("#tip-download"),
  tipDownloadSidebar: document.querySelector("#tip-download-sidebar"),
  authPreviewBalance: document.querySelector("#auth-preview-balance")
};

let state = loadState();
let currentTheme = localStorage.getItem(THEME_KEY) || "light";
let activeScreen = "home";
applyTheme(currentTheme);

function dateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function getTipIndexForToday() {
  return Number(new Date().toISOString().slice(0, 10).replaceAll("-", "")) % tipsBank.length;
}

function createProfile(name, income, avatar, phone = "", socialLink = "") {
  return { name, mainIncome: income, avatar: avatar || defaultAvatar, phone, socialLink };
}

function createDemoUser() {
  const now = new Date();
  const months = Array.from({ length: 6 }).map((_, index) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - index), 10);
    return d.toISOString().slice(0, 10);
  });
  return {
    id: crypto.randomUUID(),
    email: "demo@meufinanceiro.app",
    password: "123456",
    profile: createProfile("Camila Rocha", 7800, defaultAvatar, "(11) 99888-7766", "https://instagram.com/camilarocha.finance"),
    accounts: [
      { id: crypto.randomUUID(), name: "Conta principal", type: "Conta corrente", balance: 4250 },
      { id: crypto.randomUUID(), name: "Reserva", type: "Poupança", balance: 12800 },
      { id: crypto.randomUUID(), name: "Investimentos", type: "Investimento", balance: 21450 }
    ],
    income: [
      { id: crypto.randomUUID(), name: "Salário", type: "Fixa", category: "Salário", amount: 6200, accountId: "", note: "Empresa atual", date: months[5] },
      { id: crypto.randomUUID(), name: "Freelance", type: "Variável", category: "Freelance", amount: 1100, accountId: "", note: "Projeto digital", date: months[5] },
      { id: crypto.randomUUID(), name: "Bônus", type: "Variável", category: "Bônus", amount: 850, accountId: "", note: "Meta mensal", date: months[4] },
      { id: crypto.randomUUID(), name: "Aluguel", type: "Fixa", category: "Renda passiva", amount: 950, accountId: "", note: "Repasse do imóvel", date: months[3] }
    ],
    expenses: [
      { id: crypto.randomUUID(), name: "Mercado", category: "Mercado", frequency: "Mensal", amount: 820, accountId: "", date: dateOffset(-2) },
      { id: crypto.randomUUID(), name: "Aluguel", category: "Moradia", frequency: "Mensal", amount: 1800, accountId: "", date: dateOffset(-4) },
      { id: crypto.randomUUID(), name: "Academia", category: "Saúde", frequency: "Mensal", amount: 119, accountId: "", date: dateOffset(-7) },
      { id: crypto.randomUUID(), name: "Cinema", category: "Lazer", frequency: "Único", amount: 68, accountId: "", date: dateOffset(-1) },
      { id: crypto.randomUUID(), name: "Restaurante", category: "Alimentação", frequency: "Semanal", amount: 134, accountId: "", date: dateOffset(-5) },
      { id: crypto.randomUUID(), name: "Uber", category: "Transporte", frequency: "Semanal", amount: 52, accountId: "", date: dateOffset(-3) },
      { id: crypto.randomUUID(), name: "Streaming", category: "Assinaturas", frequency: "Mensal", amount: 39.9, accountId: "", date: dateOffset(-10) }
    ],
    selectedTipIndex: getTipIndexForToday()
  };
}

function normalizeLabel(value) {
  const replacements = {
    Poupanca: "Poupança",
    Poupança: "Poupança",
    Salario: "Salário",
    Salário: "Salário",
    Saude: "Saúde",
    Saúde: "Saúde",
    Unico: "Único",
    Único: "Único",
    Alimentacao: "Alimentação",
    Alimentação: "Alimentação",
    Variavel: "Variável",
    Variável: "Variável",
    Usuario: "Usuário",
    Usuário: "Usuário"
  };
  return replacements[value] || value;
}

function normalizeState(parsed) {
  parsed.users = (parsed.users || []).map((user) => ({
    ...user,
    selectedTipIndex: Number.isInteger(user.selectedTipIndex) ? user.selectedTipIndex : getTipIndexForToday(),
    accounts: (user.accounts || []).map((account) => ({
      ...account,
      type: normalizeLabel(account.type)
    })),
    income: (user.income || []).map((item) => ({
      ...item,
      name: normalizeLabel(item.name),
      type: normalizeLabel(item.type),
      category: normalizeLabel(item.category),
      note: item.note || ""
    })),
    expenses: (user.expenses || []).map((item) => ({
      ...item,
      category: normalizeLabel(item.category),
      frequency: normalizeLabel(item.frequency)
    })),
    profile: {
      avatar: user.profile?.avatar || defaultAvatar,
      name: user.profile?.name || "Usuário",
      mainIncome: Number(user.profile?.mainIncome || 0),
      phone: user.profile?.phone || "",
      socialLink: user.profile?.socialLink || ""
    }
  }));
  return parsed;
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const demo = createDemoUser();
    demo.income = demo.income.map((item) => ({ ...item, accountId: demo.accounts[0].id }));
    demo.expenses = demo.expenses.map((item, index) => ({ ...item, accountId: demo.accounts[index % demo.accounts.length].id }));
    const initial = { ...seedState, users: [demo] };
    saveState(initial);
    return initial;
  }
  try {
    return normalizeState(JSON.parse(raw));
  } catch {
    const fallback = { ...seedState, users: [createDemoUser()] };
    saveState(fallback);
    return fallback;
  }
}

function saveState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function getCurrentUser() {
  return state.users.find((user) => user.id === state.currentUserId) || null;
}

function updateState(mutator) {
  mutator(state);
  saveState(state);
  render();
}

function setAuthView(view) {
  ui.authTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.authView === view));
  ui.loginForm.classList.toggle("is-hidden", view !== "login");
  ui.registerForm.classList.toggle("is-hidden", view !== "register");
}

function setActiveScreen(screen) {
  activeScreen = screen;
  ui.navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.screen === screen));
  ui.screens.forEach((node) => {
    const isTarget = node.id === `screen-${screen}`;
    node.classList.toggle("is-active", isTarget);
    if (isTarget) {
      node.style.animation = "none";
      node.offsetHeight;
      node.style.animation = "";
    }
  });
  ui.screenTitle.textContent = { home: "Home", accounts: "Contas", income: "Rendas", expenses: "Gastos", reports: "Relatórios", profile: "Perfil" }[screen];
}

function applyTheme(theme) {
  currentTheme = theme;
  document.body.dataset.theme = theme === "dark" ? "dark" : "light";
  localStorage.setItem(THEME_KEY, currentTheme);
  if (ui.themeToggle) {
    ui.themeToggle.textContent = currentTheme === "dark" ? "Modo claro" : "Modo noturno";
  }
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

async function readAvatarForStorage(file) {
  if (!file) return "";
  const source = await readFileAsDataURL(file);
  const image = await loadImage(source);
  const maxSize = 320;
  const scale = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.82);
}

function normalizeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value) {
  return currency.format(value || 0);
}

function accountName(user, accountId) {
  return user.accounts.find((account) => account.id === accountId)?.name || "Sem conta";
}

function totalIncome(user) {
  return user.income.reduce((sum, item) => sum + normalizeNumber(item.amount), 0);
}

function totalExpenses(user) {
  return user.expenses.reduce((sum, item) => sum + normalizeNumber(item.amount), 0);
}

function totalAccountsBalance(user) {
  return user.accounts.reduce((sum, item) => sum + normalizeNumber(item.balance), 0);
}

function balanceNow(user) {
  return totalAccountsBalance(user) + totalIncome(user) - totalExpenses(user);
}

function getRecentTransactions(user) {
  return [...user.income.map((item) => ({ ...item, recordType: "Renda" })), ...user.expenses.map((item) => ({ ...item, recordType: "Gasto" }))]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);
}

function monthlyBuckets(user) {
  const buckets = [];
  const today = new Date();
  for (let i = 5; i >= 0; i -= 1) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const month = monthDate.getMonth();
    const year = monthDate.getFullYear();
    const income = user.income
      .filter((item) => {
        const d = new Date(item.date);
        return d.getMonth() === month && d.getFullYear() === year;
      })
      .reduce((sum, item) => sum + normalizeNumber(item.amount), 0);
    const expenses = user.expenses
      .filter((item) => {
        const d = new Date(item.date);
        return d.getMonth() === month && d.getFullYear() === year;
      })
      .reduce((sum, item) => sum + normalizeNumber(item.amount), 0);
    buckets.push({ label: monthLabel.format(monthDate), income, expenses });
  }
  return buckets;
}

function weeklyBuckets(user) {
  const buckets = [];
  for (let i = 6; i >= 0; i -= 1) {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - i);
    const iso = day.toISOString().slice(0, 10);
    const total = user.expenses
      .filter((item) => item.date === iso)
      .reduce((sum, item) => sum + normalizeNumber(item.amount), 0);
    buckets.push({ label: dayLabel.format(day).replace(".", ""), total });
  }
  return buckets;
}

function categoryTotals(user) {
  const groups = new Map();
  user.expenses.forEach((expense) => {
    groups.set(expense.category, (groups.get(expense.category) || 0) + normalizeNumber(expense.amount));
  });
  return [...groups.entries()].map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total).slice(0, 5);
}

function currentTip(user) {
  const rawIndex = Number.isInteger(user.selectedTipIndex) ? user.selectedTipIndex : getTipIndexForToday();
  const normalizedIndex = ((rawIndex % tipsBank.length) + tipsBank.length) % tipsBank.length;
  return tipsBank[normalizedIndex];
}

function renderAccountOptions(user) {
  const options = user.accounts.map((account) => `<option value="${account.id}">${account.name}</option>`).join("");
  ui.incomeAccountSelect.innerHTML = options || '<option value="">Sem conta</option>';
  ui.expenseAccountSelect.innerHTML = options || '<option value="">Sem conta</option>';
}

function renderAccounts(user) {
  if (!user.accounts.length) {
    ui.accountsList.innerHTML = '<div class="empty-state">Nenhuma conta cadastrada ainda.</div>';
    return;
  }
  ui.accountsList.innerHTML = user.accounts
    .map(
      (account) => `
        <article class="info-chip">
          <span class="mini-label">${account.type}</span>
          <strong>${account.name}</strong>
          <div class="chip-meta">
            <span>Saldo: ${formatMoney(account.balance)}</span>
            <button class="text-button danger-button" type="button" data-delete-account="${account.id}">Excluir</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderIncomeTable(user) {
  const filter = ui.incomeFilterType.value;
  const items = user.income.filter((item) => filter === "Todas" || item.type === filter);
  if (!items.length) {
    ui.incomeTable.innerHTML = '<tr><td colspan="6" class="empty-state">Nenhuma renda encontrada.</td></tr>';
    return;
  }
  ui.incomeTable.innerHTML = items
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.type}</td>
          <td>${item.category}</td>
          <td>${accountName(user, item.accountId)}</td>
          <td>${formatMoney(item.amount)}</td>
          <td>
            <div class="action-row">
              <button class="text-button" type="button" data-edit-income="${item.id}">Editar</button>
              <button class="text-button danger-button" type="button" data-delete-income="${item.id}">Excluir</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

function renderExpenseFilters(user) {
  const categories = [...new Set(user.expenses.map((item) => item.category))].sort();
  ui.expenseCategoryFilter.innerHTML =
    '<option value="Todas">Todas as categorias</option>' +
    categories.map((item) => `<option value="${item}">${item}</option>`).join("");
}

function renderExpenseTable(user) {
  const search = ui.expenseSearch.value.trim().toLowerCase();
  const category = ui.expenseCategoryFilter.value;
  const frequency = ui.expenseFrequencyFilter.value;
  const items = user.expenses.filter((item) => {
    const searchMatch = !search || item.name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search);
    const categoryMatch = category === "Todas" || item.category === category;
    const frequencyMatch = frequency === "Todas" || item.frequency === frequency;
    return searchMatch && categoryMatch && frequencyMatch;
  });
  if (!items.length) {
    ui.expenseTable.innerHTML = '<tr><td colspan="7" class="empty-state">Nenhum gasto encontrado.</td></tr>';
    return;
  }
  ui.expenseTable.innerHTML = items
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${item.frequency}</td>
          <td>${accountName(user, item.accountId)}</td>
          <td>${item.date}</td>
          <td>${formatMoney(item.amount)}</td>
          <td>
            <div class="action-row">
              <button class="text-button" type="button" data-edit-expense="${item.id}">Editar</button>
              <button class="text-button danger-button" type="button" data-delete-expense="${item.id}">Excluir</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

function renderMonthlyChart(user) {
  const data = monthlyBuckets(user);
  const max = Math.max(1, ...data.flatMap((item) => [item.income, item.expenses]));
  ui.monthlyChart.innerHTML = `
    <div class="bar-chart">
      ${data
        .map((item) => {
          const incomeHeight = Math.max(12, (item.income / max) * 180);
          const expenseHeight = Math.max(12, (item.expenses / max) * 180);
          return `
            <div class="bar-column">
              <div class="bars-wrap">
                <span class="bar income-bar" style="height:${incomeHeight}px"></span>
                <span class="bar expense-bar" style="height:${expenseHeight}px"></span>
              </div>
              <strong class="chart-value">${formatMoney(item.income - item.expenses)}</strong>
              <span class="bar-label">${item.label}</span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderCategoryChart(user) {
  const data = categoryTotals(user);
  if (!data.length) {
    ui.categoryChart.innerHTML = '<div class="empty-state">Cadastre gastos para visualizar categorias.</div>';
    return;
  }
  const total = data.reduce((sum, item) => sum + item.total, 0);
  const colors = ["#2b7fff", "#6de5d6", "#ffc56c", "#9aa4ff", "#e7677d"];
  let progress = 0;
  const gradient = data
    .map((item, index) => {
      const next = progress + (item.total / total) * 100;
      const segment = `${colors[index]} ${progress}% ${next}%`;
      progress = next;
      return segment;
    })
    .join(", ");
  ui.categoryChart.innerHTML = `
    <div class="donut-layout">
      <div class="donut" style="background: conic-gradient(${gradient})"></div>
      <div class="legend">
        ${data
          .map(
            (item, index) => `
              <div class="legend-item">
                <strong><span class="swatch" style="background:${colors[index]}"></span>${item.name}</strong>
                <span>${formatMoney(item.total)}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderHome(user) {
  const income = totalIncome(user);
  const expenses = totalExpenses(user);
  const balance = balanceNow(user);
  const weeklyExpense = weeklyBuckets(user).reduce((sum, item) => sum + item.total, 0);
  const committed = income > 0 ? Math.round((expenses / income) * 100) : 0;
  const fixedIncome = user.income.filter((item) => item.type === "Fixa").reduce((sum, item) => sum + item.amount, 0);
  const variableIncome = user.income.filter((item) => item.type === "Variável").reduce((sum, item) => sum + item.amount, 0);
  const reserveRatio = income > 0 ? Math.max(0, Math.round(((income - expenses) / income) * 100)) : 0;
  const topCategory = categoryTotals(user)[0];

  ui.homeBalance.textContent = formatMoney(balance);
  ui.homeBalanceNote.textContent = `${committed}% da renda total já está comprometida com gastos.`;
  ui.homeIncomeTotal.textContent = formatMoney(income);
  ui.homeExpenseTotal.textContent = formatMoney(expenses);
  ui.homeWeekly.textContent = formatMoney(weeklyExpense);
  ui.homeWeeklyNote.textContent = "Soma dos últimos 7 dias.";

  ui.homeSummaryList.innerHTML = `
    <article class="summary-item">
      <strong>Renda fixa</strong>
      <span>${formatMoney(fixedIncome)}</span>
    </article>
    <article class="summary-item">
      <strong>Renda variável</strong>
      <span>${formatMoney(variableIncome)}</span>
    </article>
    <article class="summary-item">
      <strong>Capacidade de reserva</strong>
      <span>${reserveRatio}% da renda</span>
    </article>
  `;

  ui.homeAlerts.innerHTML = [
    {
      title: "Foco imediato",
      body: topCategory ? `${topCategory.name} é hoje sua categoria de maior impacto financeiro.` : "Adicione gastos para visualizar alertas inteligentes."
    },
    {
      title: "Leitura semanal",
      body: `Nos últimos 7 dias você movimentou ${formatMoney(weeklyExpense)} em despesas.`
    },
    {
      title: "Estabilidade",
      body: fixedIncome >= variableIncome
        ? "Sua renda fixa sustenta a maior parte do fluxo, o que melhora a previsibilidade."
        : "Sua renda variável está relevante. Vale manter uma reserva maior para suavizar oscilações."
    }
  ]
    .map((item) => `<article class="insight-item"><strong>${item.title}</strong><p>${item.body}</p></article>`)
    .join("");

  ui.homeTransactions.innerHTML = getRecentTransactions(user)
    .map(
      (item) => `
        <tr>
          <td>${item.recordType}</td>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${accountName(user, item.accountId)}</td>
          <td>${formatMoney(item.amount)}</td>
        </tr>
      `
    )
    .join("");

  renderMonthlyChart(user);
  renderCategoryChart(user);
}

function renderTrendChart(user) {
  const points = monthlyBuckets(user);
  const maxValue = Math.max(1, ...points.flatMap((item) => [item.income, item.expenses]));
  const svgWidth = 640;
  const svgHeight = 220;
  const pathFor = (key) =>
    points
      .map((point, index) => {
        const x = (index / Math.max(points.length - 1, 1)) * (svgWidth - 40) + 20;
        const y = svgHeight - (point[key] / maxValue) * (svgHeight - 30) - 10;
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  ui.trendChart.innerHTML = `
    <div class="line-chart">
      <div class="line-grid">
        <svg class="line-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="none">
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#ffc56c"></stop><stop offset="1" stop-color="#6de5d6"></stop></linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#2b7fff"></stop><stop offset="1" stop-color="#9aa4ff"></stop></linearGradient>
          </defs>
          <path d="${pathFor("income")}" fill="none" stroke="url(#incomeGradient)" stroke-width="4" stroke-linecap="round"></path>
          <path d="${pathFor("expenses")}" fill="none" stroke="url(#expenseGradient)" stroke-width="4" stroke-linecap="round"></path>
        </svg>
      </div>
      <div class="line-legend">
        <span><span class="legend-bullet" style="background:#ffc56c"></span> Rendas</span>
        <span><span class="legend-bullet" style="background:#2b7fff"></span> Gastos</span>
      </div>
    </div>
  `;
}

function renderReports(user) {
  const weeklyData = weeklyBuckets(user);
  const maxWeekly = Math.max(1, ...weeklyData.map((item) => item.total));
  ui.weeklyChart.innerHTML = `
    <div class="weekly-chart-grid">
      ${weeklyData
        .map((item) => {
          const height = Math.max(12, (item.total / maxWeekly) * 200);
          return `<div class="weekly-day"><div class="weekly-stick" style="height:${height}px"></div><strong class="chart-value">${formatMoney(item.total)}</strong><span class="bar-label">${item.label}</span></div>`;
        })
        .join("")}
    </div>
  `;

  renderTrendChart(user);

  const income = totalIncome(user);
  const expenses = totalExpenses(user);
  const fixedIncome = user.income.filter((item) => item.type === "Fixa").reduce((sum, item) => sum + item.amount, 0);
  const variableIncome = user.income.filter((item) => item.type === "Variável").reduce((sum, item) => sum + item.amount, 0);
  const topCategory = categoryTotals(user)[0];
  const savings = income - expenses;

  ui.reportStats.innerHTML = `
    <article class="inline-card"><strong>${formatMoney(income)}</strong><span>renda total cadastrada</span></article>
    <article class="inline-card"><strong>${formatMoney(expenses)}</strong><span>gasto total registrado</span></article>
    <article class="inline-card"><strong>${formatMoney(fixedIncome)}</strong><span>renda fixa</span></article>
    <article class="inline-card"><strong>${formatMoney(variableIncome)}</strong><span>renda variável</span></article>
  `;

  ui.reportInsights.innerHTML = [
    {
      title: "Leitura geral",
      body: savings >= 0 ? `Seu saldo projetado está positivo em ${formatMoney(savings)}. O fluxo está saudável neste momento.` : `Seus gastos superaram a renda em ${formatMoney(Math.abs(savings))}. Vale revisar categorias recorrentes.`
    },
    {
      title: "Maior centro de custo",
      body: topCategory ? `${topCategory.name} lidera os gastos com ${formatMoney(topCategory.total)}.` : "Ainda não há categorias suficientes para apontar o maior centro de custo."
    },
    {
      title: "Composição da renda",
      body: `A renda fixa representa ${income ? Math.round((fixedIncome / income) * 100) : 0}% do total.`
    }
  ]
    .map((item) => `<article class="insight-item"><strong>${item.title}</strong><p>${item.body}</p></article>`)
    .join("");
}

function renderTopbar(user) {
  ui.topbarName.textContent = user.profile.name;
  ui.topbarIncome.textContent = `Renda base ${formatMoney(user.profile.mainIncome)}`;
  ui.topbarAvatar.src = user.profile.avatar || defaultAvatar;
}

function renderTip(user) {
  const tip = currentTip(user);
  ui.dailyTipText.textContent = tip;
  ui.sidebarTip.textContent = tip;
}

function renderProfile(user) {
  ui.profileNameInput.value = user.profile.name;
  ui.profileIncomeInput.value = user.profile.mainIncome;
  ui.profilePhoneInput.value = user.profile.phone || "";
  ui.profileSocialInput.value = user.profile.socialLink || "";
  ui.profileName.textContent = user.profile.name;
  ui.profileIncome.textContent = `Renda principal declarada: ${formatMoney(user.profile.mainIncome)}`;
  ui.profilePhone.textContent = user.profile.phone || "Telefone não informado";
  ui.profileAvatarPreview.src = user.profile.avatar || defaultAvatar;
  ui.profileSocialLink.href = user.profile.socialLink || "#";
  ui.profileSocialLink.textContent = user.profile.socialLink ? "Abrir perfil social" : "Nenhum link social informado";
  ui.profileSocialLink.classList.toggle("is-hidden", !user.profile.socialLink);
  ui.profileAccountCount.textContent = String(user.accounts.length);
  ui.profileIncomeCount.textContent = String(user.income.length);
  ui.profileExpenseCount.textContent = String(user.expenses.length);
}

function render() {
  const user = getCurrentUser();
  if (!user) {
    ui.authShell.classList.remove("is-hidden");
    ui.dashboard.classList.add("is-hidden");
    ui.authPreviewBalance.textContent = "R$ 18.320,00";
    return;
  }
  ui.authShell.classList.add("is-hidden");
  ui.dashboard.classList.remove("is-hidden");
  renderTopbar(user);
  renderAccountOptions(user);
  renderAccounts(user);
  renderIncomeTable(user);
  renderExpenseFilters(user);
  renderExpenseTable(user);
  renderHome(user);
  renderReports(user);
  renderProfile(user);
  renderTip(user);
}

function login(email, password) {
  const user = state.users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
  if (!user) {
    ui.loginFeedback.textContent = "Não encontramos uma conta com esses dados.";
    return;
  }
  updateState((draft) => {
    draft.currentUserId = user.id;
  });
  ui.loginFeedback.textContent = "";
}

async function register(formData) {
  const email = formData.get("email").toString().trim().toLowerCase();
  if (state.users.some((user) => user.email.toLowerCase() === email)) {
    ui.registerFeedback.textContent = "Já existe uma conta cadastrada com este e-mail.";
    return;
  }
  const avatarFile = formData.get("avatar");
  const avatar = avatarFile instanceof File && avatarFile.size > 0 ? await readFileAsDataURL(avatarFile) : defaultAvatar;
  const accountId = crypto.randomUUID();
  const user = {
    id: crypto.randomUUID(),
    email,
    password: formData.get("password").toString(),
    profile: createProfile(
      formData.get("name").toString().trim(),
      normalizeNumber(formData.get("income")),
      avatar,
      formData.get("phone").toString().trim(),
      formData.get("socialLink").toString().trim()
    ),
    accounts: [{ id: accountId, name: "Conta principal", type: "Conta corrente", balance: 0 }],
    income: [{
      id: crypto.randomUUID(),
      name: "Renda principal",
      type: "Fixa",
      category: "Principal",
      amount: normalizeNumber(formData.get("income")),
      accountId,
      note: "Renda criada no cadastro",
      date: new Date().toISOString().slice(0, 10)
    }],
    expenses: [],
    selectedTipIndex: getTipIndexForToday()
  };
  updateState((draft) => {
    draft.users.push(user);
    draft.currentUserId = user.id;
  });
  ui.registerFeedback.textContent = "";
  ui.registerForm.reset();
}

function promptEditIncome(user, id) {
  const item = user.income.find((record) => record.id === id);
  if (!item) return;
  const name = window.prompt("Nome da renda:", item.name);
  if (!name) return;
  const category = window.prompt("Categoria/filtro da renda:", item.category) || item.category;
  const amount = window.prompt("Valor da renda:", String(item.amount));
  const type = window.prompt("Tipo (Fixa ou Variável):", item.type) || item.type;
  updateState((draft) => {
    const target = draft.users.find((entry) => entry.id === user.id).income.find((record) => record.id === id);
    target.name = name;
    target.category = category;
    target.amount = normalizeNumber(amount);
    target.type = type;
  });
}

function promptEditExpense(user, id) {
  const item = user.expenses.find((record) => record.id === id);
  if (!item) return;
  const name = window.prompt("Nome do gasto:", item.name);
  if (!name) return;
  const category = window.prompt("Categoria/filtro:", item.category) || item.category;
  const amount = window.prompt("Valor do gasto:", String(item.amount));
  const frequency = window.prompt("Frequência (Único, Semanal ou Mensal):", item.frequency) || item.frequency;
  updateState((draft) => {
    const target = draft.users.find((entry) => entry.id === user.id).expenses.find((record) => record.id === id);
    target.name = name;
    target.category = category;
    target.amount = normalizeNumber(amount);
    target.frequency = frequency;
  });
}

function deleteRecord(collectionKey, id) {
  const user = getCurrentUser();
  if (!user) return;
  updateState((draft) => {
    const targetUser = draft.users.find((item) => item.id === user.id);
    targetUser[collectionKey] = targetUser[collectionKey].filter((record) => record.id !== id);
  });
}

async function previewSelectedAvatar(file) {
  ui.profileAvatarPreview.src = file ? await readFileAsDataURL(file) : getCurrentUser()?.profile.avatar || defaultAvatar;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  let lines = 0;
  words.forEach((word, index) => {
    const testLine = `${line}${word} `;
    if (ctx.measureText(testLine).width > maxWidth && index > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = `${word} `;
      currentY += lineHeight;
      lines += 1;
    } else {
      line = testLine;
    }
  });
  if (line) {
    ctx.fillText(line.trim(), x, currentY);
    lines += 1;
  }
  return lines;
}

function fitTipFont(ctx, text, maxWidth, maxLines) {
  let size = 78;
  while (size > 42) {
    ctx.font = `700 ${size}px Space Grotesk, sans-serif`;
    const words = text.split(" ");
    let line = "";
    let lines = 1;
    for (const word of words) {
      const testLine = `${line}${word} `;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        lines += 1;
        line = `${word} `;
      } else {
        line = testLine;
      }
    }
    if (lines <= maxLines) {
      return size;
    }
    size -= 4;
  }
  return size;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawTipImage(tip) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1400;
  const ctx = canvas.getContext("2d");
  const palette = tipBackgrounds[Math.floor(Math.random() * tipBackgrounds.length)];
  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, palette[0]);
  bg.addColorStop(1, palette[1]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.beginPath();
  ctx.arc(220, 260, 190, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(990, 1160, 280, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  drawRoundedRect(ctx, 86, 120, 1028, 1120, 52);
  ctx.clip();
  const cardGradient = ctx.createLinearGradient(86, 120, 1114, 1240);
  cardGradient.addColorStop(0, "rgba(255,255,255,0.34)");
  cardGradient.addColorStop(1, "rgba(255,255,255,0.16)");
  ctx.fillStyle = cardGradient;
  ctx.fillRect(86, 120, 1028, 1120);
  ctx.restore();
  ctx.strokeStyle = "rgba(255,255,255,0.42)";
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 86, 120, 1028, 1120, 52);
  ctx.stroke();
  ctx.fillStyle = "rgba(13,25,42,0.82)";
  ctx.font = "700 42px Manrope, sans-serif";
  ctx.fillText("Meu Financeiro", 150, 210);
  ctx.fillStyle = "rgba(13,25,42,0.58)";
  ctx.font = "600 28px Manrope, sans-serif";
  ctx.fillText("Dica diária para compartilhar", 150, 262);
  drawRoundedRect(ctx, 130, 340, 940, 560, 42);
  ctx.fillStyle = "rgba(255,255,255,0.32)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.stroke();
  const fontSize = fitTipFont(ctx, tip, 800, 6);
  ctx.fillStyle = "#102238";
  ctx.font = `700 ${fontSize}px Space Grotesk, sans-serif`;
  const lineHeight = fontSize * 1.25;
  wrapText(ctx, tip, 200, 450, 800, lineHeight);
  ctx.fillStyle = "rgba(13,25,42,0.62)";
  ctx.font = "600 30px Manrope, sans-serif";
  ctx.fillText("Escolhas conscientes criam tranquilidade duradoura.", 150, 1030);
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "dica-meu-financeiro.png";
  link.click();
}

ui.authTabs.forEach((tab) => tab.addEventListener("click", () => setAuthView(tab.dataset.authView)));
ui.themeToggle?.addEventListener("click", () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});
ui.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(ui.loginForm);
  login(data.get("email").toString(), data.get("password").toString());
});
ui.registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await register(new FormData(ui.registerForm));
});
ui.navItems.forEach((item) => item.addEventListener("click", () => setActiveScreen(item.dataset.screen)));
ui.logoutButton.addEventListener("click", () => updateState((draft) => { draft.currentUserId = null; }));

ui.accountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) return;
  const data = new FormData(ui.accountForm);
  const account = { id: crypto.randomUUID(), name: data.get("name").toString(), type: data.get("type").toString(), balance: normalizeNumber(data.get("balance")) };
  updateState((draft) => { draft.users.find((item) => item.id === user.id).accounts.push(account); });
  ui.accountForm.reset();
});

ui.incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) return;
  const data = new FormData(ui.incomeForm);
  const item = {
    id: crypto.randomUUID(),
    name: data.get("name").toString(),
    type: data.get("type").toString(),
    amount: normalizeNumber(data.get("amount")),
    category: data.get("category").toString(),
    accountId: data.get("accountId").toString(),
    note: data.get("note").toString(),
    date: new Date().toISOString().slice(0, 10)
  };
  updateState((draft) => { draft.users.find((entry) => entry.id === user.id).income.push(item); });
  ui.incomeForm.reset();
});

ui.expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) return;
  const data = new FormData(ui.expenseForm);
  const item = {
    id: crypto.randomUUID(),
    name: data.get("name").toString(),
    amount: normalizeNumber(data.get("amount")),
    accountId: data.get("accountId").toString(),
    category: data.get("category").toString(),
    frequency: data.get("frequency").toString(),
    date: data.get("date").toString()
  };
  updateState((draft) => { draft.users.find((entry) => entry.id === user.id).expenses.push(item); });
  ui.expenseForm.reset();
  ui.expenseForm.querySelector('input[name="date"]').value = new Date().toISOString().slice(0, 10);
});

ui.incomeFilterType.addEventListener("change", () => { const user = getCurrentUser(); if (user) renderIncomeTable(user); });
[ui.expenseSearch, ui.expenseCategoryFilter, ui.expenseFrequencyFilter].forEach((element) => {
  element.addEventListener("input", () => { const user = getCurrentUser(); if (user) renderExpenseTable(user); });
  element.addEventListener("change", () => { const user = getCurrentUser(); if (user) renderExpenseTable(user); });
});

ui.profileAvatarInput.addEventListener("change", async () => {
  const file = ui.profileAvatarInput.files?.[0];
  await previewSelectedAvatar(file || null);
});

ui.profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) return;
  const avatarFile = ui.profileAvatarInput.files?.[0];
  try {
    const avatar = avatarFile ? await readAvatarForStorage(avatarFile) : "";
    updateState((draft) => {
      const target = draft.users.find((entry) => entry.id === user.id);
      target.profile.name = ui.profileNameInput.value.trim();
      target.profile.mainIncome = normalizeNumber(ui.profileIncomeInput.value);
      target.profile.phone = ui.profilePhoneInput.value.trim();
      target.profile.socialLink = ui.profileSocialInput.value.trim();
      if (avatar) target.profile.avatar = avatar;
    });
    const refreshedUser = getCurrentUser();
    if (refreshedUser) {
      ui.topbarAvatar.src = refreshedUser.profile.avatar || defaultAvatar;
      ui.profileAvatarPreview.src = refreshedUser.profile.avatar || defaultAvatar;
      ui.topbarAvatar.srcset = "";
      ui.profileAvatarPreview.srcset = "";
    }
    ui.profileFeedback.textContent = "Perfil atualizado com sucesso.";
    ui.profileAvatarInput.value = "";
  } catch {
    ui.profileFeedback.textContent = "Não foi possível salvar a foto. Tente uma imagem menor.";
  }
  window.clearTimeout(ui.profileFeedback.dataset.timeoutId ? Number(ui.profileFeedback.dataset.timeoutId) : 0);
  ui.profileFeedback.dataset.timeoutId = String(window.setTimeout(() => {
    ui.profileFeedback.textContent = "";
    delete ui.profileFeedback.dataset.timeoutId;
  }, 2600));
});

ui.shareProfileButton.addEventListener("click", async () => {
  const user = getCurrentUser();
  if (!user) return;
  const shareText = `${user.profile.name} | renda base ${formatMoney(user.profile.mainIncome)}${user.profile.socialLink ? ` | ${user.profile.socialLink}` : ""}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: "Perfil financeiro", text: shareText, url: user.profile.socialLink || window.location.href });
      ui.shareFeedback.textContent = "Perfil compartilhado.";
      return;
    }
    await navigator.clipboard.writeText(shareText);
    ui.shareFeedback.textContent = "Resumo do perfil copiado para a área de transferência.";
  } catch {
    ui.shareFeedback.textContent = "Não foi possível compartilhar agora.";
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const user = getCurrentUser();
  if (!user) return;
  if (target.dataset.deleteAccount) return deleteRecord("accounts", target.dataset.deleteAccount);
  if (target.dataset.deleteIncome) return deleteRecord("income", target.dataset.deleteIncome);
  if (target.dataset.deleteExpense) return deleteRecord("expenses", target.dataset.deleteExpense);
  if (target.dataset.editIncome) return promptEditIncome(user, target.dataset.editIncome);
  if (target.dataset.editExpense) return promptEditExpense(user, target.dataset.editExpense);
});

function rotateTip() {
  const user = getCurrentUser();
  if (!user) return;
  updateState((draft) => {
    const target = draft.users.find((entry) => entry.id === user.id);
    const currentIndex = Number.isInteger(target.selectedTipIndex) ? target.selectedTipIndex : getTipIndexForToday();
    target.selectedTipIndex = (currentIndex + 1) % tipsBank.length;
  });
}

ui.tipRefresh.addEventListener("click", rotateTip);
ui.tipDownload.addEventListener("click", () => { const user = getCurrentUser(); if (user) drawTipImage(currentTip(user)); });
ui.tipDownloadSidebar.addEventListener("click", () => { const user = getCurrentUser(); if (user) drawTipImage(currentTip(user)); });

setAuthView("login");
setActiveScreen("home");
ui.expenseForm.querySelector('input[name="date"]').value = new Date().toISOString().slice(0, 10);
render();







