const sortButtons = document.querySelectorAll(".project-sort");
const projectCards = document.querySelectorAll(".archive-card");

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.sort;

    sortButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    projectCards.forEach((card) => {
      const show = mode === "all" || card.dataset.lead === "true";
      card.classList.toggle("is-hidden", !show);
    });
  });
});
