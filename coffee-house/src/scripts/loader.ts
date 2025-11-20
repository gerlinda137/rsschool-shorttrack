export function insertLoader(container: HTMLElement): HTMLDivElement {
  const loader = document.createElement("div");
  loader.className = "loader";

  const spinner = document.createElement("div");
  spinner.className = "spinner";

  const text = document.createElement("p");
  text.textContent = "Loading products...";

  loader.appendChild(spinner);
  loader.appendChild(text);

  container.appendChild(loader);
  return loader;
}
