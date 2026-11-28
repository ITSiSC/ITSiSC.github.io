document.addEventListener("DOMContentLoaded", () => {
    // 1. Toggle meniu pe mobil (animatie burger -> X + slide dropdown)
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            navToggle.classList.toggle("open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // 2. Buton de copiere pentru blocul de cod Express
    const copyBtn = document.getElementById("copy-btn");
    const codeElement = document.querySelector("#code-box pre code");

    if (copyBtn && codeElement) {
        copyBtn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(codeElement.innerText);
                copyBtn.textContent = "Copiat!";
                setTimeout(() => {
                    copyBtn.textContent = "Copiază";
                }, 1800);
            } catch {
                copyBtn.textContent = "Eroare";
            }
        });
    }

    // 3. Interactivitate sageti SVG pe mobil (un singur chenar)
    const arrowGreen = document.getElementById("arrow-branch-green");
    const arrowRed = document.getElementById("arrow-branch-red");
    const resultsGrid = document.getElementById("status-results-grid");
    const switchHint = document.getElementById("mobile-switch-hint");

    function selectMobileBranch(code) {
        if (!resultsGrid || !switchHint) return;
        resultsGrid.setAttribute("data-active", code);

        if (code === "214") {
            switchHint.innerHTML = 'Vezi și celălalt rezultat apăsând pe săgeata <strong style="color:#f87171;">roșie</strong>!';
        } else if (code === "409") {
            switchHint.innerHTML = 'Vezi și celălalt rezultat apăsând pe săgeata <strong style="color:#34d399;">verde</strong>!';
        }
    }

    if (arrowGreen && arrowRed) {
        arrowGreen.addEventListener("click", () => selectMobileBranch("214"));
        arrowRed.addEventListener("click", () => selectMobileBranch("409"));

        arrowGreen.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectMobileBranch("214");
            }
        });
        arrowRed.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectMobileBranch("409");
            }
        });
    }

    // 4. Modala detalii pentru Metode HTTP si HTTP Status Codes
    const topicDetails = {
        GET: {
            badge: "GET",
            title: "~ Operația Read --> pentru preluarea datelor",
            html: `
                <p>Solicită o reprezentare a unei resurse specifice de la server. Cererile <code>GET</code> trebuie să citească date, fără să modifice starea serverului.</p>
                <h1>Mai multe detalii în curând!</h1>
<!--                <h1>dar daca ai fost curios sa dau un inspect felicitari acu ia si documenteaza-te</h1>-->
<!--                <ul>-->
<!--                    <li><strong>Body:</strong> Nu are corp (payload); parametrii se trimit în URL (query params, ex. <code>?page=2</code>).</li>-->
<!--                    <li><strong>Cache:</strong> Poate fi salvată în cache-ul browserului și în istoric.</li>-->
<!--                    <li><strong>Idempotentă:</strong> Da — apelată de 10 ori la rând, returnează același rezultat fără efecte secundare.</li>-->
<!--                </ul>-->
            `
        },
        POST: {
            badge: "POST",
            title: "~ Operația Create --> pentru a adauga resurse noi",
            html: `
                <p>Trimite date către server pentru a crea o resursă nouă (ex: înregistrarea unui cont sau trimiterea unui formular).</p>
                <h1>Mai multe detalii în curând!</h1>
<!--                <h1>dar daca ai fost curios sa dau un inspect felicitari acu ia si documenteaza-te</h1>-->
<!--                <ul>-->
<!--                    <li><strong>Body:</strong> Datele se trimit în corpul cererii (JSON, FormData etc.).</li>-->
<!--                    <li><strong>Răspuns tipic:</strong> <code>201 Created</code> împreună cu resursa nou creată.</li>-->
<!--                    <li><strong>Idempotentă:</strong> Nu — apelată de două ori, poate crea două înregistrări duplicate.</li>-->
<!--                </ul>-->
            `
        },
        PUT: {
            badge: "PUT",
            title: "~ Operația Update --> pentru înlocuirea completă a unei resurse",
            html: `
                <p>Actualizează o resursă existentă înlocuind-o <strong>integral</strong> cu datele trimise în request (sau o creează dacă nu există).</p>
                <h1>Mai multe detalii în curând!</h1>
<!--                <h1>dar daca ai fost curios sa dau un inspect felicitari acu ia si documenteaza-te</h1>-->
<!--                <ul>-->
<!--                    <li><strong>Body:</strong> Trebuie să conțină toate câmpurile resursei, nu doar pe cele modificate.</li>-->
<!--                    <li><strong>Idempotentă:</strong> Da — trimiterea aceluiași <code>PUT</code> de mai multe ori lasă resursa în exact aceeași stare.</li>-->
<!--                </ul>-->
            `
        },
        PATCH: {
            badge: "PATCH",
            title: "~ Operația Update --> pentru modificarea parțială a unei resurse",
            html: `
                <p>Aplică modificări <strong>parțiale</strong> asupra unei resurse existente (ex: schimbi doar parola sau statusul unui utilizator).</p>
                <h1>Mai multe detalii în curând!</h1>
<!--                <h1>dar daca ai fost curios sa dau un inspect felicitari acu ia si documenteaza-te</h1>-->
<!--                <ul>-->
<!--                    <li><strong>Body:</strong> Conține strict câmpurile care trebuie actualizate.</li>-->
<!--                    <li><strong>Avantaj:</strong> Consumă mai puțină lățime de bandă decât <code>PUT</code> pentru obiecte mari.</li>-->
<!--                </ul>-->
            `
        },
        DELETE: {
            badge: "DELETE",
            title: "~ Operația Delete --> pentru ștergerea unei resurse",
            html: `
                <p>Solicită ștergerea resursei identificate prin URL de pe server (ex: <code>DELETE /users/42</code>).</p>
                <h1>Mai multe detalii în curând!</h1>
<!--                <h1>dar daca ai fost curios sa dau un inspect felicitari acu ia si documenteaza-te</h1>-->
<!--                <ul>-->
<!--                    <li><strong>Răspuns tipic:</strong> <code>200 OK</code> sau <code>204 No Content</code> (când ștergerea a reușit și nu se mai returnează niciun body).</li>-->
<!--                    <li><strong>Idempotentă:</strong> Da — după prima ștergere, resursa rămâne ștearsă.</li>-->
<!--                </ul>-->
            `
        },
        "1xx": {
            badge: "1xx • Informational",
            title: "Răspunsuri Informative",
            html: `
                <p><strong>Când apar:</strong> În timpul negocierii conexiunii, înainte ca serverul să trimită răspunsul final. Sunt <strong>rar întâlnite</strong> direct în dezvoltarea web de zi cu zi (le gestionează browserul/serverul automat).</p>
                <p><strong>Exemple comune:</strong></p>
                <ul>
                    <li><code>100 Continue</code> — Clientul poate continua să trimită corpul cererii.</li>
                    <li><code>102 Processing</code> — Serverul a primit cererea și încă o procesează.</li>
                </ul>
            `
        },
        "2xx": {
            badge: "2xx • Success",
            title: "Cerere procesată cu succes",
            html: `
                <p><strong>Când apar:</strong> De fiecare dată când cererea a fost primită, înțeleasă și executată corect. Sunt <strong>cele mai întâlnite</strong> coduri în aplicațiile funcționale.</p>
                <p><strong>Exemple comune:</strong></p>
                <ul>
                    <li><code>200 OK</code> — Răspuns standard de succes (ex: la <code>GET</code>).</li>
                    <li><code>201 Created</code> — O resursă nouă a fost creată cu succes (ex: la <code>POST</code>).</li>
                    <li><code>204 No Content</code> — Succes, dar serverul nu are conținut de returnat (ex: la <code>DELETE</code>).</li>
                    <li><code>206 Partial Content</code> — Serverul livrează doar o bucată din fișier (streaming video/download).</li>
                </ul>
            `
        },
        "3xx": {
            badge: "3xx • Redirection",
            title: "Redirecționare",
            html: `
                <p><strong>Când apar:</strong> Când resursa s-a mutat la alt URL sau când browserul poate folosi versiunea din cache. <strong>Foarte des întâlnite</strong> în navigare și SEO.</p>
                <p><strong>Exemple comune:</strong></p>
                <ul>
                    <li><code>301 Moved Permanently</code> — Pagina s-a mutat definitiv la o adresă nouă.</li>
                    <li><code>302 Found</code> — Redirecționare temporară către alt URL.</li>
                    <li><code>304 Not Modified</code> — Resursa nu s-a schimbat; browserul o încarcă din cache.</li>
                    <li><code>307 Temporary Redirect</code> — Redirect temporar care păstrează metoda HTTP (ex: <code>POST</code>).</li>
                </ul>
            `
        },
        "4xx": {
            badge: "4xx • Client Error",
            title: "Eroare din partea clientului",
            html: `
                <p><strong>Când apar:</strong> Când cererea trimisă de client este greșită, neautorizată sau cere ceva inexistent. <strong>Extrem de întâlnite</strong> în debugging și validări API.</p>
                <p><strong>Exemple comune:</strong></p>
                <ul>
                    <li><code>400 Bad Request</code> — Date invalide sau sintaxă greșită trimisă către server.</li>
                    <li><code>401 Unauthorized</code> — Lipsește autentificarea (token/login invalid).</li>
                    <li><code>403 Forbidden</code> — Ești autentificat, dar nu ai permisiuni pentru resursă.</li>
                    <li><code>404 Not Found</code> — Ruta sau resursa cerută nu există pe server. (ex: ai accesat o pagină inexistentă)</li>
                    <li><code>409 Conflict</code> — Conflict cu starea curentă a resursei (ex: email deja înregistrat).</li>
                </ul>
            `
        },
        "5xx": {
            badge: "5xx • Server Error",
            title: "Eroare din partea serverului",
            html: `
                <p><strong>Când apar:</strong> Cererea clientului a fost validă, dar serverul a crăpat sau nu a putut să o proceseze. <strong>Întâlnite</strong> la bug-uri în backend sau servere picate.</p>
                <p><strong>Exemple comune:</strong></p>
                <ul>
                    <li><code>500 Internal Server Error</code> — Eroare generică neprevăzută în codul serverului.</li>
                    <li><code>502 Bad Gateway</code> — Serverul a primit un răspuns invalid de la backend.</li>
                    <li><code>503 Service Unavailable</code> — Serverul este supraîncărcat sau în mentenanță.</li>
                    <li><code>504 Gateway Timeout</code> — Backend-ul a durat prea mult să răspundă.</li>
                </ul>
            `
        }
    };

    const modal = document.getElementById("info-modal");
    const modalBadge = document.getElementById("modal-badge");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const modalClose = document.getElementById("modal-close");

    function openModal(topicKey) {
        const data = topicDetails[topicKey];
        if (!data || !modal) return;

        modalBadge.textContent = data.badge;
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.html;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        // document.body.classList.add("modal-open");
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        // document.body.classList.remove("modal-open");
    }

    document.querySelectorAll(".info-trigger").forEach((btn) => {
        btn.addEventListener("click", () => {
            openModal(btn.getAttribute("data-topic"));
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});