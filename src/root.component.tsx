import { useEffect, useState } from "react";
import * as singleSpa from "single-spa";
import { api, state, routes } from "@Chef/utility";
import { Carousel } from "./components/Carousel";
import profilePic from "../assets/profile_pic_128_128.jpg"
import { getLocalStorageItem, setLocalStorageItem } from "./utils/localStorage";

interface Article {
  author: string
  content: string
  description: string
  publishedAt: string
  source?: {
    id?: number
    name?: string
  }
  title: string
  url: string
  urlToImage: string
}


export default function Root(props) {
  const [recipe, setRecipe] = useState<any>(getLocalStorageItem('recipe'))
  const [articles, setArticles] = useState<Article[]>(getLocalStorageItem('articles') ?? [])

  useEffect(() => {
    const today = new Date();
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);

    const remainingTime = today.getTime() - new Date().getTime()

    if (!recipe) {
      api.recipes.getRandom(1)
        .then(({ recipes }) => {
          const selectedRecipe = recipes[0]
          setRecipe(selectedRecipe)
          setLocalStorageItem('recipe', selectedRecipe, remainingTime)
        })
        .catch((error) => console.error(error))
    }

    if (!articles || !articles.length) {
      api.news.everything('food or culinary', 0, 5)
        .then((res) => {
          const selectedArticles = res.articles.filter((a) => !a.title.includes('[Removed]')).slice(0, 3)
          setArticles(selectedArticles)
          setLocalStorageItem('articles', JSON.stringify(selectedArticles), remainingTime)
        })
        .catch(error => console.error(error))
    }
  }, [])

  const onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    state.next({ recipe: recipe });
    singleSpa.navigateToUrl(routes.RECIPE.replace(":id", recipe.id));
  }

  const toDate = (dateString: string) => (new Date(Date.parse(dateString)))

  return (
    <>
      <div className="fixed-grid has-1-cols-mobile has-2-cols-tablet">
        <div className="grid">
          <div className="cell">
            <article className="box">
              <p className="title">A selected recipe for you</p>
              <p className="subtitle">{recipe?.title}</p>
              <a onClick={onClick}>
                <figure className="image is-5by4">
                  <img src={recipe?.image} alt={recipe?.title} />
                </figure>
              </a>
            </article>
          </div>

          <div className="cell is-row-span-2 is-flex is-flex-direction-column is-justify-content-space-between">
            {articles?.map((article, i) => (
              <article key={i} className="box">
                <div className="content">
                  <p className="title">{article.title}</p>
                  <p className="subtitle">
                    Author: {article.author}
                    <span className="is-pulled-right">
                      {article.publishedAt ? toDate(article.publishedAt).toLocaleDateString('en-US') : ''}
                    </span>
                    <br />
                    Source:
                    <a href={article.url} target="_blank">
                      {article.source?.name ?? article.url}
                    </a>
                  </p>
                  <div className="content">
                    {article.content.replace(/\[\++.*\]/g, "")}
                    <a href={article.url} target="_blank">read more</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="cell">
            <article className="box">
              <p className="title">About Chef</p>
              <p className="subtitle">A hub created by passion</p>
              <div className="content">
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-128x128">
                      <img src={profilePic} />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>Luiz Moura</strong> <a href="https://github.com/LuizFelipeM/" target="_blank"><small>@LuizFelipeM</small></a>
                        <br />
                        The chef was inspired by my own cooking passion experiencing new recipes.
                        It started as a side project just to learn new technologies and ended up as a hub to discover new recipes for me.
                        <br />
                        I hope it can help you too.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </article>
          </div>
        </div>
      </div>
      <Carousel />
    </>
  )
}
