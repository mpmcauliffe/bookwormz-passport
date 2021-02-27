import axios from 'axios'
import { GET_MY_BOOKS, SEARCH_BOOKS, ADD_BOOK_TO_PROFILE, 
    REMOVE_BOOK_FROM_LIBRARY, BOOK_ERROR, MESSAGE, 
    SET_LOADING, } from '../types'
import M from 'materialize-css/dist/js/materialize.min.js'


const config = { headers: { 'Content-Type': 'application/json' } }

export const getBooks = () => async dispatch => {
    setLoading()

    try {
        const res = await axios.get(`/books/mybooks/`)
        console.log(res)
        if (res.status === 200) {
            dispatch({ 
                type: GET_MY_BOOKS, 
                payload: { books: res.data } 
            })
            return
        }
        dispatch({ type: BOOK_ERROR, payload: 'Cannot retieve your library at this time.' })
    } catch (e) {
        console.log(e)
        dispatch({ type: BOOK_ERROR, payload: 'Cannot retieve your library at this time.' })
    }
}

// SEARCH BOOKs from google API
export const searchBooks = (searchString) => async dispatch => {
    setLoading()

    const urlSearchString = searchString.replace(/ /g,"_")
    try {
        const res = await axios.get(`/books/booksearch/${urlSearchString}`)
        // console.log(res.data.items)
        if (typeof res.data.items === 'undefined') {
            dispatch({ type: BOOK_ERROR })
            M.toast({ html: `Please search for something else.`, classes: 'red accent-4 rounded', displayLength: 5000 })
            return
        }

        const bundle = {
            books: res.data.items,
            searchString,
        }

        dispatch({ type: SEARCH_BOOKS, payload: bundle })

    } catch (e) {
        let eOut = 'Something went wrong. Please try later.'
        const eMessage = e.message
        console.error(eMessage)

        const eCode = eMessage.match(/\d+/)
        if (eCode !== null) {
            if (eCode[0] === '401') {
                // eOut = 'Something went wrong. Please try logging in again.'
                window.location.replace('/')
                return
            }
        }
        dispatch({ type: BOOK_ERROR, payload: eOut, })     
    }
}

// Add book to profile
export const addBook = bookInfo => async dispatch => {    
    try {
        const res = await axios.post(`/books/addbook/`, bookInfo, config) 
        console.log(res)

        if (res.data.message === 'double') {
            dispatch({ 
                type: MESSAGE, 
                payload: { 
                    book: res.data, 
                    message: `${bookInfo.title} was previously added to your books.`, 
                    style: 'amber darken-4 rounded'
                } 
            })
            return
        }

        if (res.status === 200) {
            dispatch({ 
                type: ADD_BOOK_TO_PROFILE, 
                payload: { book: res.data, message: `${bookInfo.title} added to your books.` } 
            })
            return
        }
        dispatch({ type: BOOK_ERROR, payload: 'Request could not be completed.' })

    } catch (e) {
        console.log(e)
        dispatch({ type: BOOK_ERROR, payload: 'Request could not be completed.' })
    }
}

export const removeBook = bookId => async dispatch => {
    try {
        console.log(bookId)
    } catch (e) {
        console.log(e)
        dispatch({ type: BOOK_ERROR, payload: 'Book could not be deleted at this time.' })
    }
}

export const setLoading = () => dispatch => { dispatch({ type: SET_LOADING }) }    
