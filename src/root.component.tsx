import { useEffect, useState } from "react";
import * as singleSpa from "single-spa";
import { api, state, routes } from "@Chef/utility";
import { Carousel } from "./components/Carousel";
import profilePic from "../assets/profile_pic_128_128.jpg"

export default function Root(props) {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(undefined)

  useEffect(() => {
    api.recipes.getRandom(1)
      .then(({ recipes }) => setSelectedRecipe(recipes[0]))
      .catch((error) => console.error(error))

    api.news.everything('food')
      .then(news => console.log('news', news))
      .catch(error => console.error(error))
  }, [])

  const onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    state.next({ recipe: selectedRecipe });
    singleSpa.navigateToUrl(routes.RECIPE.replace(":id", selectedRecipe.id));
  }

  return (
    <>
      <div className="tile is-ancestor">
        <div className="tile is-vertical">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child box">
                <p className="title">A selected recipe for you</p>
                <p className="subtitle">{selectedRecipe?.title}</p>
                <a onClick={onClick}>
                  <figure className="image is-5by4">
                    <img src={selectedRecipe?.image} alt={selectedRecipe?.title} />
                  </figure>
                </a>
              </article>
              <article className="tile is-child box">
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
            <div className="tile is-parent">
              <article className="tile is-child box">
                <div className="content">
                  <p className="title">Tall column</p>
                  <p className="subtitle">With even more content</p>
                  <div className="content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.</p>
                    <p>Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.</p>
                    <p>Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero. Quisque non semper leo.</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      {/* <Carousel /> */}
    </>
  )
}
