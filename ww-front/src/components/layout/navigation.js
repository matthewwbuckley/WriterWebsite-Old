import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/index.css';
import { logoutUser } from '../../apiActions'
import { getAllPieces } from '../../apiActions'

export class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      sort: 'recent'
    } 
    this.setSort = this.setSort.bind(this);
  }

  async componentWillMount(){
    await getAllPieces(this)
  }

  setSort(sort){
    this.setState({sort: sort})
  }

  render(){
    let pieces = '';
 
    if(this.state.pieces){
      let sortedPieces = this.state.pieces;
      if(this.state.sort === 'recent'){
        sortedPieces.sort((a,b) => recentSort(a,b))
      } else if(this.state.sort === 'week'){
        sortedPieces.sort((a,b) => ratingWeekSort(a,b))
      } else if(this.state.sort === 'month'){
        sortedPieces.sort((a,b) => ratingMonthSort(a,b))
      } else if(this.state.sort === 'year'){
        sortedPieces.sort((a,b) => ratingYearSort(a,b))
      }
      console.log(sortedPieces);

      pieces = sortedPieces.map( (piece) => {
        const pieceURL = '/piece/' + piece._id;
        return(
          <div>
            <Link to={pieceURL}>
              {piece.title}
            </Link>
          </div>
        )
      })
    }

    return(
      <div className='navigation'>
        <Link to='/'>Fancy Home Link</Link>
        <UserNav {...this.props} />
        <div  className='pieces-list'>
          <div className='pieces-list-header'> 
            Pieces
            <i onClick={()=>{this.setSort('recent')}} class="fa fa-clock-o" aria-hidden="true"></i>
            <i onClick={()=>{this.setSort('week')}}  class="fa fa-heart" aria-hidden="true"><span className='icon-inset'>W</span></i>
            <i onClick={()=>{this.setSort('month')}}  class="fa fa-heart" aria-hidden="true"><span className='icon-inset'>M</span></i>
            <i onClick={()=>{this.setSort('year')}}  class="fa fa-heart" aria-hidden="true"><span className='icon-inset'>Y</span></i>

          </div>
          {pieces}
        </div>
      </div>
    )
  }
  
}

const UserNavigation = ({props, username, userId}) => {
  return (
    <div>
      <div>
        Hello {username}. <button onClick={logoutUser}>Logout?</button>
      </div>
      <div>
      <Link  to='/write'>Publish a Piece</Link>
      </div>
    </div>
  )
}

const SignIn = () => {
  return <Link to='/registration'>Sign-up or Register</Link>
}

const UserNav = (props) => {
  if(props.app.state && props.app.state.user){
    let username = props.app.state.user.username;
    let userId = props.app.state.user.userId;
    return <UserNavigation {...props} username={username} userId={userId} />
  } else {
    return <SignIn/>
  }
}

const recentSort = function recentSort(a, b){
  if(a.datePublished && b.datePublished){
    const aDate = new Date(a.datePublished);
    const bDate = new Date(b.datePublished);
    return( bDate - aDate )
  }
}

const ratingWeekSort = function ratingWeekSort(a, b){
  if(a.ratings.averages.week && b.ratings.averages.week){
    return( b.ratings.averages.week - a.ratings.averages.week )
  }
}

const ratingMonthSort = function ratingMonthSort(a, b){
  if(a.ratings.averages.month && b.ratings.averages.month){
    return( b.ratings.averages.month - a.ratings.averages.month )
  }
}

const ratingYearSort = function ratingYearSort(a, b){
  if(a.ratings.averages.year && b.ratings.averages.year){
    return( b.ratings.averages.year - a.ratings.averages.year )
  }
}

export default Navigation;