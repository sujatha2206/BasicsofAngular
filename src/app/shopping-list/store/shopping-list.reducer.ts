import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { act } from '@ngrx/effects';

export interface State{
  ingredients:Ingredient[],
  editedIngredient:Ingredient,
  editedIngredientIndex:number
}
export interface AppState{
  shoppingList:State
}
const initialState:State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient:null,
  editedIngredientIndex:-1
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
      case ShoppingListActions.UPDATE_INGREDIENT:
        //const editedIngredient=state.editedIngredient;
       // const index = state.editedIngredientIndex;
        const ingredient = state.ingredients[state.editedIngredientIndex];
        const updatedIngredient={
          ...ingredient,
          ...action.payload.ingredient
        };
        const updatedIngredients=[...state.ingredients];
        updatedIngredients[state.editedIngredientIndex]=updatedIngredient;
      return{
        ...state,
        ingredients:[...updatedIngredients],
        editedIngredientIndex:-1,
        editedIngredient:null
      };
      case ShoppingListActions.DELETE_INGREDIENT:
        //const delingredient = state.ingredients[action.payload.index];
        const updateIngredients=[...state.ingredients];
        updateIngredients.splice(state.editedIngredientIndex,1);
        return{
          ...state,
          ingredients:[...updateIngredients],
          editedIngredient:null,
          editedIngredientIndex:-1
        };
        case ShoppingListActions.START_EDIT:
        return{
          ...state,
          editedIngredientIndex:action.payload,
          editedIngredient:{...state.ingredients[action.payload]}
        };
        case ShoppingListActions.STOP_EDIT:
          return{
            ...state,
            editedIngredientIndex:-1,
            editedIngredient:null
          };

    default:
      return state;
  }
}
