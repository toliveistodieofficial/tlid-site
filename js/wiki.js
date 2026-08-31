function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value || "—";
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id && typeof charactersDatabase !== "undefined") {
    const character = charactersDatabase[id];

    if (!character) {
        window.location.href = "wiki.html";
    } else {
        document.title = `${character.name} | TLITD Wiki`;
        setText("wikiCharacterName", character.name.toUpperCase());
        setText("characterCategory", character.category);
        setText("characterBiography", character.biography);
        setText("characterAppearanceText", character.appearance);
        setText("characterPersonality", character.personality);
        setText("characterCombat", character.combat);
        setText("characterHistory", character.history);
        setText("infoName", character.name);
        setText("infoAffiliation", character.affiliation);
        setText("infoGift", character.gift);
        setText("infoWeapon", character.weapon);
        setText("infoFirstAppearance", character.firstAppearance);

        document.querySelectorAll(".wiki-sidebar a[data-character-id]").forEach(link => {
            link.classList.toggle("active", link.dataset.characterId === id);
        });
    }
}

const search = document.getElementById("wikiSearch");
const categories = document.querySelectorAll(".wiki-category");

if (search) {
    search.addEventListener("input", () => {
        const value = search.value.toLowerCase().trim();
        categories.forEach(category => {
            const content = `${category.dataset.search || ""} ${category.textContent}`.toLowerCase();
            category.style.display = content.includes(value) ? "block" : "none";
        });
    });
}
