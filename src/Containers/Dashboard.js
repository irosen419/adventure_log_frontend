import React from 'react'
import MapContainer from './MapContainer'
import TripForm from '../Components/TripForm'
import TripContainer from './TripContainer'


class Dashboard extends React.Component {

    state = {
        tripsArray: [],
        followingsArray: []
    }

    componentDidMount() {
        let userId = window.location.pathname.split('/')[2]

        let options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json',
                'Accepts': 'application/json',
            }
        }

        this.fetchFollowings()

        fetch(`http://localhost:3000/api/v1/users/${userId}/trips`, options)
            .then(resp => resp.json())
            .then(trips => this.setState(() => ({ tripsArray: trips })))
    }

    tripSubmitHandler = (trip) => {
        let tripObj = {
            user_id: this.props.user.id,
            destination: trip.destination,
            continent: trip.continent,
            travel_date: trip.travel_date
        }

        let options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json',
                'Accepts': 'application/json',
            },
            body: JSON.stringify({ trip: tripObj })
        }

        fetch('http://localhost:3000/api/v1/trips', options)
            .then(resp => resp.json())
            .then(trip => this.setState((previousState) => ({ tripsArray: [...previousState.tripsArray, trip.trip] })))
    }

    followHandler = () => {
        const userId = this.props.user.id
        const followingId = window.location.pathname.split('/')[2]

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json',
                'Accepts': 'application/json',
            },
            body: JSON.stringify({ friendship: { follower_id: userId, following_id: followingId } })
        }

        fetch(`http://localhost:3000/api/v1/users/${userId}/friendship`, options)

    }

    fetchFollowings = () => {
        const userId = window.location.pathname.split('/')[2]
        fetch(`http://localhost:3000/api/v1/users/${userId}/followings`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        })
            .then(resp => resp.json())
            .then(users => {
                let array = users.followings.map(user => <a href={`/dashboard/${user.id}`}><p onClick={() => {
                    localStorage.setItem("userId", this.props.user.id)
                    localStorage.setItem("username", user.username)
                }}>{user.username}</p></a>)
                this.setState(() => ({ followingsArray: array }))
            })
    }

    render() {
        return (
            <div id="dashboard">
                {this.props.user.id.toString() != window.location.pathname.split('/')[2] ? <button onClick={this.followHandler}>Follow</button> : null}
                <div id='followings'>
                    <h2>{localStorage.getItem("username")} is following</h2>
                    {this.state.followingsArray}
                </div>
                {this.state.tripsArray ? <MapContainer user={this.props.user} trips={this.state.tripsArray} /> : null}
                <TripForm tripSubmitHandler={this.tripSubmitHandler} user={this.props.user} />
                {this.state.tripsArray.length > 0 ? <TripContainer user={this.props.user} trips={this.state.tripsArray} /> : null}
            </div>
        )
    }
}

export default Dashboard