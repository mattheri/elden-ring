/**
 * API Documentation: https://docs.eldenring.fanapis.com/docs/
 * Fetch API Documentation: https://developer.mozilla.org/en-US/docs/Web/API/fetch
 */

const BASE_URL = "https://eldenring.fanapis.com/api";
const BOSSES = "bosses";
const ITEMS = "items";

const card = ({ name, image, description }) => {
	return `
		<div class="card" style="width: 18rem;">
			<img src="${image}" class="card-img-top" alt="${name}" loading="lazy">
			<div class="card-body">
				<h5 class="card-title">${name}</h5>
				<p class="card-text">${description}</p>
				<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
		</div>
	`;
}

const undisableLink = (selector) => {
	const link = document.querySelector(`.nav-link.${selector}`);
	link.classList.remove("disabled");
}

const removeLoading = (selector) => {
	const loading = document.querySelector(`#${selector} > .loading`);
	loading.remove();
}

/**
 * Cette fonction prends en argument un array.
 * Elle doit itérer sur cet array, et pour chaque élément du tableau,
 * elle doit appeler la fonction card.
 * Elle attachera ensuite les éléments créés au bon élément.
 */
const cardBuilder = (data = [], card, containerSelector) => {
	// Pour chaque élément du tableau, on crée une carte. Toutes ces cartes nouvellement créées
	// doivent être retournées dans un nouveau tableau.
	const cards = data.map((resultanteDeLapi) => card(resultanteDeLapi));

	// On query le container.
	const container = document.querySelector(`#${containerSelector} > .row`);

	/**
	 * On ajoute les cartes au container en itérant sur le tableau cards.
	 * On peut utiliser la syntaxe suivante pour ajouter du HTML dynamiquement.
	 * container.innerHTML += card;
	 */

	cards.map((card) => container.innerHTML += card);

	// Ensuite, il s'assure que le lien n'est plus "disabled"
	undisableLink(containerSelector);

	// Et il s'assure que le loading animation est désactivé.
	removeLoading(containerSelector);
}

// Fonction pour fetcher les bosses
const fetchBosses = async () => {
	// J'essaye d'aller chercher les boss
	try {
		// Aller chercher les boss avec l'API et j'attends la réponse
		const response = await fetch(`${BASE_URL}/${BOSSES}`);
		// Si la réponse n'est pas ok, je lance une erreur
		if (!response.ok) throw new Error(response.statusText);
		// Si la réponse est ok, j'attends le json
		const json = await response.json();
		// J'utilise le data de la réponse pour créer les cartes
		cardBuilder(json.data, card, "bosses");
	}
	catch (error) {
		// Si ça ne fonctionne pas, log une erreur
		console.error(error);
	}

}

// Fonction pour fetcher les items
const fetchItems = async () => {
	try {
		const response = await fetch(`${BASE_URL}/${ITEMS}`);
		if (!response.ok) throw new Error(response.statusText);
		const json = await response.json();

		cardBuilder(json.data, card, "items");
	} catch (error) {
		console.error(error);
	}
}

fetchBosses();
fetchItems();