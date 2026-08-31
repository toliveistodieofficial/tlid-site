const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const authPanel = document.getElementById("authPanel");
const profilePanel = document.getElementById("profilePanel");
const authMessage = document.getElementById("authMessage");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const logoutButton = document.getElementById("logoutButton");
const tabs = document.querySelectorAll(".account-tab");

function setMessage(message, type = "") {
    if (!authMessage) return;
    authMessage.textContent = message;
    authMessage.dataset.type = type;
}

function selectTab(tabName) {
    tabs.forEach(item => item.classList.toggle("active", item.dataset.tab === tabName));
    const isLogin = tabName === "login";
    loginForm?.classList.toggle("hidden", !isLogin);
    registerForm?.classList.toggle("hidden", isLogin);
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        selectTab(tab.dataset.tab);
        setMessage("");
    });
});

registerForm?.addEventListener("submit", async event => {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    setMessage("Criando conta...");

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: { name },
            emailRedirectTo: AUTH_REDIRECT_URL
        }
    });

    if (error) {
        setMessage(translateAuthError(error.message), "error");
        return;
    }

    if (data.session?.user) {
        await showProfile(data.session.user);
        setMessage("Conta criada e conectada.", "success");
        return;
    }

    setMessage(
        "Conta criada. Abra o email de confirmação. Depois de confirmar, você voltará para o site automaticamente.",
        "success"
    );
});

loginForm?.addEventListener("submit", async event => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    setMessage("Entrando...");

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
        setMessage(translateAuthError(error.message), "error");
        return;
    }

    await showProfile(data.user);
});

logoutButton?.addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    profilePanel?.classList.add("hidden");
    authPanel?.classList.remove("hidden");
    selectTab("login");
    setMessage("Você saiu da conta.", "success");
});

async function showProfile(user = null) {
    if (!user) {
        const { data } = await supabaseClient.auth.getUser();
        user = data.user;
    }

    if (!user) {
        authPanel?.classList.remove("hidden");
        profilePanel?.classList.add("hidden");
        return;
    }

    profileName.textContent = user.user_metadata?.name || user.email?.split("@")[0] || "JOGADOR";
    profileEmail.textContent = user.email || "";
    authPanel?.classList.add("hidden");
    profilePanel?.classList.remove("hidden");
}

function translateAuthError(message) {
    const value = message.toLowerCase();
    if (value.includes("invalid login credentials")) return "Email ou senha incorretos.";
    if (value.includes("email not confirmed")) return "Confirme seu email antes de entrar.";
    if (value.includes("already registered")) return "Já existe uma conta com esse email.";
    if (value.includes("password")) return `A senha não atende aos requisitos: ${message}`;
    return message;
}

async function initializeAccountPage() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("confirmed") === "1") {
        setMessage("Email confirmado. Sua conta está pronta.", "success");
        window.history.replaceState({}, "", window.location.pathname);
    }

    const { data } = await supabaseClient.auth.getSession();
    if (data.session?.user) {
        await showProfile(data.session.user);
    } else {
        await showProfile();
    }
}

supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
        showProfile(session.user);
    } else if (event === "SIGNED_OUT") {
        authPanel?.classList.remove("hidden");
        profilePanel?.classList.add("hidden");
    }
});

initializeAccountPage();
