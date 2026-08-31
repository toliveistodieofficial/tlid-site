const buyButton = document.getElementById("buyButton");
const storeMessage = document.getElementById("storeMessage");

buyButton?.addEventListener("click", async () => {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error || !data.user) {
        storeMessage.textContent = "Você precisa entrar na sua conta antes de comprar.";
        setTimeout(() => { window.location.href = "conta.html"; }, 900);
        return;
    }
    storeMessage.textContent = "Sua conta está conectada. O checkout será integrado ao backend de pagamento depois.";
});
