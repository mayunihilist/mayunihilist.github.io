document.addEventListener("DOMContentLoaded", () => {
  const bookGrid = document.getElementById("book-grid");

  function createBookCard(book) {
    const card = document.createElement("article");
    card.className = "book-card";
    
    let badgeHtml = "";
    if (book.availability === "Unlimited") {
      badgeHtml = `<span class="icon-badge badge-ku">Unlimited</span>`;
    } else if (book.availability === "Prime") {
      badgeHtml = `<span class="icon-badge badge-pr">Prime</span>`;
    }

    const cleanTitle = book.title.replace(/（\d+）|巻.*|\(.*\)| 1/g, '').trim();

    card.innerHTML = `
      <div class="book-cover-container">
        <a href="${book.url}" target="_blank">
          <img src="${book.image}" class="book-cover" alt="${book.title}">
        </a>
      </div>
      <div class="book-info">
        <div class="title-author-row">
          <h2 class="book-title">${cleanTitle}</h2>
          <span class="book-author">${book.author}</span>
        </div>
        <div class="meta-row">
          ${badgeHtml}
          <span class="star-text">★${book.rating || 0}</span>
        </div>
        <div class="summary-container">
          <p class="summary-text">${book.summary}</p>
        </div>
      </div>
    `;
    return card;
  }

  async function init() {
    try {
      const res = await fetch("books.json", { cache: "no-store" });
      const data = await res.json();
      
      // ランダムシャッフル
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      
      bookGrid.innerHTML = "";
      data.forEach(book => bookGrid.appendChild(createBookCard(book)));
    } catch (err) {
      console.error("Data load failed:", err);
    }
  }
  init();
});