import { useEffect, useState } from "react"
import styled from "styled-components"
import { IRecipe } from './interfaces/IRecipe';
import { Recipe } from './components/Recipe';
import {AiOutlineArrowUp} from 'react-icons/ai';


const SearchForm = styled.form`
display:flex;
flex-direction:column;
align-items:center;


`
const Input = styled.div`
display:flex;
flex-direction:column;
align-items:center;
input{
  font-family: 'New Tegomin', serif;
  min-width:90vw;
  border:none;
  border-bottom:1px solid #cc7338;
  padding-left:5px;

  @media(min-width:600px){
  min-width:300px;

}
  &::placeholder{
  font-family: 'New Tegomin', serif;
  opacity:0.2;
}
  &:focus, &:hover {
    outline:none;
    
   
  } 
}
@media (min-width:600px){
  flex-direction:row;
 align-items:flex-end;
}

button{
  font-weight:bold;
  font-family: 'New Tegomin', serif;
  width:200px;
  height:30px;
  border: 1px solid #cc7338;
  background-color:white;
  color:#cc7338;
  margin-left:3px;
  margin-top:20px;
  border-radius:3px;
  transition:all 0.3s ease-in-out;
  cursor: pointer;
  @media(min-width:600px){
    margin-top:0;
    width:100px;
  }
  &:hover{
    background-color:#cc7338;
    color:white;
    
  }
}

`
const Wrapper = styled.div`

  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  font-family: 'New Tegomin', serif;
  .backToTop{
    font-size:2rem;
    position:fixed;
    bottom:50px;
    right:20px;
    background-color:#cc7338;
    border-radius:50%;
    opacity:0.3;
    transition:0.3s;
    &:hover{
      opacity:1;
    }
  }

`
const RecipesListWrapper = styled.div`

display:flex;
flex-direction:column;
align-items:center;

@media (min-width:600px){
  flex-direction:row;
  flex-wrap:wrap;
  align-items:baseline;
  justify-content:center;
}

`


export const App: React.FC = () => {
  const [recipesFound, setRecipesFound] = useState<IRecipe[]>([])
  const [recipesSearch, setRecipesSearch] = useState('')

  const searchForRecipes = async (query: string): Promise<IRecipe[]> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`)
    return (await result.json()).results;
  }

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipesSearch(input.value)
    input.value = '';
  }


  useEffect(() => {

    (async () => {
      const query = encodeURIComponent(recipesSearch);
      if (query) {
        const response = await searchForRecipes(query);
        setRecipesFound(response);
      }
    })();
  }, [recipesSearch])

  return (
    <Wrapper>
      <AiOutlineArrowUp className='backToTop' onClick={() => window.scrollTo({top:0})}/>
      <h1>Recipes Search</h1>
      <SearchForm onSubmit={event => search(event)}>
        <Input>
          <input id='searchText' type="text" placeholder='type ingredient...' />
          <button >Search</button>
        </Input>
      </SearchForm>

      {recipesSearch && <p>Results for {recipesSearch}...</p>}

      <RecipesListWrapper>
        {recipesFound.length === 0 ? <h3>Enter ingredients to search.</h3> : recipesFound.map(recipe => (

          <Recipe key={recipe.href} recipe={recipe} />

        ))}
      </RecipesListWrapper>

    </Wrapper>
  )
}

