import React, { Component } from 'react'
import Sound from '../sound/sound'

export default class about extends Component {
  render() {
    return (
        <div className="bg-about">
            <Sound song={"Star_Wars_original_opening_crawl_1977.mp3"} />
            <div className="intro">
                A long time ago, in a galaxy far,<br /> far away....
            </div>

            <div id="board">
                <div id="content">
                    <p id="title">Lending-app</p>
                    <p id="subtitle">THE CODER'S MENACE</p>
                    <p>The turmoil has engulfed the Developing Republic. The competition of commercial frameworks to peripheral navigation systems is in dispute. Hoping to solve the problem with a loan application to small and medium entrepreneurs, the greedy Federation of LendingFront has decided to open a call to list new coders in their ranks.</p><br />
                    <p>While the Congress of the Republic debates incessantly whether or not to tax the family basket, Lord Commander Milton Lenis has sent a Jedi Knight (still a Padawan), hoping to return justice in the galaxy, training with this delivery , using technologies like ReactJS, Python and eager to support progress for future entrepreneurs ...</p><br />
                    <p>This app was developed by @javilaortiz with all my hearth</p><br />
                </div>
            </div>
        </div>
    )
  }
}
