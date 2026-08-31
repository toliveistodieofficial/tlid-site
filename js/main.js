const header =
    document.getElementById(
        "header"
    );


if (header) {

    window.addEventListener(
        "scroll",
        () => {

            header.classList.toggle(
                "scrolled",
                window.scrollY > 50
            );

        }
    );

}


// MOBILE MENU

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );


const navigation =
    document.getElementById(
        "navigation"
    );


if (
    mobileMenuButton &&
    navigation
) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            navigation.classList.toggle(
                "active"
            );

        }
    );

}


// STARS

const stars =
    document.getElementById(
        "stars"
    );


if (stars) {

    for (
        let i = 0;
        i < 90;
        i++
    ) {

        const star =
            document.createElement(
                "div"
            );


        star.classList.add(
            "star"
        );


        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 75 + "%";


        const size =
            Math.random() * 2 + 1;


        star.style.width =
            size + "px";


        star.style.height =
            size + "px";


        star.style.animationDelay =
            Math.random() * 5 + "s";


        stars.appendChild(
            star
        );

    }

}


// CHARACTERS

const characters = [

    {
        id: "irayu",

        name:
            "IRAYU SUZERIWA",

        description:
            "Um combatente cuja força cresce junto com o risco que aceita carregar."
    },

    {
        id: "orion",

        name:
            "ORION HUNTER",

        description:
            "Observa antes de agir e registra aquilo que os outros ainda nem perceberam."
    },

    {
        id: "faith",

        name:
            "FAITH WHINTER",

        description:
            "Uma presença que parece estar sempre um passo à frente da cena."
    },

    {
        id: "lara",

        name:
            "LARA VORKHEIN",

        description:
            "Precisão, leitura e controle acima de movimentos desnecessários."
    },

    {
        id: "aiden",

        name:
            "AIDEN GALLAGHER",

        description:
            "Uma presença leve que esconde uma capacidade muito maior do que demonstra."
    },

    {
        id: "hayato",

        name:
            "HAYATO SUZERIWA",

        description:
            "Não precisa demonstrar ameaça. O cálculo por trás de cada ação já faz isso."
    }

];


const characterName =
    document.getElementById(
        "characterName"
    );


const characterDescription =
    document.getElementById(
        "characterDescription"
    );


const characterWikiLink =
    document.getElementById(
        "characterWikiLink"
    );


const characterOptions =
    document.querySelectorAll(
        ".character-option"
    );


characterOptions.forEach(
    option => {

        option.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        option.dataset.character
                    );


                characterOptions.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                option.classList.add(
                    "active"
                );


                const character =
                    characters[index];


                if (characterName) {

                    characterName.textContent =
                        character.name;

                }


                if (characterDescription) {

                    characterDescription.textContent =
                        character.description;

                }


                if (characterWikiLink) {

                    characterWikiLink.href =
                        `personagem.html?id=${character.id}`;

                }

            }
        );

    }
);


// REVEAL

const revealElements =
    document.querySelectorAll(
        ".section, .pillars, .vesper-section, .store-promo"
    );


revealElements.forEach(
    element => {

        element.classList.add(
            "reveal"
        );

    }
);


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.08
        }

    );


revealElements.forEach(
    element => {

        observer.observe(
            element
        );

    }
);