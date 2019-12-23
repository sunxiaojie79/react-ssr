import React from 'react'
import styles from './About.css'
import withStyle from '../withStyle'

function About(props) {
  return <div>
      <h1 className={styles.title}>about page</h1>
    </div>
}

export default withStyle(About, styles)