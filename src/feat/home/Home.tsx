import styles from "./Home.module.css"
import Card from "./Card.tsx";
import useHttp from "../../use-http.ts";
import {useCallback, useEffect, useState} from "react";
import ApiError from "../../components/ApiError.tsx";
import {BACKEND_URL} from "../../util/registry.ts";

type HomePropsType = {
	onToDetail: (recipeId: number) => void
}

type RecipeDetailType = {
	id: number,
	title: string,
	image_url: string
}

type RecipeListType = RecipeDetailType[];

function Home(props: HomePropsType) {
	const {isLoading, error, sendRequest} = useHttp();
	const [recipeList, setRecipeList] = useState<RecipeListType>([]);

	const fetchRecipe = useCallback(() => {
		void sendRequest(
			{
				url: `${BACKEND_URL}/recipes`,
				method: 'GET'
			},
			(data) => {
				const result = data as RecipeListType;
				setRecipeList(result);
			}
		);
	}, [sendRequest])

	useEffect(() => {
		fetchRecipe()
	}, [fetchRecipe]);


	return (
		<>
			<h1 style={{margin: '0 0 1rem 0', textAlign: 'center'}}>Cooking Recipes</h1>
			<div className={styles.container}>
				{recipeList.map(recipeDetail => <Card key={recipeDetail.id} recipeDetail={recipeDetail} onClick={() => {props.onToDetail(recipeDetail.id)}} />)}
			</div>
			<ApiError isLoading={isLoading} error={error} onRetry={fetchRecipe} />
		</>
	);
}

export default Home;

// const recipeList = [
// 	{
// 		"id": 1,
// 		"title": "Spaghetti Bolognese",
// 		"short_description": "Classic Italian pasta dish with a rich meat sauce.",
// 		"ingredients": [
// 			"250g spaghetti",
// 			"400g ground beef",
// 			"1 onion, chopped",
// 			"2 cloves of garlic, minced",
// 			"400g canned diced tomatoes",
// 			"1 tablespoon tomato paste",
// 			"1 teaspoon dried oregano",
// 			"1 teaspoon dried basil",
// 			"Salt and pepper to taste",
// 			"Grated Parmesan cheese, for serving"
// 		],
// 		"instruction": [
// 			"Cook spaghetti according to package instructions.",
// 			"In a large skillet, brown the ground beef over medium heat. Add the onion and garlic, and cook until softened.",
// 			"Stir in the diced tomatoes, tomato paste, oregano, basil, salt, and pepper. Simmer for 15-20 minutes.",
// 			"Serve the sauce over cooked spaghetti and sprinkle with Parmesan cheese."
// 		],
// 		"image_url": "https://picsum.photos/seed/1/300/300"
// 	},
// 	{
// 		"id": 2,
// 		"title": "Chicken Stir-Fry",
// 		"short_description": "Quick and flavorful stir-fry with tender chicken and colorful vegetables.",
// 		"ingredients": [
// 			"2 chicken breasts, sliced",
// 			"2 tablespoons soy sauce",
// 			"1 tablespoon cornstarch",
// 			"1 tablespoon vegetable oil",
// 			"1 red bell pepper, sliced",
// 			"1 yellow bell pepper, sliced",
// 			"1 small onion, sliced",
// 			"2 cloves of garlic, minced",
// 			"1 teaspoon grated ginger",
// 			"1/4 cup chicken broth",
// 			"1 tablespoon oyster sauce",
// 			"1 teaspoon sesame oil",
// 			"2 green onions, sliced",
// 			"Cooked rice, for serving"
// 		],
// 		"instruction": [
// 			"In a bowl, combine the sliced chicken, soy sauce, and cornstarch. Mix well and set aside.",
// 			"Heat the vegetable oil in a large skillet or wok over high heat. Add the chicken and stir-fry until cooked through. Remove from the skillet and set aside.",
// 			"In the same skillet, add the bell peppers, onion, garlic, and ginger. Stir-fry for 2-3 minutes until the vegetables are crisp-tender.",
// 			"Return the chicken to the skillet. Add the chicken broth, oyster sauce, and sesame oil. Stir-fry for another 2 minutes.",
// 			"Sprinkle with sliced green onions and serve over cooked rice."
// 		],
// 		"image_url": "https://picsum.photos/seed/2/300/300"
// 	},
// 	{
// 		"id": 3,
// 		"title": "Caprese Salad",
// 		"short_description": "Simple and refreshing Italian salad with tomatoes, mozzarella, and basil.",
// 		"ingredients": [
// 			"3 ripe tomatoes, sliced",
// 			"8 ounces fresh mozzarella cheese, sliced",
// 			"1/4 cup fresh basil leaves",
// 			"2 tablespoons extra virgin olive oil",
// 			"1 tablespoon balsamic vinegar",
// 			"Salt and pepper to taste"
// 		],
// 		"instruction": [
// 			"Arrange the tomato slices and mozzarella slices on a serving platter.",
// 			"Tuck fresh basil leaves in between the tomato and mozzarella slices.",
// 			"Drizzle with olive oil and balsamic vinegar.",
// 			"Season with salt and pepper to taste."
// 		],
// 		"image_url": "https://picsum.photos/seed/3/300/300"
// 	},
// 	{
// 		"id": 4,
// 		"title": "Beef Tacos",
// 		"short_description": "Classic Mexican street food with seasoned beef, salsa, and toppings.",
// 		"ingredients": [
// 			"1 pound ground beef",
// 			"1 small onion, chopped",
// 			"2 cloves of garlic, minced",
// 			"1 tablespoon chili powder",
// 			"1 teaspoon ground cumin",
// 			"1/2 teaspoon paprika",
// 			"1/4 teaspoon cayenne pepper",
// 			"Salt and pepper to taste",
// 			"8 small flour tortillas",
// 			"1 cup salsa",
// 			"1 cup shredded lettuce",
// 			"1 cup diced tomatoes",
// 			"1/2 cup shredded cheese",
// 			"Sour cream and guacamole, for serving"
// 		],
// 		"instruction": [
// 			"In a large skillet, cook the ground beef, onion, and garlic over medium heat until the beef is browned. Drain any excess grease.",
// 			"Stir in the chili powder, cumin, paprika, cayenne pepper, salt, and pepper. Cook for another 2 minutes.",
// 			"Warm the flour tortillas in a dry skillet or microwave.",
// 			"Fill each tortilla with the seasoned beef, salsa, lettuce, tomatoes, shredded cheese, sour cream, and guacamole.",
// 			"Fold the tortillas in half and serve immediately."
// 		],
// 		"image_url": "https://picsum.photos/seed/4/300/300"
// 	},
// 	{
// 		"id": 5,
// 		"title": "Blueberry Pancakes",
// 		"short_description": "Fluffy pancakes filled with juicy blueberries.",
// 		"ingredients": [
// 			"1 cup all-purpose flour",
// 			"2 tablespoons sugar",
// 			"1 teaspoon baking powder",
// 			"1/2 teaspoon baking soda",
// 			"1/4 teaspoon salt",
// 			"1 cup buttermilk",
// 			"1 large egg",
// 			"2 tablespoons unsalted butter, melted",
// 			"1 cup fresh blueberries",
// 			"Maple syrup, for serving"
// 		],
// 		"instruction": [
// 			"In a mixing bowl, whisk together the flour, sugar, baking powder, baking soda, and salt.",
// 			"In a separate bowl, whisk together the buttermilk, egg, and melted butter.",
// 			"Pour the wet ingredients into the dry ingredients and stir until just combined.",
// 			"Gently fold in the blueberries.",
// 			"Heat a non-stick skillet or griddle over medium heat. Pour 1/4 cup of batter onto the skillet for each pancake.",
// 			"Cook until bubbles form on the surface, then flip and cook until golden brown.",
// 			"Serve the pancakes with maple syrup."
// 		],
// 		"image_url": "https://picsum.photos/seed/5/300/300"
// 	},
// 	{
// 		"id": 6,
// 		"title": "Mediterranean Quinoa Salad",
// 		"short_description": "A refreshing and healthy salad with quinoa, vegetables, and feta cheese.",
// 		"ingredients": [
// 			"1 cup quinoa",
// 			"2 cups water",
// 			"1 cucumber, diced",
// 			"1 bell pepper, diced",
// 			"1/2 red onion, thinly sliced",
// 			"1/2 cup cherry tomatoes, halved",
// 			"1/4 cup Kalamata olives, pitted and halved",
// 			"1/4 cup crumbled feta cheese",
// 			"2 tablespoons fresh lemon juice",
// 			"2 tablespoons extra virgin olive oil",
// 			"1 tablespoon chopped fresh parsley",
// 			"Salt and pepper to taste"
// 		],
// 		"instruction": [
// 			"Rinse the quinoa under cold water.",
// 			"In a saucepan, bring 2 cups of water to a boil. Add the quinoa and simmer for about 15-20 minutes or until the water is absorbed. Fluff with a fork and let it cool.",
// 			"In a large bowl, combine the cooked quinoa, cucumber, bell pepper, red onion, cherry tomatoes, Kalamata olives, and feta cheese.",
// 			"In a small bowl, whisk together the lemon juice, olive oil, parsley, salt, and pepper. Pour the dressing over the quinoa salad and toss to combine.",
// 			"Serve chilled and enjoy!"
// 		],
// 		"image_url": "https://picsum.photos/seed/6/300/300"
// 	},
// 	{
// 		"id": 7,
// 		"title": "Beef and Broccoli Stir-Fry",
// 		"short_description": "A quick and flavorful stir-fry with tender beef and crisp broccoli.",
// 		"ingredients": [
// 			"1 pound flank steak, sliced",
// 			"1/4 cup soy sauce",
// 			"2 tablespoons oyster sauce",
// 			"1 tablespoon cornstarch",
// 			"1 tablespoon vegetable oil",
// 			"2 cloves of garlic, minced",
// 			"1 teaspoon grated ginger",
// 			"2 cups broccoli florets",
// 			"1/4 cup beef broth",
// 			"1 tablespoon hoisin sauce",
// 			"1 teaspoon sesame oil",
// 			"Cooked rice, for serving"
// 		],
// 		"instruction": [
// 			"In a bowl, combine the sliced flank steak, soy sauce, oyster sauce, and cornstarch. Mix well and set aside.",
// 			"Heat the vegetable oil in a large skillet or wok over high heat. Add the minced garlic and grated ginger, and stir-fry for about 30 seconds.",
// 			"Add the marinated beef to the skillet and stir-fry until cooked to your desired level of doneness. Remove from the skillet and set aside.",
// 			"In the same skillet, add the broccoli florets and beef broth. Cover and cook for about 2-3 minutes or until the broccoli is crisp-tender.",
// 			"Return the beef to the skillet. Stir in the hoisin sauce and sesame oil. Cook for another minute, stirring to coat the beef and broccoli evenly.",
// 			"Serve the beef and broccoli stir-fry over cooked rice."
// 		],
// 		"image_url": "https://picsum.photos/seed/7/300/300"
// 	},
// 	{
// 		"id": 8,
// 		"title": "Caprese Stuffed Chicken",
// 		"short_description": "Tender chicken breasts stuffed with mozzarella, tomato, and basil, baked to perfection.",
// 		"ingredients": [
// 			"2 boneless, skinless chicken breasts",
// 			"4 slices mozzarella cheese",
// 			"4 slices tomato",
// 			"4 fresh basil leaves",
// 			"2 tablespoons olive oil",
// 			"Salt and pepper to taste",
// 			"1/4 cup balsamic glaze"
// 		],
// 		"instruction": [
// 			"Preheat the oven to 375°F (190°C).",
// 			"Slice each chicken breast horizontally to create a pocket without cutting all the way through.",
// 			"Stuff each chicken breast with 2 slices of mozzarella, 2 slices of tomato, and 2 basil leaves.",
// 			"Brush the chicken breasts with olive oil and season with salt and pepper.",
// 			"Place the stuffed chicken breasts on a baking sheet and bake for 25-30 minutes or until the chicken is cooked through.",
// 			"Drizzle the chicken with balsamic glaze before serving."
// 		],
// 		"image_url": "https://picsum.photos/seed/8/300/300"
// 	},
// 	{
// 		"id": 9,
// 		"title": "Shrimp Scampi",
// 		"short_description": "Delicious shrimp sautéed in garlic butter and served over pasta.",
// 		"ingredients": [
// 			"8 ounces linguine",
// 			"1 pound shrimp, peeled and deveined",
// 			"4 tablespoons unsalted butter",
// 			"4 cloves of garlic, minced",
// 			"1/4 teaspoon red pepper flakes",
// 			"1/4 cup white wine",
// 			"2 tablespoons fresh lemon juice",
// 			"Salt and pepper to taste",
// 			"2 tablespoons chopped fresh parsley",
// 			"Grated Parmesan cheese, for serving"
// 		],
// 		"instruction": [
// 			"Cook the linguine according to package instructions. Drain and set aside.",
// 			"In a large skillet, melt the butter over medium heat. Add the minced garlic and red pepper flakes. Sauté for about 1 minute until fragrant.",
// 			"Add the shrimp to the skillet and cook until they turn pink, about 2-3 minutes per side.",
// 			"Pour in the white wine and lemon juice. Season with salt and pepper to taste. Simmer for another 2-3 minutes.",
// 			"Add the cooked linguine and chopped parsley to the skillet. Toss everything together to coat the pasta and shrimp with the garlic butter sauce.",
// 			"Serve the shrimp scampi with grated Parmesan cheese on top."
// 		],
// 		"image_url": "https://picsum.photos/seed/9/300/300"
// 	},
// 	{
// 		"id": 10,
// 		"title": "Chocolate Chip Cookies",
// 		"short_description": "Classic homemade cookies filled with chocolate chips.",
// 		"ingredients": [
// 			"1 cup unsalted butter, softened",
// 			"1 cup granulated sugar",
// 			"1 cup brown sugar",
// 			"2 large eggs",
// 			"1 teaspoon vanilla extract",
// 			"3 cups all-purpose flour",
// 			"1 teaspoon baking soda",
// 			"1/2 teaspoon salt",
// 			"2 cups chocolate chips"
// 		],
// 		"instruction": [
// 			"Preheat the oven to 375°F (190°C).",
// 			"In a large bowl, cream together the softened butter, granulated sugar, and brown sugar until light and fluffy.",
// 			"Beat in the eggs one at a time, then stir in the vanilla extract.",
// 			"In a separate bowl, combine the flour, baking soda, and salt. Gradually add the dry ingredients to the butter mixture and mix well.",
// 			"Fold in the chocolate chips.",
// 			"Drop rounded tablespoons of dough onto ungreased baking sheets.",
// 			"Bake for 9-11 minutes or until golden brown.",
// 			"Allow the cookies tocool on the baking sheets for 5 minutes, then transfer them to wire racks to cool completely."
// 		],
// 		"image_url": "https://picsum.photos/seed/10/300/300"
// 	}
// ];