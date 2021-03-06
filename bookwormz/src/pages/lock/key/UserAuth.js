import React, { useEffect, } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login, logout } from '../../../redux/actions/authActions'
import { Spinner } from '../../../components'


const UserAuth_proto = ({ login, logout, isAuthenticated, }) => {
    const history = useHistory()

    useEffect(() => {
        if (!isAuthenticated) {
            console.log('login')
            setTimeout(() => { login(history) }, 1000)
        } else {
            console.log('logout')
            setTimeout(() => { logout(history) }, 1000)
        }
    })

    return <Spinner />
}


UserAuth_proto.propTypes = {
    login: PropTypes.func,
    logout: PropTypes.func,
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    // logout: PropTypes.func.isRequired,
    isAuthenticated: state.auth.isAuthenticated,
})

const UserAuth = connect(mapStateToProps, { login, logout, })(UserAuth_proto)
export { UserAuth }
