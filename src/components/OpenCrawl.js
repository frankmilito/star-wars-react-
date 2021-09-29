import React from 'react'
import Marquee from 'react-fast-marquee'
import classes from './styles/home.module.css'

function OpenCrawl(props) {
  const { title, opening_crawl } = props.film

  return (
    <div className="text-center">
      <h3>{title}</h3>
      <Marquee className={classes.marquee} gradient={false} speed="100">
        {' '}
        <h3>{opening_crawl}</h3>
      </Marquee>
    </div>
  )
}

export default OpenCrawl
