import styled from 'styled-components';
import { IRecipe } from '../interfaces/IRecipe';
import {GiCookingPot} from 'react-icons/gi'


interface Props {
    recipe: IRecipe;
}

const RecipeWrapper = styled.div`
    border:none;
    border-radius:5px;
    margin:10px;
    width:99%;
    
    padding:10px;
    overflow:hidden;
 
    display:flex;
    flex-direction:column;
    box-shadow: 1px 1px 10px -5px #000000;
    transition:all .3s ease-in-out;
    @media (min-width:600px){
        width:300px;
        height:600px;
    }
    &:hover{
        scrollbar-color: #cc7338 #cc733881 ;
        overflow-y:auto;
        box-shadow: 1px 1px 10px -4px #000000;
        @media (min-width:600px){
            transform:scale(1.03);

        }
        
    }
   
    img{
        width:100%;
        margin:0;
    }
    h3{
        min-width:100%;
        margin:0;
        padding:50px 0;
        
        text-align:center;
    }
    a{
        font-size:1.5rem;
        display:flex;
        align-items:center;
        justify-content:center;
        text-decoration:none;
        color:#cc7338;
      .icon{
        font-size:2rem;
      }
      margin-top:10px;
    }

    ul{
       
        display:flex;
        flex-wrap:wrap;
        list-style-type:none;
        margin:0;
        
        padding:0;
        padding-bottom:10px;
        li{
            display:flex;
            justify-self:center;
            width:fit-content;
            padding:10px;
            color:white;
            border-radius:10px;
            margin:1px;
            background-color:#cc7338;

        }
    }


`

export const Recipe: React.FC<Props> = ({ recipe }) => {
    const { href, title, thumbnail, ingredients } = recipe;
    const listOfIngredients: string[] = ingredients.split(',');
    return (
        <RecipeWrapper data-simplebar>
            <h3>{title}</h3>
            <img src={thumbnail || 'http://localhost:3000/placeholder.jpg'} alt="" width={100} />
            <a href={`${href}`} target='_blank' rel="noreferrer">Go to Recipe <GiCookingPot className='icon'/></a>
            <h4> Ingredients used:</h4>
            <ul>
                {listOfIngredients.length && listOfIngredients.map(ingredient => (
                    <li>{ingredient}</li>
                ))}
            </ul>

        </RecipeWrapper>
    )
}
