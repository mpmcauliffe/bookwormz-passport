import React, { useEffect, } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { motion, } from 'framer-motion'
import { Link, useHistory, useParams, } from 'react-router-dom'
import { ClubImg, HeaderLink, HeaderSection, MainContent, 
    Spinner, } from '../../components'
import { pageTransition, pageVariants, } from '../../pages/zAnimation'
import { getClub, } from '../../redux/actions/clubActions'


export const Club_proto = ({ getClub, currentClub, }) => {
    const history                       = useHistory()
    let { clubId }                      = useParams()
    
    console.log(currentClub)
    useEffect(() => {
        if (!currentClub) { getClub(clubId, history) }
    
    // eslint-disable-next-line
    }, [getClub, currentClub, clubId])


    if (!currentClub || Object.keys(currentClub).length === 0) { return <Spinner /> }
    
    return (
        <motion.div
            exit={pageVariants.out} 
            animate={pageVariants.in} 
            initial={pageVariants.ini} 
            variants={pageVariants} 
            transition={pageTransition}>
                <MainContent>
                    <HeaderSection>
                        <h4>{currentClub.clubName}</h4>
                        <HeaderLink to='/clubs'>
                            <i className='fas fa-caret-left fa-2x' />
                            <span>&nbsp;&nbsp;&nbsp; Return to Clubs</span>
                        </HeaderLink>
                    </HeaderSection>
                    <br /><br /><br /><br /><br /><br />
                    <ClubImg 
                        src={require(`./img/${currentClub.bookNumber}.png`).default} />

                    <p>{currentClub.description}</p>

                </MainContent>
        </motion.div>
    )
}


Club_proto.propTypes = {
    getClub: PropTypes.func.isRequired,
    currentClub: PropTypes.object,
}

const mapStateToProps = state => ({
    currentClub: state.clubs.currentClub
})

const Club = connect(mapStateToProps, { getClub, })(Club_proto)
export { Club }
