import React, { Component } from 'react';
import CSSModules from 'react-css-modules'
import autobind from 'autobind-decorator'
import _ from 'lodash'
import { Link } from 'react-router'
import Slider from 'react-slick'
import cx from 'classnames'
import { observer } from 'mobx-react'
import Data from 'data'
import Img from 'screens/App/shared/Img'
import styles from './Profile.scss'
import MatchStore from 'stores/MatchStore'

@observer
@CSSModules(styles)
export default class Profile extends Component {
  constructor(props) {
    super(props)
  }

  @autobind
  handleUnmatch() {
    if (confirm('Are you sure?')) {
      this.props.match.unmatch()
    }
  }

  render() {
    const { user, match } = this.props

    const sliderSettings = {
      infinite: false,
      dots: true,
    }

    return (
      <div styleName="wrapper">
        <div styleName="images">
          <Slider {...sliderSettings}>
            {_.map(user.photosUrls, url => (
              <div key={_.uniqueId()}><img src={url} alt="img" /></div>
            ))}
          </Slider>
        </div>
        <Link to={`/users/${user._id}`} styleName="name">
          {user.name}, {user.age}
        </Link>
        <div styleName="bio">
          {user.bio}
        </div>
        {!match.isBlocked &&
          <div styleName="unmatch">
            <a onClick={this.handleUnmatch}>
              Unmatch
            </a>
          </div>}
      </div>
    );
  }
}
